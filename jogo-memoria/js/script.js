// lista dos itens que estarão no jogo
let lsEmoticons = ["😀","😎","😴","😍","🤯","🤑","🤣","😭"];

// replicar os itens na tabela
const tamanho = lsEmoticons.length;
for (let i = 0; i < tamanho; i++) {
    lsEmoticons.push(lsEmoticons[i])    
}

//para cada bloco incluir o evento de click
let blocos = {};
let lsBloco = document.getElementsByClassName("bloco");
let id = 0;
for (const b of lsBloco) {
    b.addEventListener("click", ()=>{
        mostrar(b);
    });
    icon = lsEmoticons.splice(sortear(),1);
    blocos[`id${id}`] = icon;
    b.id = `id${id}`;
    id++;
}

function mostrar(b){
    b.innerHTML = blocos[b.id];
}

function sortear(){
    return Math.floor(Math.random() * lsEmoticons.length);
}