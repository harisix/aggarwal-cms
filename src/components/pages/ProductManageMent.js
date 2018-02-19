import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Modal from '../modals';
import Header from '../header';


function checkStatus(cell, row) {
  return <span>{row.status === "SHOW"?"Active":"Inactive"}</span>;
}

function productImage(cell, row) {
  return <img src={row.itemImage} alt="" width="100" />;
}


class ProductManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      productName:'',
      price:'',
      category1:'',
      category2:'',
      category3:'',
      category4:'',
      prodInject:'',
      quantityInStock:'',
      unit:'',
      status:'',
      currentItem:{},
      imageBin:'',
      offerPrice:'',
      modalLabel:'',
      showModal: false
    };
    this.editRowHandler = this.editRowHandler.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }
  componentDidMount() {
    this.getProducts();  
  }
  getProducts() {
    axios.get('http://35.200.191.243:8080/v1.0/product')
      .then(response => {
        this.close();
        this.setState({
          data:response.data
        });
      });
  }
  createCustomToolBar = props => {
    return (
      <div className='row' style={ { margin: '15px 0px', width:'100%' } }>
        <div className='col-xs-8'>
          { props.components.btnGroup }
        </div>
        <div className='col-xs-4'>
          { props.components.searchPanel }
        </div>
      </div>
    );
  }
  addProduct(cell, row) {
    this.setState({
      prodInject:'add',
      showModal:true,
      quantityInStock:"",
      unit: "",
      category1:"",
      category2:"",
      category3:"",
      category4:"",
      price:"",
      status:"", 
      currentItem:"", 
      offerPrice:"", 
      productName:row.itemName,
      imageBin:'',
      modalLabel:"Add product",
      stocks: [{
        price:"",
        offerPrice:"",
        quantityInStock:"",
        "unit": "",
        "unitType": "KILOGRAM",
      },
      {
        price:"",
        offerPrice:"",
        quantityInStock:"",
        "unit": "",
        "unitType": "KILOGRAM",
      }]
    })
  }
  editRowHandler(cell, row) {
    this.setState({
      prodInject:'edit',
      modalLabel:"Edit product",
      productName:row.itemName,
      price:row.price,
      offerPrice:row.offerPrice,
      currentItem:row,
      quantityInStock:row.quantityInStock,
      unit: row.unit,
      category1:row.category1,
      category2:row.category2,
      category3:row.category3,
      category4:row.category4,
      status:row.status,
      showModal:true,
      stocks: [{
        price:row.price,
        offerPrice:row.offerPrice,
        quantityInStock:row.quantityInStock,
        "unit": row.unit,
        "unitType": "KILOGRAM",
      },
      {
        price:row.price,
        offerPrice:row.offerPrice,
        quantityInStock:row.quantityInStock,
        "unit": row.unit,
        "unitType": "KILOGRAM",
      }]
    });
  }
  close() {
    this.setState({
      showModal:false
    }) 
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _onSelect(e, int) {
    this.setState({
      [e]:int.value
    });
  }

  uploadImage(e) {
    const files = e.target.files;
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        imageBin:reader.result
      });
    };
  }

  handleSubmit(e, newStocks) {
    e.preventDefault();
    const { price, currentItem, offerPrice, productName, imageBin, category1, category2, category3, category4, prodInject, quantityInStock, unit, status } = this.state;
    if(prodInject === "edit") {
      const stocks = [{
          "price": price,
          "offerPrice": offerPrice,
          "quantityInStock": quantityInStock,
          "unit": unit,
          "unitType": "KILOGRAM",
        }].concat(newStocks);
      axios.put('http://35.200.191.243:8080/v1.0/product/'+currentItem.itemId, {
        "itemId": currentItem.itemId,
        "itemName": productName,
        "itemDesc": currentItem.itemDesc,
        "itemImage": imageBin === ""?"":imageBin,
        "price": price,
        "offerPrice": offerPrice,
        "gst": currentItem.gst,
        "priceWithGST": currentItem.priceWithGST,
        "category1": category1,
        "category2": category2,
        "category3": category3,
        "category4": category4,
        "quantityInStock": quantityInStock,
        "validTill": currentItem.validTill,
        "unit": currentItem.unit,
        "unitType": "KILOGRAM",
        "status": status,
        "stocks": stocks
      })
        .then(response => {
          this.getProducts();
        });
    } else {
      const stocks = [{
          "price": price,
          "offerPrice": offerPrice,
          "quantityInStock": quantityInStock,
          "unit": unit,
          "unitType": "KILOGRAM",
        }].concat(newStocks);
      axios.post('http://35.200.191.243:8080/v1.0/product', {
        "itemName": productName,
        "itemDesc": "",
        "itemImage": imageBin === ""?"":imageBin,
        "price": price,
        "offerPrice": offerPrice,
        "gst": 0,
        "priceWithGST": 0,
        "category1": category1,
        "category2": category2,
        "category3": category3,
        "category4": category4,
        "quantityInStock": quantityInStock,
        "unit": unit,
        "unitType": "KILOGRAM",
        "status": status,
        "stocks": stocks
      })
      .then(response => {
        console.log(response);
        this.getProducts();
      });
    }
  }

  renderBtns(cell, row) {
    return <button onClick={() => this.editRowHandler(cell, row)} className='btn btn-info react-bs-table-add-btn' style={{width:'100%'}}><i className="fa glyphicon glyphicon-edit fa-edit"></i> edit</button>
  }

  render() {
    const { data, modalLabel } = this.state;
    const options = {
      toolBar: this.createCustomToolBar
    };
    return (<div>
      <Header />
        <div className="ui container">
          <h1>Product Management</h1>
          <button className='btn btn-info addButton' onClick={this.addProduct}><i className="fa glyphicon glyphicon-plus fa-plus"></i> New</button> 
          <BootstrapTable data={ data }
            options={ options }
            pagination
            search>
            <TableHeaderColumn dataField='itemId' isKey={ true } width="70">S.No.</TableHeaderColumn>
            <TableHeaderColumn dataField='itemImage' width='120' dataFormat={productImage}>Image</TableHeaderColumn>
            <TableHeaderColumn dataField='itemName'>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='status' width="120" dataFormat={checkStatus}>Status</TableHeaderColumn>
            <TableHeaderColumn width="120" dataFormat={this.renderBtns.bind(this)}></TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal showModal={this.state.showModal} close={this.close} stateField={this.state} handleChange={this.handleChange} uploadImage={this.uploadImage} handleSubmit={this.handleSubmit} onClick={this.onClick} _onSelect={this._onSelect} title={modalLabel} />
      </div>);
  }
}
export default ProductManagement;
