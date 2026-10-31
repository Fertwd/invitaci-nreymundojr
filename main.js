document.addEventListener('DOMContentLoaded', () => {
    const btnEmpezar = document.getElementById('btn-empezar');
    
    if (btnEmpezar) {
        btnEmpezar.addEventListener('click', () => {
            playWarpSound();
            
            const pantallaEntrada = document.getElementById('pantalla-entrada');
            pantallaEntrada.classList.add('warp-spin');

            setTimeout(() => {
                pantallaEntrada.style.display = 'none';
                const contenido = document.getElementById('contenido-invitacion');
                contenido.style.display = 'block';

                const audioFondo = document.getElementById('audio-fondo');
                if (audioFondo) {
                    audioFondo.volume = 0.6;
                    audioFondo.play().catch(() => {});
                }
            }, 420);
        });
    }
});

function playWarpSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
        
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

        osc.start(now);
        osc.stop(now + 0.35);
    } catch (e) {}
}