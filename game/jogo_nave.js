let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");

let nave = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade: 5
};

let tiros = [];

let inimigos = [];
for (let i = 0; i < 10; i++) {
    inimigos.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 100,
        largura: 50,
        altura: 50,
        velocidade: 2
    });
}

function desenharNave() {
    ctx.fillStyle = "blue";
    ctx.fillRect(nave.x, nave.y, nave.largura, nave.altura);
}

function moverNave(direcao) {
    if (direcao === "esquerda" && nave.x > 0) {
        nave.x -= nave.velocidade;
    } else if (direcao === "direita" && nave.x < canvas.width - nave.largura) {
        nave.x += nave.velocidade;
    }
}

function desenharTiros() {
    ctx.fillStyle = "red";
    for (let i = 0; i < tiros.length; i++) {
        ctx.fillRect(tiros[i].x, tiros[i].y, tiros[i].largura, tiros[i].altura);
    }
}

function moverTiros() {
    for (let i = 0; i < tiros.length; i++) {
        tiros[i].y -= 10;
        if (tiros[i].y < 0) {
            tiros.splice(i, 1);
            i--;
        }
    }
}

function desenharInimigos() {
    ctx.fillStyle = "green";
    for (let i = 0; i < inimigos.length; i++) {
        ctx.fillRect(inimigos[i].x, inimigos[i].y, inimigos[i].largura, inimigos[i].altura);
    }
}

function moverInimigos() {
    for (let i = 0; i < inimigos.length; i++) {
        inimigos[i].y += inimigos[i].velocidade;
        if (inimigos[i].y > canvas.height) {
            inimigos[i].y = Math.random() * 100;
            inimigos[i].x = Math.random() * canvas.width;
        }
    }
}

function detectarColisao() {
    for (let i = 0; i < tiros.length; i++) {
        for (let j = 0; j < inimigos.length; j++) {
            if (tiros[i].x < inimigos[j].x + inimigos[j].largura &&
                tiros[i].x + tiros[i].largura > inimigos[j].x &&
                tiros[i].y < inimigos[j].y + inimigos[j].altura &&
                tiros[i].y + tiros[i].altura > inimigos[j].y) {
                tiros.splice(i, 1);
                inimigos.splice(j, 1);
                i--;
                j--;
            }
        }
    }
}

function desenharPlacar() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Pontos: " + (10 - inimigos.length), 10, 20);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharNave();
    desenharTiros();
    desenharInimigos();
    moverTiros();
    moverInimigos();
    detectarColisao();
    desenharPlacar();
    requestAnimationFrame(loop);
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        moverNave("esquerda");
    } else if (event.key === "ArrowRight") {
        moverNave("direita");
    } else if (event.key === " ") {
        tiros.push({
            x: nave.x + nave.largura / 2 - 5,
            y: nave.y,
            largura: 10,
            altura: 20
        });
    }
});

loop();

