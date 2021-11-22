import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreview: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.file !== null) {
      const img = this.state.file;
      const formData = new FormData();
      formData.append('file', img);
      axios.post('api/v1/find/', formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  handleChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    if(file != null) {
      reader.onloadend = () => {
        this.setState({file: file, imagePreview: reader.result});
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    let $imagePreview = null;
    return(
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2>Upload your image!</h2>
            <input type="file" onChange={this.handleChange}/>
          </label>
          <br/>
          <button type="submit">Submit</button>
        </form>
        {!$imagePreview && <img src={this.state.imagePreview} width="320" height="240" />}
      </div>
 
    )
  }
}

export default App;
