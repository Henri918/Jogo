function atacarMonstro() {
    // Garante que o HP não fique negativo
    gameState.monsterHP = Math.max(0, gameState.monsterHP - gameState.clickPower);
    
    if (gameState.monsterHP <= 0) {
        morrerMonstro();
    }
    
    atualizarInterface();
}

function aplicarDPS() {
    if (gameState.dps > 0) {
        // Aplica o dano e trava no zero
        gameState.monsterHP = Math.max(0, gameState.monsterHP - (gameState.dps / 10));
        
        if (gameState.monsterHP <= 0) {
            morrerMonstro();
        }
        atualizarInterface();
    }
}
function atualizarImagemMonstro() {
    const img = document.querySelector('#monster img');
    
    // Define qual imagem usar baseado no Level
    if (gameState.level >= 15) {
        img.src = "https://cdn-icons-png.flaticon.com/512/1013/1013865.png"; // Chefão
    } else if (gameState.level >= 10) {
        img.src = "https://cdn-icons-png.flaticon.com/512/433/433615.png";   // Monstro Médio
    } else if (gameState.level >= 5) {
        img.src = "https://cdn-icons-png.flaticon.com/512/1236/1236413.png"; // Monstro Inicial
    } else {
        img.src = "https://cdn-icons-png.flaticon.com/512/606/606506.png";   // Operário (Base)
    }
}

// ATUALIZE SUA FUNÇÃO MORRERMONSTRO:
function morrerMonstro() {
    let recompensa = gameState.level * 5;
    gameState.gold += recompensa;
    
    gameState.level++;
    
    // Atualiza o monstro visualmente
    atualizarImagemMonstro(); 
    
    // Configura o novo HP
    gameState.monsterMaxHP = Math.floor(10 * Math.pow(1.2, gameState.level));
    gameState.monsterHP = gameState.monsterMaxHP;
    
    saveGame();
}
function comprarUpgrade(itemKey) {
    const custo = calcularCusto(itemKey);
    
    // 1. Verifica se o jogador tem ouro suficiente
    if (gameState.gold >= custo) {
        // 2. Tira o ouro
        gameState.gold -= custo;
        
        // 3. Aumenta o nível do upgrade (se não existir, vira 1)
        gameState.upgrades[itemKey] = (gameState.upgrades[itemKey] || 0) + 1;
        
        // 4. Aplica o bônus baseado no tipo do item (definido no shop.js)
        const item = shopData[itemKey];
        if (item.tipo === "auto") {
            gameState.dps += item.bonus;
        } else {
            gameState.clickPower += item.bonus;
        }
        
        console.log(`Sucesso! Comprou ${item.nome}. Novo custo: ${calcularCusto(itemKey)}`);
        
        // 5. Atualiza a tela e salva
        atualizarInterface();
        saveGame();
    } else {
        alert(`Ouro insuficiente! Você precisa de ${custo} 💰`);
    }
}