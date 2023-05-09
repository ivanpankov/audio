import { useEffect, useRef, useState } from "react";
import AudioProgress from "../AudioProgress";
import { BsPlayFill, BsPauseFill, BsFillStopFill } from "react-icons/bs";
import "./styles.scss";

const noop = () => { };
const audioElDefault = {
    play: noop,
    pause: noop,
    currentTime: 0,
    duration: 0
};

export default function AudioTrack({ fileName = "", filePath = "", controls = [] }) {
    const [isPlaying, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const disabled = !Boolean(filePath);
    const audioRef = useRef(audioElDefault);
    const audioEl = audioRef.current;

    const play = () => {
        setPlaying(true);
        audioRef.current.currentTime = currentTime;
        audioRef.current.play();
    };

    const pause = () => {
        setPlaying(false);
        audioRef.current.pause();
    };

    const stop = () => {
        pause();
        audioRef.current.currentTime = 0;
    };

    const handlePlay = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    const handleTimeUpdate = (event) => {
        const { target } = event;
        const { currentTime } = target;
        setCurrentTime(currentTime);
    };

    const handleTimeChange = (value) => {
        if (isPlaying) {
            pause();
        }
        setCurrentTime(value);
    };

    const handleMetadata = () => {
        setDuration(audioEl.duration);
    };

    return (
        <div className="audio-track">
            <audio
                preload="metadata"
                onLoadedMetadata={handleMetadata}
                ref={audioRef}
                src={filePath}
                onTimeUpdate={handleTimeUpdate}
                onEnded={stop}></audio>
            <div className="content">
                <div className="controls">
                    <button className="media-control" onClick={handlePlay} disabled={disabled}>
                        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                    </button>
                    <button className="media-control" onClick={stop} disabled={disabled}>
                        <BsFillStopFill />
                    </button>
                    {controls}
                </div>

                <div className="middle">
                    <label>{fileName}</label>
                </div>

                <div className="right"></div>
            </div>
            <AudioProgress
                currentTime={currentTime}
                duration={duration}
                disabled={disabled}
                onChange={handleTimeChange}
            />
        </div>
    );
};