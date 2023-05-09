import { useEffect, useMemo, useRef, useState } from "react";
import { BsPlayFill, BsFillStopFill } from "react-icons/bs";
import { MAX_TEMPO, MIN_TEMPO, setup } from "./metronom";
import "./styles.scss";

const DEFAULT_TEMPO = 100;

export default function Metronome() {
    const [tempoValue, setTempoValie] = useState(DEFAULT_TEMPO);
    const { ac, setTempo } = useMemo(() => setup(), []);
    const [isPlaying, setPlaying] = useState(false);
    const timeoutRef = useRef(0);

    const handlePlay = () => {
        if (ac.state === "running") {
            ac.suspend();
            setPlaying(false);
        } else {
            let _value = tempoValue;

            if (_value < MIN_TEMPO) {
                _value = MIN_TEMPO;
            } else if (_value > MAX_TEMPO) {
                _value = MAX_TEMPO;
            }

            setTempoValie(_value);
            setTempo(_value);

            ac.resume();
            setPlaying(true);
        }
    };

    const handleTempoChange = (event) => {
        const { target } = event;
        const { value } = target;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (ac.state === "running") {
                ac.suspend();
                setPlaying(false);
            }
            setTempoValie(value);
        }, 100);
    };

    useEffect(() => {
        return () => {
            ac.close();
        };
    }, [ac]);

    return (
        <div className="audio-track metronome">
            <div className="content">
                <div className="controls">
                    <button className="media-control" onClick={handlePlay}>
                        {isPlaying ? <BsFillStopFill /> : <BsPlayFill />}
                    </button>
                    <input
                        className="tempo-input"
                        type="number"
                        min={MIN_TEMPO}
                        max={MAX_TEMPO}
                        step={1}
                        value={tempoValue}
                        onChange={handleTempoChange}
                    />
                </div>

                <div className="middle">
                    <label>Metronome</label>
                </div>

                <div className="right"></div>
            </div>
        </div>
    );
}