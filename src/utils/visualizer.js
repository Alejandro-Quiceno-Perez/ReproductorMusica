
let analyser;
let request;

export const visualizer = (audioElement, canvas, play) => {
    // Detectar si es móvil de forma simple
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Si es móvil, no hacer nada para ahorrar recursos
    if (isMobile) {
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        return;
    }

    // MANTENER EL RESTO DEL CÓDIGO ORIGINAL
    if (play) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 64;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const barWidth = WIDTH / bufferLength;

        const ctx = canvas.getContext("2d");

        function draw() {
            request = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * HEIGHT;
                const red = (i * barHeight) / 10;
                const green = i * 4;
                const blue = barHeight / 4 - 12;
                ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        }

        draw();
    } else {
        if (request) {
            cancelAnimationFrame(request);
            request = null;
        }
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
};