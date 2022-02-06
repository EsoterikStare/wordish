const copyToClipboard = (content, callback) => {
  let textarea;
  let result;

  function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  }

  const iOSShare = async (data) => {
    try {
      await navigator.share(data);
      result = true;
    } catch (err) {
      result = false;
    }
  };

  if (iOS()) {
    iOSShare({ text: content });
    return;
  }

  // Have to append to the dialog since it's the only focusable layer when this fires.
  const dialogBackdrop = document.getElementsByClassName('MuiDialogContent-root')[0];

  try {
    textarea = document.createElement('textarea');

    // readonly prevents the keyboard from popping up when
    // the textfield focuses.
    textarea.setAttribute('readonly', true);
    // iOS only allows copying from contenteditable fields
    textarea.setAttribute('contenteditable', true);
    // prevent scroll from jumping to the bottom when focus is set.
    textarea.style.position = 'fixed';
    textarea.value = content;

    dialogBackdrop.appendChild(textarea);

    // console.log('textarea', textarea);
    // debugger;

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

  callback(!!result);
};

export default copyToClipboard;
