import React from "react";
import Header from '../header';

class DashboardPage extends React.Component {
  render() {
    return (<div>
    	<Header />
      <div className="ui container">
        <div className="col-xs-10 center-block">
          <h1>Dashboard</h1>
          <div className="row">
            <div className="col-xs-6">
              <div className="dashboard-col">
                <h3>Customer count</h3>
                <div className="dashboard-content">
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="dashboard-col">
                <h3>Orders count</h3>
                <div className="dashboard-content">
                </div>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="dashboard-col">
                <h3>Alerts</h3>
                <div className="dashboard-content">
                </div>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="dashboard-col">
                <h3>Least product used</h3>
                <div className="dashboard-content">
                </div>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="dashboard-col">
                <h3>Most product used</h3>
                <div className="dashboard-content">
                </div>
              </div>
            </div>
          </div>
        </div>	
      </div>
    </div>);
  }
}

export default DashboardPage;