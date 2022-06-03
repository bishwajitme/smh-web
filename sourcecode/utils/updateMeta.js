const head = document.head;
const documentFragment = document.createDocumentFragment();

/*
* Creates or sets a meta tag
* Receives
* attrVal (string) => ex, "og:title"
* content (string) => ex, "This is a title"
* attribute (string) => ex, "property" (or "name", "charset" etc)
* tag (string) => ex, "meta", "link"
* */
function findOrCreateMeta(attrVal, content, attribute, tag = 'meta') {
  let el = head.querySelector(tag + '[' + attribute + '="' + attrVal + '"]' );

  if ( !el ) {
    el = document.createElement(tag);
    el.setAttribute(attribute, attrVal);
    el.setAttribute('content', content);
    documentFragment.appendChild(el);
  } else {
    el.setAttribute('content', content);
  }
}

function parseVars(values, page) {
  const acf = page.get('acf');

  values.title = values.title && values.title.replace('%title%', page.get('title'));
  values.desc = values.desc && values.desc.replace('%description%', acf.get('excerpt'));

  return values;
}

function populateValues(values) {
  const tagTitle = head.getElementsByTagName('title')[0];
  //Meta
  tagTitle.innerHTML = values.title;
  findOrCreateMeta('description', values.desc, 'name');
  findOrCreateMeta('canonical', values.url, 'rel', 'link');
  //OpenGraph
  findOrCreateMeta('og:title', values.title, 'property');
  findOrCreateMeta('og:description', values.desc, 'property');
  findOrCreateMeta('og:site_name', 'EC Utbildning', 'property');
  findOrCreateMeta('og:locale', 'sv_SE', 'property');
  findOrCreateMeta('og:image', values.image, 'property');
  if ( values.type === 'page' ) {
    findOrCreateMeta('og:type', 'website', 'property');
  } else {
    findOrCreateMeta('og:type', 'article', 'property');
  }

  //Twitter
  findOrCreateMeta('twitter:title', values.title, 'name');
  findOrCreateMeta('twitter:card', values.desc, 'name');
  findOrCreateMeta('twitter:image', values.image, 'name');

  //Google+
  findOrCreateMeta('name', values.title, 'itemprop');
  findOrCreateMeta('description', values.desc, 'itemprop');
  findOrCreateMeta('image', values.image, 'itemprop');

}

export default function(page, options) {

  const acf = page.get('acf');
  let values = {
    title: page.getIn(['acf', 'meta_tag_title']),
    url: page.getIn(['acf', 'meta_canonical_url']) || page.get('link'),
    desc: page.getIn(['acf', 'meta_tag_desc']),
    type: page.get('type'),
    image: page.getIn(['acf', 'meta_tag_image']) || page.getIn(['featured_image', 'url']),
  };

  if (!values.title) {
    values.title = options.get('meta_tag_title_default_' + values.type);
  }

  if (!values.desc) {
    values.desc = options.get('meta_tag_desc_default_' + values.type);
  }

  if (!values.image) {
    values.image = options.get('meta_tag_image_default_' + values.type);
  }

  //parse and replace %title% & %description% defaults
  values = parseVars(values, page);

  populateValues(values);
  head.appendChild(documentFragment);
}
