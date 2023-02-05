const copyToClipboard = async (content, callback) => {
  let result;

  const mobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // iPad on iOS 13+ detection, since the UA looks more like a laptop now.
  const modernIpad = (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  if (mobileUserAgent || modernIpad) {
    try {
      await navigator.share({ text: content });
    } catch (err) {
      console.error(err);
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(content);
    result = true;
  } catch (err) {
    result = false;
    console.error(err);
  }

  callback(!!result);
};

export default copyToClipboard;
