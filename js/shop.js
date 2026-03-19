const shopData = {
    mercenario: {
        nome: "Recrutar Mercenário",
        custoBase: 10,
        bonus: 1, 
        tipo: "auto"
    },
    espada: {
        nome: "Amolar Espada",
        custoBase: 15,
        bonus: 2, 
        tipo: "click"
    }
};

function calcularCusto(itemKey) {
    const item = shopData[itemKey];
    const quantidade = gameState.upgrades[itemKey] || 0;
    return Math.floor(item.custoBase * Math.pow(1.15, quantidade));
}