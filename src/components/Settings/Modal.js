import React, { Component } from "react";
import { Modal, Button, Image, Col, Row } from "react-bootstrap";

import Settings from "../Settings/Settings";

export default class ModalSettings extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <Row>
                <Col xs={1}>
                  <Image
                    src="http://img.icons8.com/color/48/000000/odnoklassniki.png"
                    width="50px"
                  />
                </Col>
              <Col
                className="mt-2 ml-5 d-flex flex-row"
                style={{ color: "black", textDecoration: "none" }}
              >
                <h3>Instagram</h3>
                <p className="text-secondary mt-2"> (settings)</p>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Settings user={this.props.user} selectUser={this.props.selectUser} />
        </Modal.Body>
      </Modal>
    );
  }
}
