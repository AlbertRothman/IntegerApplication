import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
class App extends Component{
  state = {
    email:"",
    password:"",
    yourAPIKEY:""};
  render = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>{this.state.yourInt? `Your Int: ${this.state.yourInt}`:""}</p>
        <p>{this.state.yourAPIKEY?`Your API Key: ${this.state.yourAPIKEY}`:""}</p>
        <p>
          Create an account.
          <input placeholder = "email" onChange = {(event)=>{this.changeInputs(event.target.value, "email")}}></input>
          <input placeholder = "password" onChange = {(event)=>{this.changeInputs(event.target.value, "password")}}></input>
          <button onClick = {this.handleSubmit} >Submit</button>
        </p>
        <p><button onClick = {this.handleCurrent}> Get Current Int</button>
        <button onClick = {this.handleNext}>Get Next Int</button>
        <input placeholder = "new int" onChange = {(event)=>{this.changeInputs(event.target.value, "newInt")}}></input>
        <button onClick = {this.handleUpdateCurrent}>update your Int with new int</button>

        </p>
      </header>
    </div>
  );
  }
  changeInputs = (newValue, field) => {
    this.setState(
      {[field]: newValue});
  }
  handleSubmit = async() => {
    // const result = 1;
    const result = await axios.post('/createAccount', {email: this.state.email, password: this.state.password});
    console.log(result);
    console.log(result.data);
    this.setState(() => {
      return {yourAPIKEY: result.data}
    });
  }
  handleNext = async() => {
    const result = await axios.post('/v1/next', {}, {headers:{Authorization: `Bearer ${this.state.yourAPIKEY}`}});
    this.setState(() => {
      return {yourInt: result.data.userInt};
    });
  }
  handleCurrent = async() => {
    const result = await axios.get('/v1/current', {headers:{Authorization: `Bearer ${this.state.yourAPIKEY}`}});
    this.setState(() => {
      return {yourInt: result.data.userInt};
    });
  }
  handleUpdateCurrent = async() => {
    const result = await axios.put('/v1/current', {"current": this.state.newInt},{headers:{Authorization: `Bearer ${this.state.yourAPIKEY}`}});
    this.setState(() => {
      return {yourInt: result.data.userInt};
    });
  }
}

export default App;
