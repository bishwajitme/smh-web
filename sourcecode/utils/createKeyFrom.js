function createKeyFrom(data) {
  return encodeURI(data).toLowerCase();
}

export default createKeyFrom;
