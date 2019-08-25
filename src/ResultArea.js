import React, {useState,useEffect} from 'react';
import ResultFile from './ResultFile'
import { decode } from '@webassemblyjs/wasm-parser';
import { parse } from "@webassemblyjs/wast-parser";
import /*ValidateAST,*/ {getValidationErrors} from '@webassemblyjs/validation';
// import WebAssembly from 'webassemblyjs';

function ResultArea(props){
  const [validateWasm,setValidateWasm] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);


  useEffect(()=>{
    // console.log('props changed');
    if(props.codeFile===null){
      console.log('file is not selected');
      return (()=>{});
    }
    setValidateWasm(null);
    var reader = new FileReader();
    var validate = null;
    var fileExtension = getExtension(props.codeFile.name);
    reader.onload = (event) => {
      console.log('file read done.');
      var ast;
      if(fileExtension==='wasm'){
        ast = decode(event.target.result);
      }else if(fileExtension==='wast'||fileExtension==='wat'){
        ast = parse(event.target.result);
      }
      console.log(ast);
      var errors = getValidationErrorsString(ast);
      setErrorMessage(errors);
      console.log(errors);
      if(errors.length===0){
        validate=true;
      }else{
        validate=false;
      }
      // var validate = WebAssembly.validate(event.target.result);
      setValidateWasm(validate);
    }
    if(fileExtension==='wasm'){
      reader.readAsArrayBuffer(props.codeFile);
    }else if(fileExtension==='wast'||fileExtension==='wat'){
      reader.readAsText(props.codeFile);
    }else{
      console.error('file extension error');
    }
  },[props]);

  var codeText=props.codeText;
  var codeFile=props.codeFile;
  return (
    <div>
      {((codeText,codeFile)=>{
        if (codeText == null && codeFile == null) {
          return ( <div> input wat/wast text or select wasm code </div> );
        } else if (codeText != null) { //verify text
          return ( <div> receive codetext </div> );
        } else { //verify file
          return( <ResultFile validateWasm={validateWasm} errorMessage={errorMessage}/> );
        }
      })(codeText,codeFile)}
    </div>
  );
}


// class ResultArea extends Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       validateWasm : null,
//     }
//   }
//
//   componentDidUpdate(prevProps){
//     if(this.props!==prevProps){
//       console.log('props changed');
//       if(this.props.codeFile==null){
//         console.log('file is not selected');
//         return;
//       }
//       this.setState({validateWasm:null});
//       var reader = new FileReader();
//       reader.onload = (event) => {
//         try{
//           const decoderOpts = {};
//           const ast = decode(event.target.result, decoderOpts);
//           console.log(ast);
//           console.log(ast.validateAST());
//         }catch(error){
//           console.error('error message:' + error);
//         }
//         var validate = WebAssembly.validate(event.target.result);
//         this.setState({validateWasm:validate});
//         console.log('wasm is validated : '+validate);
//       }
//       reader.readAsArrayBuffer(this.props.codeFile);
//     }
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('try render ResultArea');
//     if (this.state.validateWasm!==nextState.validateWasm) {
//        return true;
//     }
//     if (this.props.codeText!==nextProps.codeText) {
//        return true;
//     }
//     if(this.props.codeFile!==nextProps.codeFile){
//       return true;
//     }
//     console.log('dont render ResultArea');
//     return false;
//   }
//
//   render() {
//     var codeText=this.props.codeText;
//     var codeFile=this.props.codeFile;
//     return (
//       <div>
//         {((codeText,codeFile)=>{
//           if (codeText == null && codeFile == null) {
//             return ( <div> input wat/wast text or select wasm code </div> );
//           } else if (codeText != null) { //verify text
//             return ( <div> receive codetext </div> );
//           } else { //verify file
//             return( <ResultFile validateWasm={this.state.validateWasm} /> );
//           }
//         })(codeText,codeFile)}
//       </div>
//     );
//   }
// }
//
// ResultArea.propTypes = {
//   codeText: PropTypes.string,
//   codeFile: PropTypes.object,
// };

function getExtension(fileName) {
  var ret = null;
  if (!fileName) {
    return ret;
  }
  var fileTypes = fileName.split(".");
  var len = fileTypes.length;
  if (len === 0) {
    return ret;
  }
  ret = fileTypes[len - 1];
  return ret;
}

function getValidationErrorsString(ast) {
  var errors = getValidationErrors(ast);

  if (errors.length !== 0) {
    var errorMessage = errors.map((x) => <p>{x}</p>);
    return errorMessage;
  }
}


export default ResultArea;
