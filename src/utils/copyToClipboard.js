const copyToClipboard = (content, callback) => {
  navigator.clipboard.writeText(content)
    .then(() => callback(true))
    .catch(() => callback(false));
};

export default copyToClipboard;
