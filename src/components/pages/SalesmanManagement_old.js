import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Modal from '../modals/salesman';
import Header from '../header';


class SalesmanManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      regionName:"",
      sellerId:"",
      id:"",
      indCountSize:0,
      showModal:false
    };
    this.editRowHandler = this.editRowHandler.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios.post('http://35.200.158.71:8080/v1.0/seller')
      .then(response => {
        console.log(response);
        this.setState({
          data:response.data.regionList
        });
      }); 
  }
  serialNumber() {
    this.state.indCountSize += 1;
    return <span>{this.state.indCountSize}</span>;
  }
  editRowHandler(cell, row) {
    this.setState({
      regionName:row.name,
      sellerId:row.sellerId,
      id:row._id,
      showModal:true
    })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  close() {
    this.setState({
      showModal:false
    }) 
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.put('http://35.200.158.71:8080/v1.0/referenceData', {
      "regionList":[
        {
          "name":this.state.regionName,
          "sellerId":this.state.sellerId,
          "_id":this.state.id
        }
      ]
    })
      .then(response => {
        this.getData();
        this.setState({
          showModal:false
        });
      });  
  }
  renderBtns(cell, row) {
    return <button onClick={() => this.editRowHandler(cell, row)} className='btn btn-info react-bs-table-add-btn'><i className="fa glyphicon glyphicon-edit fa-edit"></i> edit</button>
  }
  render() {
    const { data } = this.state;
    return (<div>
    	<Header />
        <div className="ui container">
          <h1>Salesman Management</h1>
          <BootstrapTable data={data} pagination search>
            <TableHeaderColumn isKey={true} dataField='id' width="70" dataFormat={this.serialNumber.bind(this)}>S.NO.</TableHeaderColumn>
            <TableHeaderColumn dataField='sellerName' width="230">Name</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.renderBtns.bind(this)}></TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal showModal={this.state.showModal} close={this.close} stateField={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} title={"Region"} />
      </div>);
  }
}

export default SalesmanManagement;