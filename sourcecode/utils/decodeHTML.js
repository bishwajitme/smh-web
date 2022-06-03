function decodeHTML (data) {
  data = data || '';
  const replaceChars = {
    '&#038;': '&',
    '&#8211;': '-',
  };
  return data.replace(/(\&\#038\;)|(\&\#8211\;)/g, function (match) {
    return replaceChars[match];
  });
}

export default decodeHTML;
