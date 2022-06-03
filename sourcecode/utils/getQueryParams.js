function getQueryParams () {
  const vars = {};
  let hash;
  const hashes = window.location.href
    .slice(window.location.href.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    if (hash[1]) {
      vars[hash[0]] = hash[1];
    }
  }
  return vars;
}

export default getQueryParams;
