function isRetina () {
  const mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), ' +
    '(min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), ' +
    '(min-resolution: 1.5dppx)';
  if (root.devicePixelRatio > 1) {
    return true;
  } else if (root.matchMedia && root.matchMedia(mediaQuery).matches) {
    return true;
  }
  return false;
}

export default isRetina;
