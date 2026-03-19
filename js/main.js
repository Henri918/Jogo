function atualizarInterface() {
    document.getElementById('gold').innerText = Math.floor(gameState.gold);
    document.getElementById('dps').innerText = gameState.dps;
    document.getElementById('level').innerText = gameState.level;
    
    // Atualiza Barra de Vida
    const porcentagem = (gameState.monsterHP / gameState.monsterMaxHP) * 100;
    document.getElementById('hp-bar').style.width = Math.max(0, porcentagem) + "%";
    document.getElementById('hp-text').innerText = `${Math.floor(gameState.monsterHP)} / ${gameState.monsterMaxHP}`;
    
    // Preços
    document.getElementById('preco-espada').innerText = calcularCusto('espada');
    document.getElementById('preco-mercenario').innerText = calcularCusto('mercenario');
}

function saveGame() {
    gameState.lastCheck = Date.now();
    localStorage.setItem('skyRpgSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('skyRpgSave');
    if (saved) {
        const data = JSON.parse(saved);
        // Garante que não perdemos propriedades novas ao carregar save antigo
        gameState = {...gameState, ...data};
    }
    atualizarInterface();
}

function resetarJogo() {
    if (confirm("Deseja apagar todo o seu progresso e começar do zero?")) {
        localStorage.clear(); // Limpa o save
        window.location.reload(); // Recarrega a página
    }
}

// Loop de DPS (Roda a cada 100ms para ser suave)
setInterval(() => {
    if (gameState.dps > 0) {
        gameState.monsterHP -= (gameState.dps / 10);
        if (gameState.monsterHP <= 0) morrerMonstro();
        atualizarInterface();
    }
}, 100);

// Auto-save a cada 30s
setInterval(saveGame, 30000);

window.onload = loadGame;