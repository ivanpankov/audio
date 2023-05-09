export const MAX_TEMPO = 300;
export const MIN_TEMPO = 30;


export function setup() {
    const ac = new AudioContext();

    const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    const channel = buf.getChannelData(0);
    let phase = 0;
    var amp = 1;
    var duration_frames = ac.sampleRate / 50; //  20ms.
    const f = 330;

    for (var i = 0; i < duration_frames; i++) {
        channel[i] = Math.sin(phase) * amp;
        phase += 2 * Math.PI * f / ac.sampleRate;
        if (phase > 2 * Math.PI) {
            phase -= 2 * Math.PI;
        }
        amp -= 1 / duration_frames;
    }

    const source = ac.createBufferSource();
    source.buffer = buf;

    source.loop = true;
    // setTempo(tempo);
    source.connect(ac.destination);
    source.start(0);

    function setTempo(tempo) {
        source.loopEnd = 1 / (tempo / 60);
    }

    return { ac, setTempo };
}
