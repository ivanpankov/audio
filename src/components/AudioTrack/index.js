import AudioProgress from "../AudioProgress";
import { BsPlayFill, BsPauseFill, BsFillStopFill } from "react-icons/bs";
import "./styles.scss";
import { useRef, useState } from "react";

export default function AudioTrack({ fileName = "", filePath = "", controls = [] }) {
    const [isPlaying, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const handlePlay = () => {
        if (isPlaying) {
            setPlaying(false);
            audioRef.current.pause();
        } else {
            setPlaying(true);
            audioRef.current.play();
        }
    };

    const handleStop = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setPlaying(false);
    }

    const handleTimeUpdate = (event) => {
        const { target } = event;
        setProgress(target.currentTime / target.duration);
    };

    return (
        <div className="audio-track">
            <audio ref={audioRef} src={filePath} onTimeUpdate={handleTimeUpdate}></audio>
            <div className="content">
                <div className="controls">
                    <button className="media-control" onClick={handlePlay}>
                        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                    </button>
                    <button className="media-control" onClick={handleStop}>
                        <BsFillStopFill />
                    </button>
                    {controls}
                </div>

                <div className="middle">
                    <label>{fileName}</label>
                </div>

                <div className="right"></div>
            </div>
            <AudioProgress progress={progress} />
        </div>
    );
};