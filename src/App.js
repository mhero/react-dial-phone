import React, { Component } from "react";
import "./App.css";
import Key from "./Key";
import Tone from "./Tone";

const dtmfFrequencies = {
  1: { f1: 697, f2: 1209 },
  2: { f1: 697, f2: 1336 },
  3: { f1: 697, f2: 1477 },
  4: { f1: 770, f2: 1209 },
  5: { f1: 770, f2: 1336 },
  6: { f1: 770, f2: 1477 },
  7: { f1: 852, f2: 1209 },
  8: { f1: 852, f2: 1336 },
  9: { f1: 852, f2: 1477 },
  "*": { f1: 941, f2: 1209 },
  0: { f1: 941, f2: 1336 },
  "#": { f1: 941, f2: 1477 },
};

let dtmf = new Tone(350, 440);
let ringTone = new Tone(400, 450);

class App extends Component {
  handleClick(key) {
    let frequencyPair = dtmfFrequencies[key];
    dtmf.freq1 = frequencyPair.f1;
    dtmf.freq2 = frequencyPair.f2;

    if (dtmf.status === 0) {
      dtmf.start();
    }
  }

  handleRelease() {
    if (typeof dtmf !== "undefined" && dtmf.status) {
      dtmf.stop();
    }
  }

  handleRing() {
    if (ringTone.status === 0) {
      ringTone.startRinging();
    } else {
      ringTone.stopRinging();
    }
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
    return (
      <div className="App">
        <div className="wrapper">
          <ul className="dtmf-interface js-dtmf-interface">
            {this.renderKey(1)}
            {this.renderKey(2)}
            {this.renderKey(3)}
            {this.renderKey(4)}
            {this.renderKey(5)}
            {this.renderKey(6)}
            {this.renderKey(7)}
            {this.renderKey(8)}
            {this.renderKey(9)}
            {this.renderKey("*")}
            {this.renderKey(0)}
            {this.renderKey("#")}
          </ul>
          <div className="button" onClick={() => this.handleRing()}>
            Ring Tone
          </div>
        </div>
      </div>
    );
  }
}

export default App;
