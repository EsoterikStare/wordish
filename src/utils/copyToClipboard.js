const copyToClipboard = (content, callback) => {
  // navigator.clipboard.writeText(content)
  //   .then(() => callback(true))
  //   .catch(() => callback(false));
  content.select();
  const result = document.execCommand('copy');
  callback(result);
};

export default copyToClipboard;
