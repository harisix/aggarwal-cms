import React from "react";
import { Modal, Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import axios from 'axios';

const statusOptions = ["SHOW", "HIDE"];

class ModalWrap extends React.Component {
	constructor(props) {
		super(props)
    this.state ={
      category1Opt:[],
      category2Opt:[],
      category3Opt:[],
      category4Opt:[]
    }
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this._onSelect = this._onSelect.bind(this);
	}
  
	close() {
		this.props.close();
	}
  componentDidMount() {
    const category1 = [];
    const category2 = [];
    const category3 = [];
    const category4 = [];
    const category5 = [];
    axios.get('http://35.200.191.243:8080/v1.0/category')
      .then(response => {
        response.data.categories.filter(el => {
          category1.push(el.name);
          el.subCategoryList1.filter(elem => {
            category2.push(elem.name);
            elem.subCategoryList2.filter(elem2 => {
              elem2.subMain = elem.name;
              category3.push(elem2.subMain);
              category4.push(elem2.name)
              elem2.subCategoryList3.filter(elem3 => {
                category5.push(elem3.name);
              });
            });
          });
        });
        this.setState({
          category1Opt:category1,
          category2Opt:category2,
          category3Opt:category3,
          category4Opt:category4,
          category5Opt:category5
        })
      });
  }
	handleChange(e) {
		this.props.handleChange(e);
	}
	handleSubmit(e) {
		this.props.handleSubmit(e);
	}
  _onSelect(e, int) {
    this.props._onSelect(e, int);
  }
  render() {
    const { category1Opt, category2Opt, category3Opt, category4Opt, category5Opt, salesmanId, sellerName } = this.state;
  	const { showModal, stateField, title, main } = this.props;
    return <Modal show={showModal} onHide={this.close.bind(this)}>
      <Modal.Body>
        <h3>{title}</h3>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Category Name
            </Col>
            <Col sm={7}>
              <FormControl value={stateField.categoryname} name="categoryname" type="text" placeholder="Name" onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Main Category
            </Col>
            <Col sm={7}>
              <FormControl value="Store" name="maincategory" type="text" placeholder="Name" onChange={this.handleChange} />                  
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Sub Category
            </Col>
            <Col sm={7}>
              <Dropdown options={category3Opt} onChange={this._onSelect.bind(this, 'category3')} value={stateField.category3} placeholder="Select an option" />              
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={3}>
              Status
            </Col>
            <Col sm={7}>
              <Dropdown options={statusOptions} onChange={this._onSelect.bind(this, 'statusActive')} value={stateField.statusActive} placeholder="Select an option" />                 
            </Col>
          </FormGroup>
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