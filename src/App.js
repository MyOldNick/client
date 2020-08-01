import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Register from "./components/Register/Register";
import Auth from "./components/Auth/Auth";
import Main from "./components/Main/Main";
import Load from './components/Spinner/Spinner'
import API from "./config";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "", //получаем с сервера при входе. Затем с этой фигней что-то делаем
      load: true,
    };
  }

  componentDidMount() {

    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      this.setState({ load: false });
    } else {

      axios
        .post(
          `${API}/token`,
          {},
          {
            headers: { Authorization: token },
          }
        )
        .then((value) => {
          this.selectUser(value.data);
          this.setState({ load: false });
        })
        .catch((err) => {
          this.setState({ load: false });
          console.log(err)
        });
    }
  }

  selectUser = (props) => {
    this.setState({ user: props });
  };


  render() {
    return (
      <Router>
        <Switch>
          {this.state.load ? (
            <Load/>
          ) : (
            <Route exact path="/">
              {/*  Если мы авторизированы - переходим на страницу диалогов */}
              {this.state.user.login ? (
                <Main user={this.state.user} selectUser={this.selectUser} />
              ) : (
                <Auth selectUser={this.selectUser} />
              )}
            </Route>
          )}
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}
