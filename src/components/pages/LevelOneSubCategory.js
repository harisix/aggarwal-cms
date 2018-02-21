import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Modal from '../modals/levelone';
import Header from '../header';

function checkStatus(cell, row) {
  return <span>{row.status === "SHOW"?"Active":"Inactive"}</span>;
}


class LevelOneSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      indCountSize:0,
      categoryname:'',
      maincategory:'',
      submain:'',
      statusActive:'',
    };
    this.addProduct = this.addProduct.bind(this);
    this.editRowHandler = this.editRowHandler.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }
  getData() {
    axios.get('http://35.200.158.71:8080/v1.0/category')
      .then(response => {
        this.setState({
          data:response.data.categories,
        });
      }); 
  }
  componentDidMount() {
    axios.get('http://35.200.158.71:8080/v1.0/category')
      .then(response => {
        const category = [];
        response.data.categories.filter(el => {
          el.subCategoryList1.filter(elem => {
            elem.subCategoryList2.filter(elem2 => {
              elem2.main = el.name;
              elem2.subMain = elem.name;
              category.push(elem2);
            });
          });
        });
        this.setState({
          data:category
        });
      });  
  }
  handleSubmit(e) {
    e.preventDefault();
    const { categoryname, maincategory, submain, statusActive } = this.state;
    axios.put('http://35.200.158.71:8080/v1.0/category', {
      "category":[
        {
          "name":this.state.categoryname,
          "main":this.state.maincategory,
          "subMain":this.state.submain,
          "status":this.state.statusActive,
        }
      ]
    })
    .then(response => {
      this.setState({
        showModal:false
      });
    });   
  }
  editRowHandler(cell, row) {
    this.setState({
      modalLabel:"Category",
      categoryname:row.name,
      maincategory:row.main,
      submain:row.subMain,
      statusActive:row.status,
      showModal:true,
    });
  }
  addProduct() {
    this.setState({
      modalLabel:"Add New",
      categoryname:'',
      maincategory:'',
      submain:'',
      showModal:true
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  serialNumber() {
    this.state.indCountSize += 1;
    return <span>{this.state.indCountSize}</span>;
  }
  _onSelect(e, int) {
    this.setState({
      [e]:int.value
    });
  }
  close() {
    this.setState({
      showModal:false
    }) 
  }
  productIcon(cell, row) {
    return <img src={row.image} alt="" />;
  }
  renderBtns(cell, row) {
    return <button onClick={() => this.editRowHandler(cell, row)} className='btn btn-info react-bs-table-add-btn'><i className="fa glyphicon glyphicon-edit fa-edit"></i> edit</button>
  }
  
  render() {
    const { data, modalLabel } = this.state;
    return (<div>
    	<Header />
        <div className="ui container">
          <h1>Category Management</h1>
          <h4>1 level Sub Category</h4>
          <button className='btn btn-info' onClick={this.addProduct}>Add New</button> 
          <BootstrapTable 
            data={data}
            search
            pagination>
            <TableHeaderColumn isKey={true} dataField='id' width="70" dataFormat={this.serialNumber.bind(this)}>S.NO.</TableHeaderColumn>
            <TableHeaderColumn dataField='image' width="80" dataFormat={this.productIcon.bind(this)}>Icon</TableHeaderColumn>
            <TableHeaderColumn dataField='name' width="250">Name</TableHeaderColumn>
            <TableHeaderColumn dataField='main' width="150">Main Category</TableHeaderColumn>
            <TableHeaderColumn dataField='subMain'>Sub Category</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataFormat={checkStatus}>Status</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.renderBtns.bind(this)}>option</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal showModal={this.state.showModal} close={this.close} stateField={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} _onSelect={this._onSelect} title={modalLabel} />
      </div>);
  }
}

export default LevelOneSubCategory;