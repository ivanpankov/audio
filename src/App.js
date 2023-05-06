import AudioMixer from "./components/AudioMixer";
import AudioTrack from "./components/AudioTrack";
import FileTrack from "./components/FileTrack";

function App() {
  return (
    <div>
      <AudioMixer >
        <AudioTrack />
        <AudioTrack />
        <FileTrack />
      </AudioMixer>
    </div>
  );
}

export default App;
