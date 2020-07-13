import React, { Component} from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Register from "./components/Register/Register";
import Auth from "./components/Auth/Auth";
import Main from "./components/Main/Main";
import Settings from './components/Settings/Settings'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "", //получаем с сервера при входе. Затем с этой фигней что-то делаем
    };
  }

  selectUser = (props) => {
    this.setState({ user: props });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
           {/*  Если мы авторизированы - переходим на страницу диалогов */}
            {this.state.user.login ? (
              <Main user={this.state.user} />
            ) : (
              <Auth selectUser={this.selectUser} />
            )}
          </Route>
          <Route exact path="/register" component={Register}/>
          <Route>
            {this.state.user.login ? (
              <Settings user={this.state.user}/>
            ) : (
              <Auth selectUser={this.selectUser} />
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}
