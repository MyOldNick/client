import React, { Component, Fragment } from "react";
import {
  Container,
  Form,
  Button,
  FormControl,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import API from "../../config";
import oneImg from "../../img/1.jpg";
import twoImg from "../../img/2.jpg";
import threeImg from "../../img/3.jpg";

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
          localStorage.setItem("token", JSON.stringify(value.data.token));
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
        style={{ width: "1100px", height: "500px" }}
        className="mt-5 pt-5"
      >
        <Row>
          <Col xs={4} className="text-center">
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
          </Col>
          <Col className="pl-5">
            <div className="">
              <h4 className="text-center">Здравствуйте</h4>
              <p className="mt-5">
                Мессенджер (осмелюсь назвать ЭТО так) был сделан как небольшое, простенькое
                портфолио и чисто для фана))000
                <br />
                В нем есть баги, нету многих нужных функций. В целом он ничего
                не умеет кроме отправки сообщений.
                <br />
                Еще он не адаптирован под мобильные устройства, так как это
                занимает время, мне лень.
                <br /> Ну и зачем мобильная версия, если я хочу сделать клиент
                для телефона на Ionic.
              </p>
              <h6>Что было использовано при создании:</h6>
              <ul>
                <li>Node JS (Express)</li>
                <li>React</li>
                <li>Socket IO</li>
                <li>Mongo DB</li>
                <li>
                  Работает все на виртуальном сервере Microsoft Azure (Ubuntu, Nginx), возможно
                  переедет на AWS
                </li>
              </ul>
              <p className='text-center mt-5'>
                <strong>Гитахаб: </strong>
                <br />
                <a href="https://github.com/MyOldNick/server">Здесь сервер</a>
                <br />
                <a href="https://github.com/MyOldNick/client">Здесь клиент</a>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <img src={oneImg} width="500px"></img>
            <img src={twoImg} width="520px"></img>
            <img src={threeImg} width="500px"></img>
          </Col>
        </Row>
      </Container>
    );
  }
}
