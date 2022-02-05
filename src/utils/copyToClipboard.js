const copyToClipboard = (content, callback) => {
  let textarea;
  let result;

  const dialogBackdrop = document.getElementsByClassName('MuiDialogContent-root')[0];

  try {
    textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', true);
    textarea.setAttribute('contenteditable', true);
    textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
    textarea.value = content;

    dialogBackdrop.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
  } finally {
    dialogBackdrop.removeChild(textarea);
  }

  callback(result);
};

export default copyToClipboard;
