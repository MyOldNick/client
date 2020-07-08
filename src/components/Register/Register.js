import React, { Component, Fragment } from "react";
import {
  Container,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      email: "",
      password: "",
      status: 0,
    };
  }

  loginChange = (event) => {
    this.setState({ login: event.target.value });
  };

  emailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post("https://infinite-waters-39278.herokuapp.com/register", {
        login: this.state.login,
        email: this.state.email,
        password: this.state.password,
      })
      .then((value) => {
        this.setState({ status: value.status });
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  render() {
    return (
      <Container
        style={{ width: "400px", height: "550px" }}
        className="shadow-sm mt-5 pt-5 text-center"
      >
        {this.state.status === 200 ? (
          <p className='mt-5'>
            Аккаунт создан, теперь  Вы можете
            <a href="/">
              <h6>Войти</h6>
            </a>
          </p>
        ) : (
          <Fragment>
            <h4>Регистрация</h4>
            <Form className="mt-4" onSubmit={this.handleSubmit}>
              <Form.Label>Логин</Form.Label>
              <FormControl
                size="lg"
                placeholder="Login"
                value={this.state.login}
                onChange={this.loginChange}
              />
              <Form.Label className="mt-4">E-mail</Form.Label>
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
                Регистрация
              </Button>
            </Form>
            <p className="mt-4">
              {" "}
              Есть аккаунт?{" "}
              <a href="/">
                Войти
              </a>
            </p>
          </Fragment>
        )}
      </Container>
    );
  }
}
