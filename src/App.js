import React, { Component } from "react";
import "./App.css";
import Key from "./Key";
import Tone from "./Tone";
import { DTMF_FREQUENCIES } from "./Frecuencies";

let dtmf = new Tone(350, 440);
let ringTone = new Tone(400, 450);

class App extends Component {
  handleClick(key) {
    let frequencyPair = DTMF_FREQUENCIES[key];
    dtmf.freq1 = frequencyPair.f1;
    dtmf.freq2 = frequencyPair.f2;

    if (dtmf.status === 0) {
      dtmf.start();
    }
  }

  handleRelease() {
    if (dtmf?.status) {
      dtmf.stop();
    }
  }

  handleRing() {
    ringTone.status === 0 ? ringTone.startRinging() : ringTone.stopRinging();
  }

  renderKey(key) {
    return (
      <Key
        value={key}
        onMouseDown={() => this.handleClick(key)}
        onMouseUp={() => this.handleRelease()}
      />
    );
  }

  render() {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'];
    
    return (
      <div className="App">
        <div className="wrapper">
          <ul className="dtmf-interface js-dtmf-interface">
            {keys.map((key) => this.renderKey(key))}
          </ul>
          <div className="button" onClick={this.handleRing}>
            Ring Tone
          </div>
        </div>
      </div>
    );
  }
}

export default App;
