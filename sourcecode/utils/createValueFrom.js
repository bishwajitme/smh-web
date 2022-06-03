function createValueFrom(data) {
  data = data || '';
  data = data.toLowerCase();
  const replaceChars = {
    å: 'a',
    ä: 'a',
    ö: 'o',
  };
  return data.replace(/(å)|(ä)|(ö)/g, function (match) {
    return replaceChars[match];
  });
}

export default createValueFrom;
