let analyser;
let request;

export const visualizer = (audioElement, canvas, play) => {
    if (!analyser) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        let source = audioCtx.createMediaElementSource(audioElement);

        analyser = audioCtx.createAnalyser();

        source.connect(analyser);

        source.connect(audioCtx.destination);
    }

    analyser.fftSize = 64;
    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);

    if (!canvas || !canvas.getContext) {
        console.error("El canvas no está definido o no tiene contexto.");
        return;
    }
    const ctx = canvas.getContext("2d");
    const WITH = (canvas.width = canvas.clientWidth);
    const HEIGHT = (canvas.height = canvas.clientHeight);

    function draw() {
        let colorCycle = 0;
        const red = Math.floor(127 + 127 * Math.sin(colorCycle));
        const blue = Math.floor(127 + 127 * Math.cos(colorCycle));
        const dynamicColor = `rgb(${red}, 4, ${blue})`;

        request = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        ctx.beginPath();
        ctx.clearRect(0, 0, WITH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            let v = dataArray[i] / 10;
            ctx.arc(WITH / 2, HEIGHT / 2, Math.abs(100 + v), 0, 2 * Math.PI);
            ctx.shadowColor = "blue";
            ctx.shadowBlur = 1;
            ctx.strokeStyle = "red";
            ctx.stroke();
        }
    }

    if (play) {
        cancelAnimationFrame(request);
    } else {
        draw();
    }
};
