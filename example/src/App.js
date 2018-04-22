import React, { Component } from 'react';
import './App.css';
import { SignaturePad } from 'react-signature';

const Signature = ({ signature }) => {
  if (!signature) {
    return null;
  }
  return <img src={signature} />;
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      signature: null,
    };
  }

  getSignatureHandler() {
    this.setState({
      signature: this.signaturePad.toDataURL(),
    });
  }

  clearHandler() {
    this.signaturePad.clear();
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
        <button onClick={this.clearHandler.bind(this)}>
          Clear
        </button>
        <Signature signature={this.state.signature} />
      </div>
    );
  }
}

export default App;
