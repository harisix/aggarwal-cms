import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Header from '../header';

function customerName(cell, row) {
  if(!isEmpty(row.customerDetails)) {
    return <span>{row.customerDetails.firstName} {row.customerDetails.lastName}</span>;
  } else {
    return <span>-</span>;
  }
}

function contactNumber(cell, row) {
  if(!isEmpty(row.customerDetails)) {
    return <span>{row.customerDetails.authentication.authId}</span>;
  } else {
    return <span>-</span>;
  }
}

function contactAddress(cell, row) {
  if(!isEmpty(row.customerDetails)) {
    if(!isEmpty(row.customerDetails.addresses)) {
      return <span>{row.customerDetails.addresses[0].addressLine1} {row.customerDetails.addresses[0].addressLine2} {row.customerDetails.addresses[0].addressLine3} {row.customerDetails.addresses[0].town}-{row.customerDetails.addresses[0].postCode}</span>;
    } else {
      return <span>-</span>;
    }
  } else {
    return <span>-</span>;
  }
}

function orderDate(cell, row) {
  return <span>{moment(row.orderedOn).format('DD/MM/YYYY, h:mm:ss a')}</span>;
}


class OrderManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      indCountSize:0
    };
  }
  componentDidMount() {
    axios.get('http://35.200.158.71:8080/v1.0/order',  { auth:{username: '7373478346',password: 'Password1'}})
      .then(response => {
        this.setState({
          data:response.data
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
          <h1>Order Management</h1>
          <BootstrapTable data={data} pagination search>
            <TableHeaderColumn isKey={true} dataField='id' width="70" dataFormat={this.serialNumber.bind(this)}>S.NO.</TableHeaderColumn>
            <TableHeaderColumn dataField='orderId'>Order id</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName' dataFormat={customerName}>Customer Name</TableHeaderColumn>
            <TableHeaderColumn dataField='addresses' dataFormat={contactAddress}>Address</TableHeaderColumn>
            <TableHeaderColumn dataField='authId' dataFormat={contactNumber}>Contact Number</TableHeaderColumn>
            <TableHeaderColumn dataField='totalAmountToBePaid'>Order Amount</TableHeaderColumn>
            <TableHeaderColumn dataField='serviceType'>Service type</TableHeaderColumn>
            <TableHeaderColumn dataField='paymentStatus'>Order Status</TableHeaderColumn>
            <TableHeaderColumn dataField='orderedOn' dataFormat={orderDate} width="170">Ordered Date & time</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>);
  }
}

export default OrderManagement;