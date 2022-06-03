import config from 'webpack-config-loader!conf';

function getSlugFromURL(url) {
  url = url || '';
  return url
    .replace(config.hostname, '')
    .replace(/\/$/, '');
}

export default getSlugFromURL;
