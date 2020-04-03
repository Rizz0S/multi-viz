import React from 'react';
import FileLoader from './components/FileLoader'
import './App.css';
import Visualizer from './components/Visualizer';
import SoundContainer from './containers/SoundContainer';        

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      audioContexts: []
    }
  }

  handleFileUpload = (uploadedFile) => {
    const audioContextFromFile = this.createAudioContext(uploadedFile);
    const audioContextArr = [...this.state.audioContexts, audioContextFromFile];

    this.setState({
      audioContexts: audioContextArr
    })

    audioContextFromFile.sound.play()
  }
  
  createAudioContext = (sound) => {
    // Create new audio context with given sound
    const audioContext = new AudioContext();

    // Create analyser (gets lots o data bout audio)
    const src = audioContext.createMediaElementSource(sound);
    const analyser = audioContext.createAnalyser(); 

    // Array limited to unsigned int values 0-255
    const bufferLength = analyser.frequencyBinCount;
    const freqData = new Uint8Array(bufferLength);

    src.connect(analyser);
    analyser.connect(audioContext.destination);

    const audioContextObj = {
        sound,
        freqData,
        analyser
    }

    return audioContextObj; 
  }

  render() {
    return (
      <div className="App">
      <h2 className="header">Welcome to the ~Multi-Viz~</h2>
      <p className="description">Upload a sound file and watch the show. Upload another file, see what happens.</p>
        <FileLoader handleFileUpload={this.handleFileUpload} />
        {/* </header> */}
        <Visualizer audioContexts={this.state.audioContexts}/>
        <SoundContainer sounds={this.state.audioContexts.map(audioContext => audioContext.sound)} />
      </div>
    );
  }
}

export default App;
