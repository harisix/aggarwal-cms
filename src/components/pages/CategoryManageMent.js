import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Header from '../header';

function checkStatus(cell, row) {
  return <span>{row.status === "SHOW"?"Active":"Inactive"}</span>;
}


class CategoryManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      indCountSize:0
    };
  }
  componentDidMount() {
    axios.get('http://35.200.158.71:8080/v1.0/category')
      .then(response => {
        this.setState({
          data:response.data.categories
        });
      });  
  }
  serialNumber() {
    this.state.indCountSize += 1;
    return <span>{this.state.indCountSize}</span>;
  }
  render() {
    const { data } = this.state;
    return (<div>
    	<Header />
        <div className="ui container">
          <h1>Category Management</h1>
          <h4>Main Category</h4>
          <BootstrapTable data={data}>
            <TableHeaderColumn isKey={true} dataField='id' width="70" dataFormat={this.serialNumber.bind(this)}>S.NO.</TableHeaderColumn>
            <TableHeaderColumn dataField='name' width="200">Name</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataFormat={checkStatus}>Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>);
  }
}

export default CategoryManagement;