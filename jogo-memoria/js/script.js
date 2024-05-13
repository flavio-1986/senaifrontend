// lista dos itens que estarão no jogo
let lsEmoticons = ["😀","😎","😴","😍","🤯","🤑","🤣","😭"];

// replicar os itens na tabela
const tamanho = lsEmoticons.length;
for (let i = 0; i < tamanho; i++) {
    lsEmoticons.push(lsEmoticons[i])    
}

//para cada bloco incluir o evento de click

let lsBloco = document.getElementsByClassName("bloco");
for (const b of lsBloco) {
    b.addEventListener("click", ()=>{
        mostrar(b);
    });
}

function mostrar(b){
    b.innerHTML = "😀"
}