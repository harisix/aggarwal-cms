import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Modal, Form, FormGroup, FormControl, textarea, ControlLabel, Col, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Header from '../header';


class RegionManagement extends React.Component {
  render() {
    return (<div>
      <Header />
        <div className="ui container">
          <div className="setting">
            <h1>Settings</h1>
            <Form horizontal onSubmit={this.handleSubmit}>
              <div>
                <h2>Medicos</h2>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={4}>
                    <Col sm={4}>Contact Number</Col>
                    <Col sm={8}>
                      <FormControl name="Contact Number" type="text" placeholder="Enter contact number" onChange={this.handleChange} />
                    </Col>
                  </Col>
                </FormGroup>
              </div>
              <div>
                <h2>Optical</h2>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={4}>
                    <Col sm={4}>Contact Number</Col>
                    <Col sm={8}>
                      <FormControl name="Contact Number" type="text" placeholder="Enter contact number" onChange={this.handleChange} />
                    </Col>
                  </Col>
                </FormGroup>
              </div>
              <div>
                <h2>Help Us?</h2>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={4}>
                    <Col sm={4}>Contact Us</Col>
                    <Col sm={8}>
                      <FormControl name="Contact Us" type="text" placeholder="Name" onChange={this.handleChange} />
                    </Col>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={4}>
                    <Col sm={4}>Reach Us</Col>
                    <Col sm={8}>
                      <FormControl name="Contact Us" type="text" placeholder="Name" onChange={this.handleChange} />
                    </Col>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={4}>
                    <Col sm={4}>Store Timings</Col>
                    <Col sm={8}>
                      <FormControl name="Contact Us" type="text" placeholder="Name" onChange={this.handleChange} />
                    </Col>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={4}>
                    <Col sm={4}>Order Details</Col>
                    <Col sm={8}>
                      <textarea name="Contact Us" type="text" placeholder="Name" onChange={this.handleChange} />
                    </Col>
                  </Col>
                </FormGroup>
              </div>
            </Form>
          </div>
        </div>
      </div>);
  }
}

export default RegionManagement;