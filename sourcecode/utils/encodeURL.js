function encodeURL (data) {
  data = data || '';
  const replaceChars = {
    å: '_ao_',
    ä: '_ae_',
    ö: '_oe_',
    Å: '_AO_',
    Ä: '_AE_',
    Ö: '_OE_',
    ' ': '__',
  };
  const reg = /(å)|(ä)|(ö)|(Å)|(Ä)|(Ö)|(\s)/g;
  return data.replace(reg, function (match) {
    return replaceChars[match];
  });
}

export default encodeURL;
