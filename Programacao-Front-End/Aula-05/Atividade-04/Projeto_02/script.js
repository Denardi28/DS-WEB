const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('wrapper');
const restartBtn = document.getElementById('restartBtn');

const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('level');

const grid = 40;
let score, lives, level, obstacles, gameActive;
let easterEggTriggered = false;
let isRespawning = false; // Nova trava para o tempo de espera

const themes = [
    { road: "#333", water: "#00008B", grass: "#228B22" },
    { road: "#1a0000", water: "#700000", grass: "#4a4a4a" },
    { road: "#001a1a", water: "#008b8b", grass: "#4b0082" }
];

const frog = { x: grid * 4, y: grid * 9, width: grid, height: grid, char: '🐸' };

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq, type, duration, volume, delay = 0) {
    setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }, delay);
}

function playDeathSound() { playSound(150, 'sawtooth', 0.3, 0.2); }

function playGameOverSound() {
    [300, 250, 200, 150].forEach((f, i) => {
        playSound(f, 'square', 0.4, 0.1, i * 200);
    });
}

function playEasterEggSound() {
    [440, 554, 659, 880, 1108].forEach((f, i) => {
        playSound(f, 'sine', 0.4, 0.15, i * 150);
    });
}

function restartGame() {
    score = 0;
    lives = 3;
    level = 1;
    gameActive = true;
    easterEggTriggered = false;
    isRespawning = false;
    restartBtn.style.display = "none";
    resetFrog();
    initLevel();
}

function triggerDeath() {
    if (isRespawning) return; // Evita múltiplas mortes no mesmo segundo
    
    lives--;
    isRespawning = true; // Ativa o tempo de espera
    
    playDeathSound();
    wrapper.classList.add('shake');
    
    // Remove o tremor após 200ms
    setTimeout(() => wrapper.classList.remove('shake'), 200);

    if (lives > 0) {
        // ESPERA 1 SEGUNDO (1000ms) antes de resetar o sapo e permitir o jogo
        setTimeout(() => {
            resetFrog();
            isRespawning = false;
        }, 1000);
    } else {
        gameActive = false;
        playGameOverSound();
        restartBtn.style.display = "block";
    }
}

class Obstacle {
    constructor(x, y, width, height, speed, type, sprite) {
        this.x = x; this.y = y; this.width = width; this.height = height;
        this.speed = speed; this.type = type; this.sprite = sprite;
    }
    draw() {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.sprite, this.x + this.width / 2, this.y + 32);
    }
    update() {
        this.x += this.speed;
        if (this.speed > 0 && this.x > canvas.width) this.x = -this.width;
        else if (this.speed < 0 && this.x < -this.width) this.x = canvas.width;
    }
}

function initLevel() {
    obstacles = [];
    const speedBoost = 1 + (level * 0.3); 
    [8, 7, 6].forEach((row, i) => {
        let dir = i % 2 === 0 ? 1 : -1;
        let sprite = ['🚗', '🚕', '🏎️'][i];
        for (let j = 0; j < 3; j++) {
            obstacles.push(new Obstacle(j * 160, grid * row, grid, grid, (1.5 + Math.random()) * dir * speedBoost, 'car', sprite));
        }
    });
    [3, 2, 1].forEach((row, i) => {
        let dir = i % 2 === 0 ? 1 : -1;
        let sprite = ['🪵', '🛶', '🪵'][i];
        for (let j = 0; j < 2; j++) {
            obstacles.push(new Obstacle(j * 220, grid * row, grid * 2, grid, (1 + Math.random()) * dir * speedBoost, 'log', sprite));
        }
    });
}

function resetFrog() { 
    frog.x = grid * 4; 
    frog.y = grid * 9; 
}

restartBtn.addEventListener('click', restartGame);

