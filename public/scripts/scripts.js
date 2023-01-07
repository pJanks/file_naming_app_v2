const fileDropperLabel = $('.file-dropper-label');
const fileDropperForm = $('.file-dropper-form');
const fileDropper = $('.file-dropper');

fileDropperLabel.on('dragover dragenter drop', (e) => handleFileDrop(e));
fileDropperLabel.on('keypress', (e) => handleEnterButtonPress(e));
fileDropperForm.on('submit', (e) => handleSubmit(e));

const formData = new FormData();

const appendFormData = (fileOrFilesToAppend) => {
  Object.keys(fileOrFilesToAppend).forEach(key => {
    formData.append('files', fileOrFilesToAppend[key]);
  });
}

const handleFileDrop = async (e) => {
  e.preventDefault();
  if (e.type === 'drop') appendFormData(e.originalEvent.dataTransfer.files);
}

const handleEnterButtonPress = (e) => {
  if (e.key.toLowerCase() === 'enter') fileDropperLabel.click();
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (fileDropper.prop('files').length) appendFormData(fileDropper.prop('files'));

    const newName = $('.new-name-input').val().replace(/\s+/g, '_');
    const directory = $('.directory-input').val().replace(/\s+/g, '_');
    const startPositionToRemove = Number($('.start-input').val()) - 1;
    const endPositionToRemove = Number($('.end-input').val()) - 1;

    const options = { method: 'POST', body: formData };
    const url = `http://127.0.0.1:3001/rename/${newName}/${directory}/${startPositionToRemove}/${endPositionToRemove}`;

    await fetch(url, options);
    $('.success-modal-wrapper').removeClass('hidden');
    setTimeout(() => window.location.reload(), 1000);
  } catch (err) {
    alert(`there was an error: ${err}`);
  }
}