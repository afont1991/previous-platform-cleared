import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import AuthService from './utils/AuthService'
import {Provider} from 'react-redux';
import configureStore from './configure-store';
// import {persistStore} from 'redux-persist'
const store = configureStore();

// initialize mixpanel
import mixpanel from 'mixpanel-browser'
mixpanel.init('011ef27391e7813236100977b93c107c')


if(window.location.href.search(/localhost/) === -1 && window.location.href.search(/https/) === -1){
  window.location.assign(`https://platform.debtmaven.com${window.location.pathname}`)
}

// Below are polyfills for IE which does not have an includes function on strings or arrays
// =================================================================================
if (!String.prototype.includes) {
  // eslint-disable-next-line
  String.prototype.includes = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
if (!Array.prototype.includes) {
  // eslint-disable-next-line
  Array.prototype.includes = function() {
    return Array.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
// =================================================================================

// Content Commponents
import RegisterContainer from './ContentSite/Register/Container';

// PlatformComponents
import AccountContainer from './Platform/Account/Container';
import AdminContainer from './Platform/Admin/Container';
import CompanyCreateContainer from './Platform/Company/Create/Container';
import CompanyEditContainer from './Platform/Company/Edit/Container';
import CompanyProfileContainer from './Platform/Company/Profile/Container';
import CompanySearchContainer from './Platform/Company/Search/Container';
import DashboardContainer from './Platform/Dashboard/Container'
import DealCreateContainer from './Platform/Deal/Create/Container';
import DealEditContainer from './Platform/Deal/Edit/Container';
import DealListContainer from './Platform/Deal/List/Container';
import DealManagerContainer from './Platform/Deal/Manager/Container';
import DealProfileContainer from './Platform/Deal/Profile/Container';
import DealSearchContainer from './Platform/Deal/Search/Container';
import ForgotPassword from './PreAuth/ForgotPassword/Container';
import LoginContainer from './PreAuth/Login/Container';
import PlatformContainer from './Platform/Container';
import PreAuth from './PreAuth/Container'
import SavedSearchContainer from './Platform/Search/SavedSearch/SavedSearch'
import SignupContainer from './Platform/Signup/Container'

// Special
import LabContainer from './Platform/Lab/Container'


// Assets
import './assets'

const ReactGA = require('react-ga');
ReactGA.initialize('UA-90673758-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/" component={PreAuth} >
        <IndexRoute component={LoginContainer} />
        <Route path='/forgot/:token' component={ForgotPassword} />
        <Route path='/register' component={RegisterContainer} />
      </Route>
      <Route path="/platform" component={PlatformContainer} >
        <IndexRoute component={DashboardContainer} />
        <Route path='/platform/the_lab_zone' component={LabContainer}  />
        <Route path='/platform/signup' component={SignupContainer}  />
        <Route path='/platform/account' component={AccountContainer}  />
        <Route path='/platform/admin' component={AdminContainer}  />
        <Route path='/platform/save/search' component={SavedSearchContainer}  />
        <Route path='/platform/deal/create' component={DealCreateContainer}  />
        <Route path='/platform/deal/list' component={DealListContainer}  />
        <Route path='/platform/deal/edit/:DealId' component={DealEditContainer}  />
        <Route path='/platform/deal/manager/:DealId' component={DealManagerContainer}  />
        <Route path='/platform/deal/search/saved/:SearchName' component={DealSearchContainer}  />
        <Route path='/platform/deal/search' component={DealSearchContainer}  />
        <Route path='/platform/deal/:DealId' component={DealProfileContainer}  />
        <Route path='/platform/company/create' component={CompanyCreateContainer}  />
        <Route path='/platform/company/edit/:CompanyId(/:init)' component={CompanyEditContainer}  />
        <Route path='/platform/company/search/saved/:SearchName' component={CompanySearchContainer}  />
        <Route path='/platform/company/search(/:CompanyName)' component={CompanySearchContainer}  />
        <Route path='/platform/company/:CompanyId' component={CompanyProfileContainer}  />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
