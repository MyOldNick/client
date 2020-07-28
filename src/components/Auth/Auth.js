import React, { Component, Fragment } from "react";
import { Container, Form, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import API from '../../config'

//тут все проще, чем рожать детей

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  emailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post(`${API}/auth`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((value) => {
        if (value.data) {
          this.props.selectUser(value.data);
          localStorage.setItem('token', JSON.stringify(value.data.token))
        }
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  render() {
    return (
      <Container
        style={{ width: "400px", height: "500px" }}
        className="mt-5 pt-5 text-center"
      >
        <h4>Авторизация</h4>
        <Form className="mt-4" onSubmit={this.handleSubmit}>
          <Form.Label>E-mail</Form.Label>
          <FormControl
            size="lg"
            placeholder="E-mail"
            type="email"
            value={this.state.email}
            onChange={this.emailChange}
          />
          <Form.Label className="mt-4">Пароль</Form.Label>
          <FormControl
            type="password"
            size="lg"
            placeholder="Password"
            value={this.state.password}
            onChange={this.passwordChange}
          />
          <Button type="submit" className="mt-4">
            Войти
          </Button>
        </Form>
        <p className="mt-4">
          {" "}
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </p>
      </Container>
    );
  }
}
