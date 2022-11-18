let messageInput = null;

export function isImage(filePath) {
  return isExtensionsAgreed(filePath, ['png', 'jpg']);
}

export function getFileExtension(filePath) {
  return filePath.split('.').pop();
}

export function isExtensionsAgreed(filePath, extensions) {
  return extensions.includes(getFileExtension(filePath));
}

export function getFilteredContextOptions(options = [], entity) {
  return options.filter(option => option.expression?.(entity) ?? true);
}

export function getCurrentDate() {
  const date = new Date();
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-CA', options);
}

export function getCurrentTime() {
  const date = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleTimeString('ru-RU', options);
}

export function downloadFile(path) {
  const link = document.createElement('a');
  link.download = 'true';
  link.target = '_blank';
  link.href = path;
  link.click();
}

export function formatDate(date, options) {
  const result = new Date(date).toLocaleDateString(undefined, options);
  return result === 'Invalid Date' ? '—' : result;
}
