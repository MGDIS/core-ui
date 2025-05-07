/**
 * Get windows
 * @param localWindow - the window we are lookink for other windows
 * @returns The list of windows found
 */
export const getWindows = (localWindow: Window): Window[] => {
  const parentWindows = getParentWindows(localWindow);
  const childWindows = getChildWindows(localWindow);
  return [localWindow, ...parentWindows, ...childWindows];
};

/**
 * Get parent windows
 * @param localWindow - the window we are lookink for parents
 * @param windows - The list of allready found windows
 * @returns The list of windows found
 */
export const getParentWindows = (localWindow: Window, windows: Window[] = []): Window[] => {
  // Check if is in iframe
  if (localWindow.self !== localWindow.top) {
    // Check if we have permission to access parent
    try {
      const parentWindow: Window = localWindow.parent;
      if (parentWindow) {
        windows.push(parentWindow);
        return getParentWindows(parentWindow, windows);
      } else return windows;
    } catch (err) {
      console.error('Different hosts between iframes:', err);
      return windows;
    }
  }
  return windows;
};

/**
 * Get child windows
 * @param localWindow - the window we are lookink for children
 * @param windows - The list of allready found windows
 * @returns The list of windows found
 */
export const getChildWindows = (localWindow: Window, windows: Window[] = []): Window[] => {
  if (localWindow.frames.length > 0) {
    for (const childWindow of Array.from(localWindow.frames)) {
      windows.push(childWindow);
      getChildWindows(childWindow, windows);
    }
  }
  return windows;
};
