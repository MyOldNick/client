import React, { Component, Fragment } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); //настройки подключения

// WARNING!!!11 рас рас наговнил здесь знатно, похуже Junior Индус Developer

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",  //для формы
      messages: [],  //список сообщений в активной вкладке
      dialogs: [], //список диалогов
      active: "", //активный диалог
    };
  }

  componentDidMount() {
    socket.on("connected", (msg) => {
      console.log(msg);
    });

    // отправляем имя нашего юзера на сервер, чтобы найти диалоги с этим пользователем
    socket.emit("dialogs", this.props.user); 

    //обновляем диалоги
    socket.on("findDialog", (props) => {
      this.setState({ dialogs: props });
      
      //вытаскиваем с каждого диалога ID и подключаемся к комнате
      this.state.dialogs.forEach((el) => {
        socket.emit("join", this.props.user, el._id);
      });
    });

    //все для отправки сообщенек, принимаем сообщение и ID комнаты (оно же ID диалога)
    socket.on("msg", (msg, room) => {
      //создаем новый массив
      const messages = this.state.dialogs;

      //фильтруем и делаем нужные нам шалости
      messages.filter((el) => {
        if (el._id === room) {
          el.message.push(msg);
        }
      });

      //обновляем стейт
      this.setState({ dialogs: messages });
    });

    this.scrollToBottom();
  }

  componentDidUpdate() {

    //опускаем страничку вниз
    this.scrollToBottom()
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    this.sendMessage();
    event.preventDefault();
  };

  sendMessage = () => {

    //отправляем саабщэньку
    socket.emit(
      "message",
      { author: this.props.user, text: this.state.value },
      this.state.active
    );
  };

  //выбираем активный диалог
  selectActive = (id, message) => {
    this.setState({ active: id });
    this.setState({ messages: message });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <Fragment>
        <Container
          style={{ width: "1000px", height: "500px" }}
          className="shadow mt-5"
        >
          <Row style={{ height: "30px" }}>
            <h3>ТИЛИГРАМ</h3>
          </Row>
          <Row>
            <Col>
            <Button className='mt-4 w-100' variant='light'>Найти собеседника</Button>
              {this.state.length <= 0
                ? "У вас нет диалогов, вы нахер никому не нужен"
                : this.state.dialogs.map((el) => (
                    <Container
                      key={el._id}
                      style={{ height: "80px" }}
                      className="shadow-sm mt-4"
                      onClick={() => this.selectActive(el._id, el.message)} //передаем те сообщения и диалог, которые нам нужно отобразить
                    >
                      {el.users.map(el => el.name === this.props.user ? undefined : <h4 key={el._id}>{el.name}</h4>)}
                    </Container>
                  ))}
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
                          key={el.text}
                          className={
                            el.author === this.props.user
                              ? "d-flex align-items-end flex-column"
                              : "d-flex align-items-start flex-column"
                          }
                        >
                          <div
                            style={el.author === this.props.user ? {
                              whiteSpace: "pre-wrap",
                              backgroundColor: '#007cff',
                              borderRadius: "10px",
                              color: 'white'
                            } : {
                              whiteSpace: "pre-wrap",
                              backgroundColor: '#F5F5F5',
                              borderRadius: "10px",
                            }}
                            className={
                              el.author === this.props.user
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
                      <Button type="submit" variant='light'>Отправить</Button>
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
