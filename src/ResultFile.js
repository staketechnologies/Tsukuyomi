import React from 'react';
import CircularIndeterminate from './CircularIndeterminate';

function ResultFile(props){

  // shouldComponentUpdate(nextProps){
  //   console.log('try render ResultFile');
  //   if(this.props.validateWasm!==nextProps.validateWasm){
  //     return true;
  //   }
  //   return false;
  // }
  var validateWasm = props.validateWasm;
  return (
    <div>
    {((validateWasm)=>{
      if(validateWasm === true){
        return(<h3>wasm code is valid!</h3>);
      }else if(validateWasm === false){
        return(<div style={{color:'red'}}>
          <h3>wasm code is invalid :(</h3>
          {props.errorMessage}
        </div>);
      }else if(typeof(validateWasm)===typeof(TypeError)){
        return(<div>Type error!</div>);
      }else{
        return(<div>
            <CircularIndeterminate/>
            <h2>verifying now...</h2>
          </div>);
      }
    })(validateWasm)}
    </div>
  );
}

export default ResultFile;
