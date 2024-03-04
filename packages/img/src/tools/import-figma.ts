import axios, { AxiosError, AxiosResponse } from 'axios';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { optimize } from 'svgo';
import { JSDOM } from 'jsdom';
import { svgoConfig } from './svgo.config';
import dotenv from 'dotenv';

type SvgType = 'icons' | 'illustrations';

dotenv.config();

/**
 * Figma API access token for authentication.
 */
const figmaAccessToken = process.env.FIGMA_ACCESS_TOKEN;

/**
 * Figma file key and SVGs page keys.
 */
const figmaFileKey = process.env.FIGMA_FILE_KEY;
const figmaIconsPageId = process.env.FIGMA_ICONS_PAGE_ID;
const figmaIllustrationsPageId = process.env.FIGMA_ILLUSTRATIONS_PAGE_ID;

/**
 * Check if required environment variables are set.
 */
if (!figmaAccessToken || !figmaFileKey || !figmaIconsPageId || !figmaIllustrationsPageId) {
  console.error('Please set the environment variables FIGMA_ACCESS_TOKEN, FIGMA_FILE_KEY, and FIGMA_ICONS_PAGE_ID.');
  process.exit(1);
}

/**
 * Axios instance configured for Figma API requests.
 */
const figmaApiInstance = axios.create({
  baseURL: 'https://api.figma.com/v1/',
  headers: {
    'X-FIGMA-TOKEN': figmaAccessToken,
  },
});

/**
 * Handles errors from Axios requests.
 *
 * @param error - The error object.
 * @throws - The error object.
 */
const handleError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(`Axios Error: ${axiosError.message}`);
    console.error('Axios Error Details:', axiosError.toJSON());
  } else {
    console.error(`Unexpected Error: ${error}`);
  }
  throw error;
};

/**
 * Fetch data from the Figma API.
 *
 * @param endpoint - The API endpoint.
 * @param params - Optional parameters for the request.
 * @returns - The response data.
 * @throws - An error from the Axios request.
 */
const getFigmaData = async (endpoint: string, params?: { ids: string; format?: string }): Promise<AxiosResponse['data']> => {
  try {
    const response: AxiosResponse = await figmaApiInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Download, optimize, and write Figma SVG icons to files.
 *
 * @param id - The Figma component ID.
 * @param url - The URL of the SVG icon.
 * @param figmaData - Additional Figma data.
 * @returns - A promise that resolves once the icon is downloaded, optimized, and written.
 */
const downloadOptimizeAndWriteIcon = async (
  id: string,
  url: string,
  figmaData: { components: { [x: string]: { name: string; componentSetId: string } }; componentSets: { [x: string]: { name: string } } },
  type: SvgType,
): Promise<void> => {
  const componentSetId = figmaData.components?.[id]?.componentSetId;
  let iconName = figmaData.components?.[id]?.name;

  if (componentSetId) {
    iconName = figmaData.componentSets?.[componentSetId]?.name;
    if (iconName && figmaData.components?.[id]?.name === 'Fill=false') iconName += '-outline';
  }

  iconName = `${iconName?.replaceAll('/', '-').toLowerCase().trim()}`;

  const { data: svgSrc } = await figmaApiInstance.get(url);

  const { window } = new JSDOM(svgSrc, { contentType: 'image/svg+xml' });
  const { document } = window;

  if (type === 'icons') {
    // Replace 'fill' value with 'currentColor'
    const pathElements = document.querySelectorAll('[fill]:not([fill="none"])');
    pathElements.forEach(pathElement => {
      pathElement.setAttribute('fill', 'currentColor');
    });
    // Replace 'stroke' value with 'currentColor'
    const strokeElements = document.querySelectorAll('[stroke]');
    strokeElements.forEach(pathElement => {
      pathElement.setAttribute('stroke', 'currentColor');
    });
  } else if (type === 'illustrations') {
    // Add `dynamic-color` class on identified colors
    const dynamicColorClass = 'dynamic-color';
    const dynamicColors = ['#BED830', '#005E9C', '#FFC33E', '#32D59C'];
    const pathColorElementsQuerySelector = dynamicColors.map(dynamicColor => `[fill="${dynamicColor}"]`).join(',');
    const pathColorElements = document.querySelectorAll(pathColorElementsQuerySelector);

    pathColorElements.forEach(pathColorElement => {
      pathColorElement.classList.add(dynamicColorClass);
    });
  }

  const svgPath = join(__dirname, `../${type}/`, `${iconName}.svg`);
  await mkdir(join(__dirname, `../${type}/`), { recursive: true });

  await writeFile(svgPath, optimize(document.documentElement.outerHTML, svgoConfig).data, 'utf-8');

  console.log(`File ${svgPath} has been successfully written.`);
};

/**
 * Main function to fetch Figma data and download/modify/write SVGs.
 */
const getSVGs = async (pageId: string, type: SvgType): Promise<void> => {
  try {
    const fileData = await getFigmaData(`files/${figmaFileKey}`, { ids: pageId });

    const svgs = await getFigmaData(`images/${figmaFileKey}`, {
      ids: Object.keys(fileData.components).join(','),
      format: 'svg',
    });

    console.log('svgs', svgs);

    for (const [id, url] of Object.entries(svgs.images) as [string, string][]) {
      await downloadOptimizeAndWriteIcon(id, url, fileData, type);
    }
  } catch (error) {
    handleError(error);
  }
};

// Get Icons
getSVGs(figmaIconsPageId, 'icons');

// Get Illustrations
getSVGs(figmaIllustrationsPageId, 'illustrations');
