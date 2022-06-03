function decodeURL (data) {
  data = data || '';
  const replaceChars = {
    _ao_: 'å',
    _ae_: 'ä',
    _oe_: 'ö',
    _AO_: 'Å',
    _AE_: 'Ä',
    _OE_: 'Ö',
    __: ' ',
  };
  const reg = /(\_ao\_)|(\_ae\_)|(\_oe\_)|(\_AO\_)|(\_AE\_)|(\_OE\_)|(\_\_)/g;
  return data.replace(reg, function (match) {
    return replaceChars[match];
  });
}

export default decodeURL;
