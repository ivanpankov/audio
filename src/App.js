import AudioMixer from "./components/AudioMixer";
import AudioTrack from "./components/AudioTrack";
import FileTrack from "./components/FileTrack";
import Metronome from "./components/Metronome";

function App() {
  return (
    <div>
      <AudioMixer >
        <Metronome />
        <AudioTrack />
        <AudioTrack />
        <FileTrack />
      </AudioMixer>
    </div>
  );
}

export default App;
