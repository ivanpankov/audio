import "./styles.scss";

export default function AudioProgress({ onChange, disabled, currentTime, duration }) {
    const progress = timeToProgress(currentTime, duration);

    const handleChange = (event) => {
        const progress = event.target.value;
        const currentTime = progressToTime(progress, duration);
        onChange(currentTime);
    };

    return (
        <div className="audio-progress">
            <div>{convertTime(currentTime)} / {convertTime(duration)}</div>
            <input
                type="range"
                min="0"
                max="1"
                value={progress}
                step={0.01}
                className="slider"
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
}

function convertTime(sec = 0) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.round(sec - (minutes * 60));
    return `${minutes}:${seconds}`;
}

function timeToProgress(currentTime, duration) {
    return duration ? currentTime / duration : 0;
}

function progressToTime(progress, duration) {
    return progress * duration;
} 
