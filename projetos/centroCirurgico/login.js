function acessar() {
    let nome = document.getElementById('nome').value;
    let senha = document.getElementById('senha').value;
    
    if (nome == "senai" && senha == "HRT2024") {
        // alert("Login ok!")
        window.location.href = "gerenciador.html";
    } else {
        alert("Login errado!")
        
    }
}


