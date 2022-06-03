export default (function () {
  'use strict';
  var first = true;
  var workbuster = {
    site: "academedia",
    subSite: "ecutbildning",
    script: null,
    protocol: 'https://',
    iFrame: null,
    div: null,
    topUrl: null,
    iFrameAttributes: {
      'frameborder': '0',
      'frameBorder': '0',
      'id': 'workbuster_iframe',
      'allowfullscreen': 'allowfullscreen',
      'allowtransparency': 'true',
      'name': 'workbuster_iframe',
      'width': '100%',
      'height': '3000px',
      'style': 'min-width:100%;width:100%;'
    },
    extBaseUrl: 'ext.workbuster.se/',
    domainUrl: null,
    extraHeight: null,
    log: [],
    debug: false,
    offsetY: 0,
    offsetOnRender: 0,
    disableOffset: 0,
    languageId: null,
    page: 'index.php',
    cguid: null,
    aguid: null,
    roleid: null,
    email: false,
    cv: false,
    candidatePool: false,
    subscribe: false,
    link: false,
    container: "workbuster_container",
    antiCache: false,
    referer: null,
    sortby: null,
    scrollOnLoad: 0,
    _ga: null,
    referers: [{'name': 'twitter', 'urls': ['t.co']}, {'name': 'google', 'urls': ['goo.gl']}, {
      'name': 'linkedin',
      'urls': ['lnkd']
    }, {'name': 'facebook', 'urls': ['fb.me']}],
    languages: [{'id': 1, 'codes': ['sv', 'se', 'sve', 'swe']}, {'id': 2, 'codes': ['en', 'uk', 'eng']}, {
      'id': 3,
      'codes': ['fi']
    }, {'id': 4, 'codes': ['dk']}, {'id': 5, 'codes': ['no']}, {'id': 6, 'codes': ['pl']}],
    parameters: ['height', 'width', 'lng', 'offsetY', 'site', 'subsite', 'cv', 'candidatepool', 'aguid', 'cguid', 'subscribe', 'curPage', 'roleid', 'referer', 'ref', 'email', 'link', 'offsetOnRender', 'minify', 'debug', 'container', 'disableOffset', 'extraHeight', 'domainUrl', 'scrollOnLoad', 'sortby'],
    init: function () {
      this.protocol = (window.location.href.substring(0, 5) === 'https') ? 'https://' : 'http://';
      this.iFrame = window.document.createElement('iframe');
      for (var key in this.iFrameAttributes) {
        this.iFrame.setAttribute(key, this.iFrameAttributes[key]);
      }
      var scripts = document.getElementsByTagName('script');
      this.script = scripts[scripts.length - 1];
      this.referer = (this.referer === null) ? this.neutralize(this.query('ref') || this.query('referer') || document.referrer) : null;
      this.referer = this.syncReferer(this.referer);
      return this;
    },
    syncReferer: function (ref) {
      if (ref !== null) {
        ref = ref.toLowerCase();
        for (var i = 0, l = this.referers.length; i < l; i++) {
          for (var j = 0, le = this.referers[i].urls.length; j < le; j++) {
            if (ref.indexOf(this.referers[i].urls[j]) > -1) {
              ref = this.referers[i].name;
              break;
            }
          }
        }
      }
      return ref;
    },
    neutralize: function (url) {
      var params = workbuster.parameters, regExp, newUrl = url;
      for (var i = 0, l = params.length; i < l; i++) {
        regExp = new RegExp(params[i] + '\=', 'mig');
        newUrl = newUrl.replace(regExp, 'tmp_' + params[i] + '=');
      }
      return newUrl;
    },
    appendAfterScript: function (obj) {
      console.log('obj --> ', obj);
      if (this.script.nextSibling) {
        this.script.parentNode.insertBefore(obj, this.script.nextSibling);
      } else {
        this.script.parentNode.appendChild(obj);
      }
    },
    query: function (name) {
      var queries = window.location.search.substring(1).split('&'), pair, i, l;
      for (i = 0, l = queries.length; i < l; i++) {
        pair = queries[i].split('=');
        if (pair[0] === name) {
          return pair[1];
        }
      }
      return null;
    },
    queryUrl: function (name) {
      var queries = window.location.href.split('/'), i, l;
      for (i = 0, l = queries.length; i < l; i++) {
        if (queries[i].toLowerCase() === name.toLowerCase()) {
          return name.toLowerCase();
        }
      }
      return null;
    },
    setLanguage: function () {
      var abbr = this.query('lng') || this.query('lang') || null, i, l, j, le;
      if (abbr !== null) {
        for (i = 0, l = this.languages.length; i < l; i++) {
          if (this.languages[i].codes.indexOf(abbr.toLowerCase()) > -1) {
            this.languageId = this.languages[i].id;
          }
        }
      }
      if (this.languageId === null) {
        for (i = 0, l = this.languages.length; i < l; i++) {
          for (j = 0, le = this.languages[i].codes.length; j < le; j++) {
            abbr = this.queryUrl(this.languages[i].codes[j]);
            if (abbr !== null) {
              this.languageId = this.languages[i].id;
            }
          }
        }
      }
      return this;
    },
    setPage: function () {
      this.cguid = (this.cguid !== null) ? this.cguid : this.query('cguid');
      this.aguid = (this.aguid !== null) ? this.aguid : this.query('aguid');
      this.roleid = (this.roleid !== null) ? this.roleid : this.query('roleid');
      if (!this.cv) {
        this.cv = this.query('cv');
      }
      if (!this.cguid) {
        this.cguid = this.query('cguid');
      }
      if (!this.aguid) {
        this.aguid = this.query('aguid');
      }
      if (!this.roleid) {
        this.roleid = this.query('roleid');
      }
      if (!this.email) {
        this.email = this.query('email') || this.query('link');
      }
      if (!this.subscribe) {
        this.subscribe = this.query('subscribe');
      }
      if (!this.candidatePool) {
        this.candidatePool = this.query('candidatepool');
      }
      if (!this.debug) {
        this.debug = (this.query('debug'));
      }
      if (!this.extraHeight) {
        this.extraHeight = (/^([0-9]+)$/.test(this.query('extraHeight'))) ? parseInt(this.query('extraHeight'), 10) : null;
      }
      if (!this._ga) {
        this._ga = (this.query('_ga'));
      }
      if ((this.cguid !== null && this.aguid !== null) || this.cguid !== null) {
        this.page = 'cv/index.php';
      } else if (this.aguid !== null && this.cv !== null) {
        this.page = 'cv.php';
      } else if (this.roleid !== null) {
        this.page = 'cv.php';
      } else if (this.aguid !== null) {
        this.page = 'job.php';
      } else if (this.cv) {
        this.page = 'cv.php';
      } else if (this.email) {
        this.page = 'link.php'
      } else if (this.link) {
        this.page = 'link.php'
      } else if (this.subscribe) {
        this.page = 'subscribe.php'
      } else if (this.candidatePool) {
        this.page = 'role.php'
      }
      var href = window.location.href.split('/');
      this.domainUrl = href[0] + '//' + href[2];
      return this;
    },
    getTopUrl: function () {
      var url = window.location.href || window.location || '', re;
      if (url) {
        var params = workbuster.parameters;
        for (var i = 0; i < params.length; i++) {
          re = new RegExp("([?&])" + params[i] + "=.*?(&|$)", "i");
          if (url.match(re)) {
            url = url.replace(re, '');
          }
        }
        return url;
      }
      return '';
    },
    setUrlParams: function () {
      return '?site=' + this.site + (this.subSite ? '&subsite=' + this.subSite : '') + (this.languageId ? '&lng=' + this.languageId + '&lngForIndex=' + this.languageId : '') + (this.cguid ? '&cguid=' + this.cguid : '') + (this.aguid ? '&aguid=' + this.aguid : '') + (this.roleid ? '&roleid=' + this.roleid : '') + (this.email ? '&email=' + ((this.email) ? 1 : 0) : '') + (this.candidatePool ? '&candidatepool=' + this.candidatePool : '') + (this.cv ? '&cv=' + this.cv : '') + (this.subscribe ? '&subscribe=' + this.subscribe : '') + (this.referer ? '&ref=' + this.referer + '&createGeneralCookie=true' : '') + (this.antiCache ? '&_=' + Math.random() : '') + (this.domainUrl ? '&domainUrl=' + this.domainUrl : '') + (this.extraHeight ? '&extraHeight=' + this.extraHeight : '') + (this.sortby ? '&sortby=' + this.sortby : '') + (this._ga ? '&_ga=' + this._ga : '') + '&topurl=' + this.getTopUrl();
    },
    useDocumentElement: function () {
      var ua = navigator.userAgent.toLowerCase();
      return (/msie/.test(ua) || /firefox/.test(ua));
    },
    install: function () {
      this.init().setPage().setLanguage();
      var iFrameUrl = this.protocol + this.extBaseUrl + this.page + this.setUrlParams();
      this.iFrame.setAttribute('src', iFrameUrl);
      if (this.site === null) {
        this.div = window.document.createElement('div');
        this.div.setAttribute('id', 'workbuster_error');
        this.div.innerHTML = 'WB-Error:No site provided.';
        this.appendAfterScript(this.div);
      } else {
        if (typeof this.container === 'undefined' || this.container === null) {
          this.appendAfterScript(this.iFrame);
        } else {
          console.log('this --> ', document, this.container);
          this.container = document.getElementById(this.container) || null;
          if (this.container === null) {
            this.div = window.document.createElement('div');
            this.div.setAttribute('id', 'workbuster_error');
            this.div.innerHTML = 'WB-Error:Undefined container.';
            this.appendAfterScript(this.div);
          } else {
            this.container.appendChild(this.iFrame);
          }
        }
      }
      if (parseInt(this.disableOffset, 10) === 0 && workbuster.scrollOnLoad === 0) {
        if (this.useDocumentElement()) {
          this.iFrame.setAttribute('onload', 'document.documentElement.scrollTop=' + this.offsetY);
        } else {
          this.iFrame.setAttribute('onload', 'window.document.body.scrollTop=' + this.offsetY);
        }
        if (this.offsetOnRender === 1) {
          setTimeout(function () {
            if (this.useDocumentElement()) {
              document.documentElement.scrollTop = this.offsetY;
            } else {
              window.document.body.scrollTop = this.offsetY;
            }
          }, 250);
        }
      }
      if (this.debug) {
        for (var i = 0, l = this.log.length; i < l; i++) {
          console.log((i + 1) + ':' + this.log[i]);
        }
        console.log(this);
      }
      return this;
    }
  };
  var wb = {};
  wb.parseMessage = parseMessage;
  if (window.addEventListener) {
    window.addEventListener('message', wb.parseMessage, false);
  } else {
    window.attachEvent('onmessage', wb.parseMessage);
  }

  function parseMessage(event) {
    if (event.origin != 'http://ext.workbuster.se' && event.origin != 'https://ext.workbuster.se' || event.data[0] === '!') {
      return false;
    }
    var strHeight = JSON.parse(event.data).WB_HEIGHT;
    if (strHeight !== undefined) {
      var height = parseInt(strHeight, 10);
      if (workbuster.container) {
        workbuster.container.querySelector('#workbuster_iframe').height = height + 'px';
      } else {
        document.getElementById('workbuster_iframe').height = height + 'px';
      }
    }
    if (workbuster.scrollOnLoad === 1 && !first) {
      if (workbuster.useDocumentElement()) {
        document.documentElement.scrollTop = document.getElementById('workbuster_iframe').offsetTop - 70;
      } else {
        window.document.body.scrollTop = document.getElementById('workbuster_iframe').offsetTop - 70;
      }
    }
    first = false;
  }

  function resizeIframe(height) {
    var el = document.getElementById('workbuster_iframe');
    if (typeof el !== 'undefined') {
      setTimeout(function () {
        document.getElementById('workbuster_iframe').height = parseInt(height) + 60;
      });
    } else {
      setTimeout(function () {
        resizeIframe(height);
      }, 2000);
    }
  }

  workbuster.install();
  console.log('document.getElementById(\'workbuster_iframe\') --> ', document, document.getElementById('workbuster_iframe'));
  document.getElementById('workbuster_iframe').height = 1500;
})();
