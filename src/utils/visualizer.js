let analyser;
let request;

export const visualizer = (audioElement, canvas, play) => {
    // Simplemente limpiar el canvas sin hacer nada más
    if (!canvas || !canvas.getContext) {
        return;
    }

    const ctx = canvas.getContext("2d");
    const WIDTH = canvas.width = canvas.clientWidth;
    const HEIGHT = canvas.height = canvas.clientHeight;

    if (play) {
        // Solo mostrar un indicador estático que la música está reproduciéndose
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, HEIGHT - 5, WIDTH, 5);
    } else {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
};