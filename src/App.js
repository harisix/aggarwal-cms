import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import ProductManagement from "./components/pages/ProductManageMent";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import DashboardPage from "./components/pages/DashboardPage";
import CategoryManagement from "./components/pages/CategoryManageMent";
import SubCategory from "./components/pages/SubCategory";
import LevelOneSubCategory from "./components/pages/LevelOneSubCategory";
import LevelTwoSubCategory from "./components/pages/LevelTwoSubCategory";
import OrderManagement from "./components/pages/OrderManagement";
import RegionManagement from "./components/pages/RegionManagement";
import SalesmanManagement from "./components/pages/SalesmanManagement";
import HomeBanners from "./components/pages/HomeBanners";
import MedicosBanners from "./components/pages/MedicosBanners";
import OpticalsBanners from "./components/pages/OpticalsBanners";
import CustomerManagement from "./components/pages/CustomerManagement";
import DealsoftheDay from "./components/pages/DealsoftheDay";
import DailyNeeds from "./components/pages/DailyNeeds";
import Settings from "./components/pages/Settings";

const App = ({ location }) => (
  <div>
    <Route exact location={location} path="/login" component={LoginPage} />
    <Route
      location={location}
      path="/forgot_password"
      component={ForgotPasswordPage}
    />
    <Route
      location={location}
      path="/reset_password"
      component={ResetPasswordPage}
    />
    <Route
      location={location}
      path="/dashboard"
      component={DashboardPage}
    />
    <Route
      location={location}
      path="/product"
      component={ProductManagement}
    />
    <Route
      location={location}
      path="/category"
      component={CategoryManagement}
    />
    <Route
      location={location}
      path="/sub-category"
      component={SubCategory}
    />
    <Route
      location={location}
      path="/level-one-sub-category"
      component={LevelOneSubCategory}
    />
    <Route
      location={location}
      path="/level-two-sub-category"
      component={LevelTwoSubCategory}
    />
    <Route
      location={location}
      path="/orderManagement"
      component={OrderManagement}
    />
    <Route
      location={location}
      path="/regionManagement"
      component={RegionManagement}
    />
	<Route
      location={location}
      path="/salesmanManagement"
      component={SalesmanManagement}
    />
	<Route
      location={location}
      path="/homeBanners"
      component={HomeBanners}
    />
	<Route
      location={location}
      path="/medicosBanners"
      component={MedicosBanners}
    />
	<Route
      location={location}
      path="/opticalsBanners"
      component={OpticalsBanners}
    />
	<Route
      location={location}
      path="/customerManagement"
      component={CustomerManagement}
    />
	<Route
      location={location}
      path="/dealsoftheDay"
      component={DealsoftheDay}
    />
	<Route
      location={location}
      path="/dailyNeeds"
      component={DailyNeeds}
    />
  <Route
    location={location}
    path="/settings"
    component={Settings}
    />
    <Redirect from="/" exact to="/login" />
  </div>
);

export default App;
