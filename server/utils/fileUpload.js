const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) return "0 Bytes";

  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  let i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))}  ${sizes[i]}`;
};
module.exports = { fileSizeFormatter };
