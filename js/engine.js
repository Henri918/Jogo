function atacarMonstro() {
    const img = document.querySelector('#monster img');
    gameState.monsterHP = Math.max(0, gameState.monsterHP - gameState.clickPower);
    
    // Adiciona a classe de "hit" e remove depois de 100ms
    img.classList.add('hit');
    setTimeout(() => img.classList.remove('hit'), 100);

    if (gameState.monsterHP <= 0) morrerMonstro();
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
        img.src = "https://vignette.wikia.nocookie.net/dragonquest/images/1/1d/Dark_skeleton.png/revision/latest?cb=20151206144820"; // Chefão
    } else if (gameState.level >= 10) {
        img.src = "https://www.pngmart.com/files/15/Skeleton-Warrior-PNG-Clipart.png";   // Monstro Médio
    } else if (gameState.level >= 5) {
        img.src = "https://vignette.wikia.nocookie.net/p__/images/d/d4/Slime_Blue_Quest.png/revision/latest?cb=20151122170851&path-prefix=protagonist"; // Monstro Inicial
    } else {
        img.src = "https://pngimg.com/uploads/dragon/dragon_PNG84.png";   // Operário (Base)
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