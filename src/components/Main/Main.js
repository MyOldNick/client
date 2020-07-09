import React, { Component, Fragment } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import Axios from "axios";
import io from "socket.io-client";

import DialogList from "./DialogList";
import UsersList from "./UsersList";

const socket = io("http://ourtelega.northeurope.cloudapp.azure.com:5000", {secure: true}); //настройки подключения

// WARNING!!!11 рас рас наговнил здесь знатно, похуже Junior Индус Developer

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "", //для формы
      messages: [], //список сообщений в активной вкладке
      dialogs: [], //список диалогов
      active: "", //активный диалог
      find: false,
      allUsers: [],
    };
  }

  componentDidMount() {
    socket.emit("connected", this.props.user.id);
    // отправляем имя нашего юзера на сервер, чтобы найти диалоги с этим пользователем
    socket.emit("dialogs", this.props.user.id);

    //обновляем диалоги
    socket.on("findDialog", (props) => {
      this.setState({ dialogs: props });

      //вытаскиваем с каждого диалога ID и подключаемся к комнате
      this.state.dialogs.forEach((el) => {
        socket.emit("join", this.props.user.id, el._id);
      });
    });

    //все для отправки сообщенек, принимаем сообщение и ID комнаты (оно же ID диалога)
    socket.on("msg", (msg, room) => {
      //создаем новый массив
      const messages = this.state.dialogs;

      //фильтруем и делаем нужные нам шалости
      messages.filter((el) => {
        if (el._id === room) {
          let date = Date.now();

          el.updateAt = date;
          el.message.push(msg);
        }
      });

      //делаем оортировку по дате и обновляем стейт

      messages.sort((a, b) => {
        return new Date(a.updateAt) > new Date(b.updateAt) ? -1 : 1;
      });

      this.setState({ dialogs: messages });
    });

    //подписываемся на прослушивание события
    socket.on("addDialog", (newDialog) => {

      //если нам приходит новый диалог, то подключаемся к нему
      socket.emit("join", this.props.user.id, newDialog._id);

      //Обновляем список диалогов, устанавливаем новый диалог активным - чтобы сразу можно было в него писать
      const newDialogsArr = this.state.dialogs;

      newDialogsArr.push(newDialog);

      this.setState({ dialogs: newDialogsArr, find: false });

      this.selectActive(newDialog._id, newDialog.message);
    }); 

    window.addEventListener('beforeunload', (e) => {
      socket.emit('disconnect', this.props.user.id)
      e.preventDefault();
    });


    this.scrollToBottom();
  }

  componentDidUpdate() {
    //опускаем страничку вниз
    this.scrollToBottom();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    this.sendMessage();
    event.preventDefault();
  };

  createDialog = (recipient) => {
    socket.emit("createDialog", this.props.user, recipient);
  };

  sendMessage = () => {
    //отправляем саабщэньку
    socket.emit(
      "message",
      { author: this.props.user.login, text: this.state.value },
      this.state.active
    );

    this.setState({ value: "" });
  };

  //выбираем активный диалог
  selectActive = (id, message) => {
    this.setState({ active: id });
    this.setState({ messages: message });
  };

  findAllUsers = () => {
    this.setState({ find: !this.state.find });
    Axios.get(`http://ourtelega.northeurope.cloudapp.azure.com:5000/users`).then((value) =>
      this.setState({ allUsers: value.data })
    );
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <Fragment>
        <Container
          style={{ width: "1000px", height: "530px" }}
          className="shadow mt-5"
        >
          <Row style={{ height: "30px" }} className="mb-4">
            <Col xs={1} className="mt-3">
              <img
                src="http://img.icons8.com/color/48/000000/odnoklassniki.png"
                width="50px"
              />
            </Col>
            <Col className="mt-4">
              <h3>Instagram</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="mt-4 w-100"
                variant="light"
                onClick={this.findAllUsers}
              >
                {this.state.find ? "Закрыть" : "Найти собеседника"}
              </Button>
              {this.state.find ? (
                <UsersList
                  users={this.state.allUsers}
                  createDialog={this.createDialog}
                />
              ) : (
                <DialogList
                  active={this.state.active}
                  dialogs={this.state.dialogs}
                  selectActive={this.selectActive}
                  user={this.props.user.login}
                />
              )}
            </Col>
            <Col xs lg={8}>
              <Row style={{ height: "400px" }}>
                <Container
                  className="w-75"
                  style={{ overflow: "auto", height: "90%" }}
                >
                  {this.state.active
                    ? this.state.messages.map((el) => (
                        <div
                          key={el._id ? el._id : el.text}
                          className={
                            el.author === this.props.user.login
                              ? "d-flex align-items-end flex-column"
                              : "d-flex align-items-start flex-column"
                          }
                        >
                          <div
                            style={
                              el.author === this.props.user.login
                                ? {
                                    whiteSpace: "pre-wrap",
                                    backgroundColor: "#007cff",
                                    borderRadius: "10px",
                                    color: "white",
                                  }
                                : {
                                    whiteSpace: "pre-wrap",
                                    backgroundColor: "#F5F5F5",
                                    borderRadius: "10px",
                                  }
                            }
                            className={
                              el.author === this.props.user.login
                                ? "d-flex align-items-end flex-column pt-2 pr-2 pl-2 mt-2"
                                : "d-flex align-items-start flex-column pt-2 pr-2 pl-2 mt-2"
                            }
                          >
                            <h5>{el.author}</h5>
                            <p> {el.text}</p>
                          </div>
                        </div>
                      ))
                    : "Выберите диалог"}
                  <div
                    style={{ float: "left", clear: "both" }}
                    ref={(el) => {
                      this.messagesEnd = el;
                    }}
                  ></div>
                </Container>
              </Row>
              {this.state.active ? (
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col xs lg={10}>
                      <FormControl
                        as="textarea"
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Button type="submit" variant="light">
                      Отправить
                    </Button>
                  </Row>
                </Form>
              ) : undefined}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
