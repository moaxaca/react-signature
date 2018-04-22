import React, { Component } from 'react';
import './App.css';
import { SignaturePad } from 'react-signature';

class App extends Component {
  getSignatureHandler() {
    console.log(this.signaturePad.getSignature());
  }

  render() {
    return (
      <div className="App">
        <div style={{ border: 'solid 1px black', margin: '1rem' }}>
          <SignaturePad
            ref={(ref) => this.signaturePad = ref}
            height={200}
          />
        </div>
        <button onClick={this.getSignatureHandler.bind(this)}>
          Get Signature
        </button>
      </div>
    );
  }
}

export default App;
