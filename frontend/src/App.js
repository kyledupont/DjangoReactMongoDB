import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


//Rest Data Frontend
class App extends Component {

  state = {
    todos: [],
    jwt: [],
  };


  async componentDidMount() {

    //POST request to get JWT
    try {
      const results = await fetch('http://127.0.0.1:8000/api-token-auth/', {
        method: 'POST',
        body: JSON.stringify({
        	"username":"testname",
        	"password":"testpass"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const j = await results.json();
      const jwtoken = j.token
      const jwt = 'JWT ' + jwtoken
      this.setState({
        jwt: jwt
      });
    } catch (e) {
      console.log(e);
    }

    //GET request and apply JWT
    try {

      const res = await fetch('http://127.0.0.1:8000/api/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.jwt,
        }
      });
      const todos = await res.json();
      this.setState({
        todos: todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (

        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>

          <div className="todotxt">
            {this.state.todos.map(item => (
              <div key={item.id}>
                <h1>{item.title}</h1>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
          {/* <div>{this.state.jwt}</div> */}
        </div>
    );
  }
}


export default App;
