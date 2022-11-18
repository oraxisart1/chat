import {getFilteredContextOptions} from 'components/chat/chat.functions';
import {scrollToMessage} from 'components/chat/handlers';

export function formatFilesDate(date) {
  date = new Date(date);
  const options = {
    month: 'long',
  };

  if (date.getFullYear() !== new Date().getFullYear()) {
    options.year = 'numeric';
  }

  return date.toLocaleDateString(undefined, options);
}

export function getFileContextOptions(state, file) {
  const options = [
    {
      title: 'Перейти к сообщению',
      icon: 'visibility',
      expression: () => !state.isSelectedFiles,
      action: (file) => {
        state.showDialogFileList = false;
        scrollToMessage(file.message.id);
      },
    },
    {
      title: 'Удалить',
      icon: 'delete',
      expression: (file) => !state.isSelectedFiles && file.message.name ===
          'me',
      isConfirm: true,
      confirmOptions: {
        message: 'Вы действительно хотите удалить данный файл? Вместе с ним будет удалено сообщение.',
      },
      action: (file) => state.deleteMessage(file.message),
    },
    {
      title: 'Удалить выбранные',
      icon: 'delete',
      expression: (file) => file.message.name === 'me' &&
          state.isOwnFilesSelected,
      isConfirm: true,
      confirmOptions: {
        message: 'Вы действительно хотите удалить выбранные файлы? Вместе с ними будут удалены сообщения.',
      },
      action: () => state.deleteSelectedFiles(),
    },
    {
      title: 'Выбрать',
      icon: 'check_circle_outline',
      expression: (file) => !state.selectedFiles.has(file.id),
      action: (file) => state.selectFile(file),
    },
    {
      title: 'Отменить выбранные',
      icon: 'check_circle_outline',
      expression: () => state.isSelectedFiles,
      action: () => state.clearFileSelection(),
    },
  ];

  return getFilteredContextOptions(options, file);
}

let fileList = null;

export function getFileElement(fileId) {
  if (!fileList) {
    fileList = document.querySelector('.chat__files__card-list');
  }

  return fileList.querySelector(`[data-file-id="${fileId}"]`);
}
