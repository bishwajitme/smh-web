const cookieName = 'cookie-consent';

export function setCookie() {
  const value = 'OK',
    date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = cookieName + '=' +
    value + '; expires=' +
    date.toUTCString() + '; path=/';
}

export function getCookie() {
  const cookies = document.cookie.split(';');
  return !cookies.filter(function (i) {
    return i.split('=')[0].trim() === cookieName;
  }).length;
}
