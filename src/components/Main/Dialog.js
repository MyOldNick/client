import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { StyleRoot } from "radium";

import API from "../../config";
import styles from "../../animations/animation";

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMassage: false,
      count: 0,
    };
  }

  componentDidMount() {
    this.setState({ count: this.props.el.message.length });

    this.newMessage();
  }

  componentDidUpdate() {
    if (this.state.count < this.props.el.message.length) {
      this.newMessage();
    }
  }

  newMessage = () => {
    let lastMsg = this.props.el.message[this.props.el.message.length - 1];

    if (lastMsg) {
      if (!lastMsg.read && lastMsg.author !== this.props.user) {
        if (!this.state.newMassage) {
          this.setState({
            newMassage: true,
            count: this.props.el.message.length,
          });
        }
        return;
      }
    }
    return;
  };

  read = () => {
    let lastMsg = this.props.el.message[this.props.el.message.length - 1];

    if (!lastMsg.read && lastMsg.author !== this.props.user) {
      axios
        .post(`${API}/dialogs`, {
          dialog: this.props.el._id,
        })
        .then((value) => {});

      this.setState({ newMassage: false });
    }
  };

  render() {
    return (
      <Row className="pt-1" onClick={this.read}>
        <Col xs={2} className="pt-3 ">
          {this.props.el.users.map((el) =>
            el.login === this.props.user ? undefined : (
              <Image
                key={el._id}
                src={`${API}/${el.avatar}`}
                roundedCircle
                width="50px"
                height="50px"
              />
            )
          )}
        </Col>
        <Col xs={7} className="ml-3 pt-1 unselectable">
          {this.props.el.users.map((el) =>
            el.login === this.props.user ? undefined : (
              <h5 key={el._id} className="mt-2">
                {el.login}
              </h5>
            )
          )}
          {this.props.el.message.length > 0 ? (
            <p style={{ color: "gray" }}>
              {this.props.el.message[this.props.el.message.length - 1]
                .author === this.props.user
                ? "Вы"
                : this.props.el.message[this.props.el.message.length - 1]
                    .author}
              :{" "}
              {this.props.el.message[
                this.props.el.message.length - 1
              ].text.substring(0, 12)}
            </p>
          ) : (
            <p style={{ color: "gray" }}>*сообщений нет*</p>
          )}
        </Col>
        <Col className="pt-3">
          {this.state.newMassage ? (
            <StyleRoot style={styles.zoomIn}>
              <div
                className="mt-2 text-center"
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#007cff",
                  paddingTop: "4px",
                }}
              >
                <p style={{ color: "white", fontSize: "11px" }}>new</p>
              </div>
            </StyleRoot>
          ) : undefined}
        </Col>
      </Row>
    );
  }
}
