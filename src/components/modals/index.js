import React from "react";
import { Modal, Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import axios from 'axios';

const statusOptions = ["SHOW", "HIDE"];

class ModalWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category1Opt:[],
      category2Opt:[],
      category3Opt:[],
      category4Opt:[],
      stocks:[{
        price:"",
        offerPrice:"",
        quantityInStock:"",
        unit:"",
        unitType:""
      }],
      selected: '',
    }
    this.uploadImage = this.uploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onChange = this._onChange.bind(this)
    this.handleChangeStock = this.handleChangeStock.bind(this);
    this.handleAddNewStocks = this.handleAddNewStocks.bind(this);
  }
  componentDidMount() {
    const category1 = [];
    const category2 = [];
    const category3 = [];
    const category4 = [];
    axios.get('http://35.200.158.71:8080/v1.0/category')
      .then(response => {
        response.data.categories.filter(el => {
          category1.push(el.name);
          el.subCategoryList1.filter(elem => {
            category2.push(elem.name);
            elem.subCategoryList2.filter(elem2 => {
              category3.push(elem2.name);
              elem2.subCategoryList3.filter(elem3 => {
                category4.push(elem3.name);
              });
            });
          });
        });
        this.setState({
          category1Opt:category1,
          category2Opt:category2,
          category3Opt:category3,
          category4Opt:category4
        })
      });
  }
  close() {
    this.props.close();
  }
  uploadImage(e) {
    this.props.uploadImage(e);
  }
  handleChange(e) {
    this.props.handleChange(e);
  }
  handleSubmit(e) {
    this.props.handleSubmit(e, this.state.stocks);
  }
  _onSelect(e, int) {
    this.props._onSelect(e, int);
  }
  _onChange(e, int){
    this.setState({selected: e, int})
  }

  handleChangeStock = (idx) => (evt) => {
    const newStock = this.state.stocks.map((stocks, sidx) => {
      if (idx !== sidx) return stocks;
      return { ...stocks, [evt.target.name]: evt.target.value };
    });
    
    this.setState({ stocks: newStock });
  }
  handleAddNewStocks() {
    this.setState({ stocks: this.state.stocks.concat([{ price: '', offerPrice:"",
        quantityInStock:"", unit:"", unitType:"" }]) });
  }
  render() {
    const { showModal, stateField, title } = this.props;
    const { category1Opt, category2Opt, category3Opt, category4Opt, dropdown } = this.state;
    const defaultOption = this.state.selected;
    const options = [1,2,3,4,5,6,7,8,9]
    return <Modal show={showModal} onHide={this.close.bind(this)}>
      <Modal.Body>
        <h3>{title}</h3>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Product Name
            </Col>
            <Col sm={7}>
              <FormControl value={stateField.productName} name="productName" type="text" placeholder="Name" onChange={this.handleChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Status
            </Col>
            <Col sm={7}>
              <Dropdown options={statusOptions} onChange={this._onSelect.bind(this, 'status')} value={stateField.status} placeholder="Select an option" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Category1
            </Col>
            <Col sm={7}>
              <Dropdown options={category2Opt} onChange={this._onSelect.bind(this, 'category2')} value={stateField.category2} placeholder="Select an option" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Category2
            </Col>
            <Col sm={7}>
              <Dropdown options={category3Opt} onChange={this._onSelect.bind(this, 'category3')} value={stateField.category3} placeholder="Select an option" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Category3
            </Col>
            <Col sm={7}>
              <Dropdown options={category4Opt} onChange={this._onSelect.bind(this, 'category4')} value={stateField.category4} placeholder="Select an option" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Product Image
            </Col>
            <Col sm={7}>
              <FormControl type="file" onChange={this.uploadImage} />
            </Col>
          </FormGroup>
          
          <div>
            <h3>Stocks</h3>
            <FormGroup controlId="formHorizontalPrice">
              <Col componentClass={ControlLabel} sm={3}>
                Actual Price
              </Col>
              <Col sm={7}>
                <FormControl value={stateField.price} name="price" type="text" placeholder="Price" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Offer Price
              </Col>
              <Col sm={7}>
                <FormControl value={stateField.offerPrice} name="offerPrice" type="text" placeholder="Offer Price" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Quantity
              </Col>
              <Col sm={7}>
                <FormControl value={stateField.quantityInStock} name="quantityInStock" type="text" placeholder="Quantity" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Unit
              </Col>
              <Col sm={7}>
                <FormControl value={stateField.unit} name="unit" type="text" placeholder="unit" onChange={this.handleChange} />
              </Col>
            </FormGroup>
          </div>
          
          {this.state.stocks.map((el, i) => {
              return <div key={i}>
              <h3>Stocks</h3>
              <FormGroup controlId="formHorizontalPrice">
                <Col componentClass={ControlLabel} sm={3}>
                  Actual Price
                </Col>
                <Col sm={7}>
                  <FormControl value={el.price} name="price" type="text" placeholder="Actual Price" onChange={this.handleChangeStock(i)} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPrice">
                <Col componentClass={ControlLabel} sm={3}>
                  Offer Price
                </Col>
                <Col sm={7}>
                  <FormControl value={el.offerPrice} name="offerPrice" type="text" placeholder="Offer Price" onChange={this.handleChangeStock(i)} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Quantity
                </Col>
                <Col sm={7}>
                  <FormControl value={el.quantityInStock} name="quantityInStock" type="text" placeholder="Quantity" onChange={this.handleChangeStock(i)} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Unit
                </Col>
                <Col sm={7}>
                  <FormControl value={el.unit} name="unit" type="text" placeholder="unit" onChange={this.handleChangeStock(i)} />
                </Col>
              </FormGroup>
            </div>
          })}

          {this.state.stocks.length < 2 && <FormGroup>
            <Col smOffset={3} sm={7}>
              <Button onClick={this.handleAddNewStocks}>
                Add new item
              </Button>
            </Col>
          </FormGroup>}

          <FormGroup>
            <Col smOffset={3} sm={7}>
              <Button type="submit">
                Update
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>;
  }
}
export default ModalWrap;