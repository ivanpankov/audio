import "./styles.scss";

export default function AudioProgress({ progress, onChange, disabled }) {
    const handleChange = (event) => {
        console.log(event)
    };

    return (
        <div className="audio-progress">
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
