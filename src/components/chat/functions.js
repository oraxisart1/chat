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
