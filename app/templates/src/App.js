import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import { Container, Stack, Typography, Input, Button, FormControl, InputBase, IconButton, Divider, Skeleton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreview: "",
      message: null
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
          this.setState({message: res.data})
          console.log(this.state.message)
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
        <Container fluid>
          <form onSubmit={this.handleSubmit}>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h2">
                Upload your image!
              </Typography>
              <Button variant="contained" component="label">
                <AddIcon />
                파일선택
                <input style={{ display: 'none' }} type="file" onChange={this.handleChange} />
              </Button>
              {this.state.file === "" ? (
                <Typography>
                  선택된 파일이 없음
                </Typography>
              ) : (
                <Typography>
                  {this.state.file.name}
                </Typography>
              )}
              {this.state.file !== "" ? (
                !$imagePreview && <img src={this.state.imagePreview} width="320" height="240" />
              ) : (
                <Skeleton variant="rectangular" width={320} height={240} />
              )}
              <Button variant="contained" type="submit">업로드</Button>
            </Stack>
          </form><br/>
          <Divider /><br/>
          {this.state.message !== null ? (
            <Typography variant="h4"> 
              {this.state.message} 입니다.
            </Typography>
          ) : null}
        </Container>
      </div>
    )
  }
}

export default App;
