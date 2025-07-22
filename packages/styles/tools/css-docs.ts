import { readFile, appendFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import postcss from 'postcss';
import prettier from 'prettier';

// Types
type TagType = { tag: string; value: string };
type ParsedCommentType = { description: string; tags: TagType[] };
type MarkdownBlocksType = ParsedCommentType & { selectors: string[] };
type MarkdownBlocksRecordType = Record<string, MarkdownBlocksType[]>;

/**
 * Cleans a comment by removing comment delimiters and leading asterisks.
 * @param comment - The comment string to clean.
 * @returns The cleaned comment string.
 */
const cleanComment = (comment: string | undefined): string => {
  if (comment === undefined) return '';
  return comment
    .replace(/\/\*+|\*+\//g, '') // Remove comment delimiters
    .split('\n') // Separate lines
    .map(
      line =>
        line
          .replace(/^\s*\*\s?/, '') // Remove leading asterisks and spaces
          .trimEnd(), // Clean trailing spaces
    )
    .filter(line => line.trim() !== '') // Remove empty lines
    .join('\n') // Recompose
    .trim(); // Clean start/end
};

/**
 * Parses a CSS comment and extracts the description and tags.
 * @param comment - The CSS comment string to parse.
 * @returns An object containing the description and tags.
 */
const parseComment = (comment: string): ParsedCommentType => {
  // we split the comment with tags (e.g. @example example)
  const [description, ...tagsPart] = comment.split('@');
  // we create a block with description and tags
  return {
    description: cleanComment(description),
    tags: tagsPart.map(tag => {
      const [tagName, ...tagDescription] = tag.split(' ');
      return {
        tag: tagName?.replace('@', '') ?? '',
        value: cleanComment(tagDescription.join(' ')),
      };
    }),
  };
};

/**
 * Parses a CSS file and extracts markdown blocks from comments.
 * @param cssFilePath - The path to the CSS file to parse.
 * @returns An object containing markdown blocks categorized by page.
 */
const parseCss = async (cssFilePath: string) => {
  const markdownBlocks: MarkdownBlocksRecordType = {};
  const cssContent = await readFile(cssFilePath, 'utf-8');

  // Parse the CSS content
  const root = postcss.parse(cssContent, {
    from: cssFilePath,
  });

  // Walk through comments in the CSS
  root.walkComments(comment => {
    // Parse the comment using comment-parser
    const parsedComment = parseComment(`${comment.text ?? ''}`);
    // If Comment includes @description, extract it
    if (parsedComment.tags.length > 0) {
      // Ensure next node is a rule
      const next = comment.next();
      if (next?.type === 'rule') {
        const selectors = parsedComment.tags.find(tag => tag.tag === 'selectors')?.value.split(',') ?? next.selectors.filter((selector: string) => selector.includes('.mg-'));
        if (selectors.length > 0) {
          const page = parsedComment.tags.find(tag => tag.tag === 'page')?.value ?? 'index';
          if (markdownBlocks[page] === undefined) {
            markdownBlocks[page] = [];
          }
          markdownBlocks[page].push({ ...parsedComment, selectors });
        }
      }
    }
  });

  return markdownBlocks;
};

/**
 * Generates documentation markdown files from parsed CSS blocks.
 * @param markdownBlocks - The parsed CSS blocks containing comments and selectors.
 * @param docsFolder - The folder where the documentation markdown files will be created.
 */
const cssMarkdown = (markdownBlocks: MarkdownBlocksRecordType, docsPath: string) => {
  // Create documentation markdown
  Object.entries(markdownBlocks).forEach(async ([page, doc]) => {
    // Create markdown file for each page
    const markdownFilePath = join(docsPath, `${page.toLowerCase()}.md`);
    await mkdir(docsPath, { recursive: true });
    // Set markdown content
    let docContent = `# ${page}\n\n`;
    doc.forEach(block => {
      // Add selectors to the description
      docContent += `## ${block.selectors.join(', ')}\n\n`;
      // Add description
      docContent += `${block.description}\n\n`;
      // Add tags
      block.tags
        .filter(tag => !['page', 'selectors'].includes(tag.tag))
        .forEach(tag => {
          docContent += `### ${tag.tag}\n\n`;
          docContent += `${tag.value}\n\n`;
        });
    });
    // Ensure the markdown content is formatted
    docContent = await prettier.format(docContent, { parser: 'markdown' });
    // Put the markdown content in a file
    await appendFile(markdownFilePath, docContent, 'utf-8');
  });
};

/**
 * Generates documentation markdown files from a CSS file.
 * @param cssFile - The path to the CSS file to parse.
 * @param docsFolder - The folder where the documentation markdown files will be created.
 */
const cssDocs = async (cssFile: string, docsFolder: string) => {
  // Get the CSS content from the file
  const cssFilePath = join(__dirname, cssFile);
  const docsPath = join(__dirname, docsFolder);
  // Parse the CSS content
  const markdownBlocks = await parseCss(cssFilePath);
  // delete existing docsFolder
  await rm(docsPath, { recursive: true, force: true });
  // Create documentation markdown
  cssMarkdown(markdownBlocks, docsPath);
};

cssDocs('../dist/styles.css', '../docs');
