const filme = prompt("Digite seu filme: ");
let clickBotao = true;

if (clickBotao){
    switch (filme) {
        case "O refúgio":
            alert("Você selecionou o filme 'O refúgio'");
            break;
        case "Máquina de Guerra":
            alert("Você selecionou o filme 'Máquina de Guerra'");
            break;
        case "Destruição Final 2":
            alert("Você selecionou o filme 'Destruição Final 2'");
            break;
        default:
            alert("Você selecionou um filme fora da nossa lista");
            break;
    }
};

//perfeito