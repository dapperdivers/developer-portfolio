/**
 * Save a same-site file to the visitor's device.
 *
 * Fetches the file as a blob first so the browser saves it under `fileName`
 * instead of navigating to it. Falls back to a plain download link if the
 * fetch fails.
 *
 * @param {string} filePath - URL of the file
 * @param {string} [fileName] - Name to save it as
 * @returns {Promise<void>}
 */
export const downloadFile = async (filePath: string, fileName?: string): Promise<void> => {
  if (!filePath) return;

  const click = (href: string) => {
    const link = document.createElement('a');
    link.href = href;
    if (fileName) link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const url = window.URL.createObjectURL(await response.blob());
    click(url);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    click(filePath);
  }
};

export default downloadFile;
