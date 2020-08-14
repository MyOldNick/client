import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Avatar from "react-avatar-edit";
import { Link } from "react-router-dom";
import axios from "axios";

import API from '../../config'

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: `${API}/${this.props.user.avatar}`,
      ok: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleImageChange(e) {
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

  sendPhoto = () => {
    let data = new FormData();
    data.append("avatar", this.state.file);
    data.append("id", this.props.user._id);

    console.log(data.getAll("id"));
    console.log(data.getAll("avatar"));

    axios
      .put(`${API}/avatar`, data)
      .then((value) => {
        this.props.selectUser(value.data)
        if(value.status === 200) {
          this.setState({ok: true})
        }
      });
  };

  render() {
    return (
      <Container
        className="pt-3 pb-5 pr-5 pl-5"
      >
        <Row className="mt-2">
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
            <img style={{ width: "350px" }} src={this.state.imagePreviewUrl} />
          </Col>
          <Col className='ml-5'>
            <h4>Смена фото</h4>
            <div className="previewComponent mt-3">
              <form
                onSubmit={(e) => this.handleSubmit(e)}
                encType="multipart/form-data"
              >
                <label htmlFor="file-upload" className="btn btn-success">
                  Выбрать фото
                </label>
                <input
                  id="file-upload"
                  className="fileInput "
                  type="file"
                  onChange={(e) => this.handleImageChange(e)}
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
              {this.state.ok ? <p className='text-success'>Изображение обновлено</p> : undefined}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
