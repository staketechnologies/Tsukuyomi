import React, { Component } from 'react';
import logo from './Tsukuyomi.png';
import {Grid,Button} from "@material-ui/core";
import ResultArea from './ResultArea';
import './App.css';

class App extends Component {
  'use strict';

  constructor(props) {
    super(props);
    this.state = {
      codeText:null,
      codeFile:null,
      codeFileName:null,
    }
    this.handleTextSubmit =this.handleTextSubmit.bind(this);
    this.handleFileSubmit =this.handleFileSubmit.bind(this);
    this.handleFileClick  =this.handleFileClick.bind(this);
    this.handleFileChange =this.handleFileChange.bind(this);

    this.fileInput= React.createRef();
    this.input    = React.createRef();
  }

  handleTextSubmit(event) {
    var text = this.input.current.value;
    if(text!=='' && text!==null){
      this.setState({
        codeText : text,
        codeFile : null,
        codeFileName : null,
      });
    }else{
      this.setState({
        codeText : null,
        codeFile : null,
        codeFileName : null,
      });
    }
  }

  handleFileSubmit(event) {
    var file = this.fileInput.current.files[0];
    if(file==null){
      this.setState({codeText : null,codeFile : null, codeFileName : null});
    }else{
      this.setState({codeText : null,codeFile : file,});
    }
  }

  handleFileClick(event) {
    this.fileInput.current.click();
  }

  handleFileChange(event) {
    var fileName = this.fileInput.current.files[0]==null?(null):this.fileInput.current.files[0].name;
    this.setState({codeFile:null,codeFileName:fileName});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Grid container spaacing={10} >
          <Grid item xs={6} style={{padding:"20px"}}><Grid container>
            <Grid item xs={12}>
            <div>Input your wat/wast code here</div>
            <Button onClick={this.handleTextSubmit} variant="contained" color="primary" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} >
              Audit Code
            </Button>
            <textarea ref={this.input} id="story" rows="10" style={{width:"100%",marginBottom:"20px"}} placeholder="input your wasm code here"/>
            <div>or select wasm file : </div>
            </Grid>
            <Grid item xs={6}>
              <div onClick={this.handleFileClick}>
                <input type="file" ref={this.fileInput} onChange={this.handleFileChange} style={{display:"none"}} name="value" accept=".wasm,.wat,.wast"/>
                <Button variant="contained" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} >
                  Select File
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} style={{alignItems:"center",display:"grid"}}>
              <div>
                {(this.state.codeFileName==null)?("no file selected"):this.state.codeFileName}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={this.handleFileSubmit} variant="contained" color="primary" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} >
                Audit Code
              </Button>
            </Grid>
          </Grid>　</Grid>
        <Grid>
        </Grid>
          <Grid item xs={6} style={{alignItems:"center",display:"grid"}}>
            <ResultArea codeText={this.state.codeText} codeFile={this.state.codeFile}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
