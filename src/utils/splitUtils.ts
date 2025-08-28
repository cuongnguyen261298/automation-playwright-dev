export function getUserNameFromFileStorage(fileStorage: string) {
  if (typeof fileStorage !== 'string') {
    return null;
  }
  const match = fileStorage.match(/\/([^/]+)\.json$/);
  return match ? match[1] : null;
}