window.addEventListener('keydown', e => {
    // Bloqueia movimento se estiver no tempo de renascimento (respawn)
    if (!gameActive || easterEggTriggered || isRespawning) return;

    if (level === 1 && frog.x === 0 && frog.y === grid * 9 && e.key === 'ArrowLeft') {
        easterEggTriggered = true;
        gameActive = false;
        playEasterEggSound();
        restartBtn.style.display = "block";
        return;
    }

    if (e.key === 'ArrowUp') frog.y -= grid;
    if (e.key === 'ArrowDown' && frog.y < grid * 9) frog.y += grid;
    if (e.key === 'ArrowLeft' && frog.x > 0) frog.x -= grid;
    if (e.key === 'ArrowRight' && frog.x < canvas.width - grid) frog.x += grid;
});

function update() {
    if (!gameActive || easterEggTriggered || isRespawning) return;
    
    let onLog = false;
    obstacles.forEach(obs => {
        obs.update();
        if (obs.type === 'car' && frog.y === obs.y && frog.x < obs.x + obs.width - 10 && frog.x + frog.width > obs.x + 10) {
            triggerDeath();
        }
        if (obs.type === 'log' && frog.y === obs.y && frog.x < obs.x + obs.width && frog.x + frog.width > obs.x) {
            onLog = true;
            frog.x += obs.speed;
        }
    });
    
    if (frog.y >= grid && frog.y <= grid * 3 && !onLog) triggerDeath();
    if ((frog.x < -10 || frog.x > canvas.width) && frog.y <= grid * 3) triggerDeath();
    
    if (frog.y === 0) {
        score += 100 * level;
        if (level === 10) {
            easterEggTriggered = true;
            gameActive = false;
            playEasterEggSound();
            restartBtn.style.display = "block";
        } else {
            level++;
            resetFrog();
            initLevel();
            playSound(600, 'sine', 0.2, 0.1);
        }
    }
    scoreEl.innerText = score; livesEl.innerText = lives; levelEl.innerText = level;
}

function drawEasterEggScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#7CFC00"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#006400";
    ctx.font = "bold 18px Courier New";
    ctx.textAlign = "center";
    let msg = level === 10 ? "VOCÊ ATRAVESSOU O MUNDO!" : "VOCÊ ACHOU O ATALHO!";
    ctx.fillText(msg, canvas.width / 2, 70);
    ctx.fillText("RECONECTADO COM A FAMÍLIA!", canvas.width / 2, 100);
    ctx.font = "80px Arial";
    ctx.fillText("🐸🐸🐸", canvas.width / 2, 230); 
    ctx.font = "40px Arial";
    ctx.fillText("🐸🐸", canvas.width / 2, 280);
    ctx.font = "bold 24px Courier New";
    ctx.fillText("✨ FINAL FELIZ ✨", canvas.width / 2, 350);
}

function draw() {
    if (easterEggTriggered) {
        drawEasterEggScene();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const theme = themes[(level - 1) % themes.length] || themes[0];
    
    ctx.fillStyle = theme.water; ctx.fillRect(0, grid, canvas.width, grid * 3);
    ctx.fillStyle = theme.road;  ctx.fillRect(0, grid * 6, canvas.width, grid * 3);
    ctx.fillStyle = theme.grass; ctx.fillRect(0, 0, canvas.width, grid);
    ctx.fillRect(0, grid * 4, canvas.width, grid * 2);
    ctx.fillRect(0, grid * 9, canvas.width, grid);
    
    obstacles.forEach(obs => obs.draw());
    
    // Desenha o sapo apenas se não estiver renascendo (efeito de piscar/sumir)
    if (!isRespawning) {
        ctx.fillText(frog.char, frog.x + grid/2, frog.y + 32);
    } else {
        // Opcional: Desenha uma marca de onde ele morreu ou deixa vazio
        ctx.globalAlpha = 0.5;
        ctx.fillText("💥", frog.x + grid/2, frog.y + 32);
        ctx.globalAlpha = 1.0;
    }

    if (!gameActive) {
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff0000";
        ctx.font = "bold 40px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("FIM DE JOGO", canvas.width/2, 180);
    }
}

function gameLoop() {
    update(); // Update roda sempre para manter os carros movendo
    draw();
    requestAnimationFrame(gameLoop);
}

restartGame();
gameLoop();