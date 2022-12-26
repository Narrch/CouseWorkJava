
import React, { Component } from 'react';
import CompetitionsTable from './components/CompetitionsTable'
import MyNavBar from './components/MyNavBar'
import Keycloak from 'keycloak-js';
class App extends Component {
  constructor(props) {
    // highlight-range{3}
    super(props);
    this.state = { keycloak: null, authenticated: false, user: [], filter: null};
  }

  updateFilter = (value) => {
    this.setState({ filter: value })
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      if (keycloak) {
        if (authenticated) {
          this.getUser(this.state.keycloak.token);
        }
      }
    })
  }

  getUser(token) {
    const fetchDataUser = async () => {
      const res = await fetch(
        'api/member/user',
        {
          headers: { "Authorization": "Bearer " + token }
        }
      );
      const json = await res.json();
      console.log(json);
      this.setState({user: json});

    };
    fetchDataUser();
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        return (
          <div className="container">
            <MyNavBar user={this.state.user} token={this.state.keycloak.token} keycloak={this.state.keycloak} filter={this.updateFilter}/>
            <CompetitionsTable user={this.state.user} token={this.state.keycloak.token} filter={this.state.filter}/>
          </div>
        );
      }
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}

export default App;
