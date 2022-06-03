import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './components/App/App.js';
import StartPage from './components/StartPage/StartPage.js';
import Page from './components/Page/Page.js';
import ArticleListPage from './components/ArticleListPage/ArticleListPage.js';
import ArticlePage from './components/ArticlePage/ArticlePage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import EducationListPage from
  './components/EducationListPage/EducationListPage.js';
import NotSearchableEducationListPage from
  './components/NotSearchableEducationListPage/NotSearchableEducationListPage.js';
import EducationPage from './components/EducationPage/EducationPage.js';

const history = createBrowserHistory();

function scrollToTop () {
  window.scrollTo(0, 0);
}

ReactDOM.render((
  <Router history={history} onUpdate={scrollToTop}>
    <Route path='/' component={App}>
      <IndexRoute component={StartPage}/>

      <Route path='/utbildningar'>
        <IndexRoute name='utbildningar' component={EducationListPage}/>
        <Route path='/utbildningar/:slug' component={EducationPage}/>
      </Route>

      <Route path='/ej-sokbara' component={NotSearchableEducationListPage}/>

      <Route path='/test-certifiering' component={Page}/>

      <Route path='/nyheter'>
        <IndexRoute name='nyheter' type='nyheter' component={ArticleListPage}/>
        <Route path='/nyheter/:slug' type='nyheter' component={ArticlePage}/>
      </Route>

      <Route path='/om-yh'>
        <IndexRoute name='om-yh' component={Page}/>
        <Route path='/om-yh/:slug' component={Page}/>
      </Route>

      <Route path='/foretag'>
        <IndexRoute name='foretag' component={Page}/>
        <Route path='/foretag/:slug' component={Page}/>
      </Route>

      <Route path='/cookie-policy'>
        <IndexRoute name='cookie-policy' component={Page}/>
      </Route>

      <Route path='/om-ecu'>
        <IndexRoute name='om-ecu' component={Page}/>
        <Route path='/om-ecu/intresseanmalan' component={SignupPage}/>
        <Route path='/om-ecu/:slug' component={Page}/>
      </Route>

      <Route path='/kontakt' component={Page}/>

      /*
       * Routes not in menu
      */

      <Route path='/intervjuer'>
        <IndexRoute name='intervjuer' type='intervjuer'
                    component={ArticleListPage}/>
        <Route path='/intervjuer/:slug' type='intervjuer'
               component={ArticlePage}/>
      </Route>

      <Route path='/studieorter'>
        <IndexRoute name='studieorter' type='studieorter'
                    component={ArticleListPage}/>
        <Route path='/studieorter/:slug' type='studieorter'
               component={ArticlePage}/>
      </Route>


      <Route path='/*' component={Page}/>
    </Route>
  </Router>
), document.getElementById('app'));
