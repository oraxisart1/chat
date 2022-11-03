export function isImage(filePath) {
  return isExtensionsAgreed(filePath, ['png', 'jpg']);
}

export function getFileExtension(filePath) {
  return filePath.split('.').pop();
}

export function isExtensionsAgreed(filePath, extensions) {
  return extensions.includes(getFileExtension(filePath))
}

export function getFilteredContextOptions(options = [], entity) {
  return options.filter(option => option.expression(entity))
}

export function getCurrentDate() {
  const date = new Date();
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

  return date.toLocaleDateString('en-CA', options)
}

export function getCurrentTime() {
  const date = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  }

  return date.toLocaleTimeString('ru-RU', options)
}
