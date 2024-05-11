document.getElementById('bt-apagar').addEventListener('click', apagar);
document.getElementById('bt-gravar').addEventListener('click', gravar);
document.getElementById('bt-novo').addEventListener('click', limparForm);
let lista = [];

let tpStatus = {
    "Pré Operatório": "text-bg-info",
    "Transferido": "text-bg-success",
    "Recuperação": "text-bg-danger"
}

function gravar() {
    let indice = document.getElementById('indice').value;
    let _lineNumber = document.getElementById('_lineNumber').value;
    let nome = document.getElementById('nome').value;
    let status = document.getElementById('status').value;
    let local = document.getElementById('local').value;


    if (nome != '' && status != '') {
        let obj = {};
        obj.nome = nome;
        obj.status = status;
        obj.local = local;

        if (indice == "") {
            createRow(obj).then((o) => {
                lista.push(o);
                ataulizarTabela();
            });
        } else {
            patchRow(_lineNumber, obj).then((o) => {
                lista[indice] = o;
                ataulizarTabela();
            });
        }
        console.table(lista);
        
        limparForm();
    } else {
        alert('Item e Status devem estar preenchidos')
    }
}

function ataulizarTabela() {
    localStorage.setItem("lista",JSON.stringify(lista));
    let tbody = '';
    if (lista.length > 0) {
        let i = 0;
        for (const obj of lista) {
            if(obj.nome != ""){
                tbody += `<tr onclick='editar(${i})'>
                <td>${obj.nome}</td>
                <td class="${tpStatus[obj.status]}">${obj.status}(${obj.local})</td>
                <td>${obj.local}</td>
                <td>${obj.hrPrevisto}</td>
                <td>${obj.hrInicio}</td>
                <td>${obj.fimCirurgia}</td>
                <td>${obj.saidaPrevista}</td>
                </tr>`;
            }
            i++;
        }
    } else {
        tbody = `<tr><td>Lista vazia</td></tr>`;
    }
    document.getElementById('tbody').innerHTML = tbody;
}

function limparForm() {
    document.getElementById('indice').value = "";
    document.getElementById('_lineNumber').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('status').value = "";
    document.getElementById('local').value = "";
    document.getElementById('hrPrevisto').value = "";
    document.getElementById('hrInicio').value = "";
    document.getElementById('fimCirurgia').value = "";
    document.getElementById('saidaPrevista').value = "";
}

function editar(indice) {
    obj = lista[indice];
    document.getElementById('indice').value = indice;
    document.getElementById('_lineNumber').value = obj._lineNumber;
    document.getElementById('nome').value = obj.nome;
    document.getElementById('status').value = obj.status;
    document.getElementById('local').value = obj.local;
    document.getElementById('hrPrevisto').value = obj.hrPrevisto;
    document.getElementById('hrInicio').value = obj.hrInicio;
    document.getElementById('fimCirurgia').value = obj.fimCirurgia;
    document.getElementById('saidaPrevista').value = obj.saidaPrevista;
}

function apagar() {
    let indice = document.getElementById('indice').value;
    let _lineNumber = document.getElementById('_lineNumber').value;
    if (indice != "") {
        deleteRow(_lineNumber).then(() =>{
            lista.splice(indice, 1);
            ataulizarTabela();
        });
        limparForm();
    } else {
        alert("Necessário selecionar algum nome.")
    }
}

async function getData() {
    const response = await fetch("https://api.zerosheets.com/v1/p8y");
    const data = await response.json();

    // will return an array of objects with the _lineNumber
    return data;
}

async function createRow(payload) {
    /* Payload should be an object with the columns you want to create, example:
    const payload = {
        column1: "foo",
        column2: "bar"
    };
    */
    const response = await fetch("https://api.zerosheets.com/v1/p8y", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const data = await response.json();
  
    return data;
}

async function patchRow(lineNumber, payload) {
    /* Payload should be an object with the columns you want to update, example:

    const payload = {
        foo: "bar"
    };
    */
    const url = "https://api.zerosheets.com/v1/p8y/" + lineNumber;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    // will return an object of the new row plus the _lineNumber
    return data;
}

async function deleteRow(lineNumber) {
    const url = "https://api.zerosheets.com/v1/p8y/" + lineNumber; // lineNumber comes from the get request
    await fetch(url, {
        method: "DELETE"
    });
    // No response data is returned
}

getData().then( (ls) => {
    lista = ls;
    ataulizarTabela();
} );