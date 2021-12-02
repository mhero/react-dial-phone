export default class Tone {
  constructor(freq1, freq2) {
    this.status = 0;
    this.freq1 = freq1;
    this.freq2 = freq2;
    let AudioContext =
      window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext;
    this.context = new AudioContext();
    this.osc1 = null;
    this.osc2 = null;
    this.gainNode = null;
    this.filter = null;
    this.ringerLFOBuffer = null;
  }

  setup() {
    this.osc1 = this.context.createOscillator();
    this.osc2 = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.filter = this.context.createBiquadFilter();

    this.osc1.frequency.value = this.freq1;
    this.osc2.frequency.value = this.freq2;

    this.gainNode.gain.value = 0.25;

    this.filter.type = "lowpass";
    this.filter.frequency.value = 8000;

    this.osc1.connect(this.gainNode);
    this.osc2.connect(this.gainNode);

    this.gainNode.connect(this.filter);
    this.filter.connect(this.context.destination);
  }

  start() {
    this.setup();
    this.osc1.start(0);
    this.osc2.start(0);
    this.status = 1;
  }

  stop() {
    this.osc1.stop(0);
    this.osc2.stop(0);
    this.status = 0;
  }

  createRingerLFO() {
    // Create an empty 3 second mono buffer at the
    // sample rate of the AudioContext
    let channels = 1;
    let sampleRate = this.context.sampleRate;
    let frameCount = sampleRate * 3;
    let myArrayBuffer = this.context.createBuffer(
      channels,
      frameCount,
      sampleRate
    );

    // getChannelData allows us to access and edit the buffer data and change.
    let bufferData = myArrayBuffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      // if the sample lies between 0 and 0.4 seconds, or 0.6 and 1 second, we want it to be on.
      if (
        (i / sampleRate > 0 && i / sampleRate < 0.4) ||
        (i / sampleRate > 0.6 && i / sampleRate < 1.0)
      ) {
        bufferData[i] = 0.25;
      }
    }

    this.ringerLFOBuffer = myArrayBuffer;
  }

  startRinging() {
    this.start();
    // gain node to 0, because the LFO is callibrated to this level
    this.gainNode.gain.value = 0;
    this.status = 1;

    this.createRingerLFO();

    this.ringerLFOSource = this.context.createBufferSource();
    this.ringerLFOSource.buffer = this.ringerLFOBuffer;
    this.ringerLFOSource.loop = true;

    this.ringerLFOSource.connect(this.gainNode.gain);
    this.ringerLFOSource.start(0);
  }

  stopRinging() {
    this.stop();
    this.ringerLFOSource.stop(0);
  }
}
