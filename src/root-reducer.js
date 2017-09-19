// import Login from './Platform/Login/Reducer';
import Account from './Platform/Account/Reducer'
import Admin from './Platform/Admin/Reducer'
import AutoDealList from './Platform/Search/AutoDealList/Reducer'
import AutoLenderList from './Platform/Search/AutoLenderList/Reducer'
import BorrowerManager from './Platform/Deal/Manager/Borrower/Reducer';
import CompanyCreate from './Platform/Company/Create/Reducer';
import CompanyEdit from './Platform/Company/Edit/Reducer';
import CompanyProfile from './Platform/Company/Profile/Reducer';
import CompanySearch from './Platform/Company/Search/Reducer';
import Dashboard from './Platform/Dashboard/Reducer';
import DashboardSavedSearch from './Platform/Dashboard/SavedSearches/Reducer';
import DashboardNotifications from './Platform/Dashboard/Notifications/Reducer';
import DealCreate from './Platform/Deal/Create/Reducer';
import DealEdit from './Platform/Deal/Edit/Reducer';
import DealList from './Platform/Deal/List/Reducer';
import DealManager from './Platform/Deal/Manager/Reducer';
import DealProfile from './Platform/Deal/Profile/Reducer';
import DealSearch from './Platform/Deal/Search/Reducer';
import ForgotPassword from './PreAuth/ForgotPassword/Reducer';
import ForgotModal from './PreAuth/ForgotPasswordModal/Reducer';
import Help from './Platform/Help/Reducer'
import Homepage from './ContentSite/Reducer';
import LenderManager from './Platform/Deal/Manager/Lender/Reducer';
import Login from './PreAuth/Login/Reducer';
import Messenger from './Platform/Messenger/Reducer'
import NavReducer from './ContentSite/Navigation/NavReducer';
import News from './Platform/Dashboard/News/Reducer';
import Platform from './Platform/Reducer';
import {reducer as notifications} from 'react-notification-system-redux';
import Register from './ContentSite/Register/Reducer';
import SavedSearch from './Platform/Search/SavedSearch/Reducer';
import SavedSearchModal from './Platform/Search/SavedSearchModal/Reducer';
import Signup from './Platform/Signup/Reducer'
import TermSheetGeneratorReducer from './Platform/termSheetGenerator/TermSheetGeneratorReducer'
import FormReducer from './Form/Reducer'

import Lab from './Platform/Lab/Reducer'

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  Account,
  Admin,
  AutoDealList,
  AutoLenderList,
  BorrowerManager,
  CompanyCreate,
  CompanyEdit,
  CompanyProfile,
  CompanySearch,
  Dashboard,
  DashboardSavedSearch,
  DashboardNotifications,
  DealCreate,
  DealEdit,
  DealList,
  DealManager,
  DealProfile,
  DealSearch,
  ForgotPassword,
  ForgotModal,
  Help,
  Homepage,
  LenderManager,
  Login,
  Messenger,
  NavReducer,
  News,
  notifications,
  Platform,
  Register,
  SavedSearch,
  SavedSearchModal,
  Signup,
  TermSheetGeneratorReducer,
  // UPDATE //
  FormReducer,
  Lab,
  // UPDATE ^^
});

export default rootReducer;
