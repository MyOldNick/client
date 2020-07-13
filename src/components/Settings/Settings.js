import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Avatar from "react-avatar-edit";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: `http://ourtelega.northeurope.cloudapp.azure.com:5000/${this.props.user.avatar}`,
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  sendPhoto = async () => {
    let data = await new FormData();
    await data.append("avatar", this.state.file);
    await data.append("id", this.props.user.id);

    console.log(data.getAll("id"));
    console.log(data.getAll("avatar"));

    axios
      .put(`http://ourtelega.northeurope.cloudapp.azure.com:5000/avatar`, data)
      .then((value) => console.log("okay"));
  };

  render() {
    return (
      <Container
        style={{ width: "1100px" }}
        className="pt-3 pb-5 pr-5 pl-5 mt-5 shadow"
      >
        {" "}
        <Row>
          <Link to='/'>
            <Col xs={1}>
              <Image
                src="http://img.icons8.com/color/48/000000/odnoklassniki.png"
                width="50px"
              />
            </Col>
          </Link>
          <Col
            className="mt-2 d-flex flex-row"
            style={{ color: "black", textDecoration: "none" }}
          >
            <h3>Instagram</h3>
            <p className="text-secondary mt-2"> (settings)</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h4>Основная информация</h4>
            <h5 className="mt-4">Логин:</h5> {this.props.user.login}
            <br />
            <h5 className="mt-2">Email:</h5> {this.props.user.email}
            <h5 className="mt-2">Что-то там еще:</h5> *важная информация*
          </Col>
          <Col className="text-center text-secondary mt-5 ">
            Здесь будет поле для обновления данных
            <br />
            UPD: Или не будет
            <br />
            UPD 2: Кароч я пока что не придумал куда деть эту кучу свободного
            места
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Фото профиля</h4>
            <img style={{ width: "400px" }} src={this.state.imagePreviewUrl} />;
          </Col>
          <Col>
            <h4>Смена фото</h4>
            <div className="previewComponent mt-3">
              <form
                onSubmit={(e) => this._handleSubmit(e)}
                encType="multipart/form-data"
              >
                <label htmlFor="file-upload" className="btn btn-success">
                  Выбрать фото
                </label>
                <input
                  id="file-upload"
                  className="fileInput "
                  type="file"
                  onChange={(e) => this._handleImageChange(e)}
                  style={{ display: "none" }}
                />
                <br />
                <button
                  className="btn btn-primary mt-3"
                  type="submit"
                  onClick={this.sendPhoto}
                >
                  Обновить изображение
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
