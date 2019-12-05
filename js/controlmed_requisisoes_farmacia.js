var caminho_api = "http://localhost/ControlMED/";
var caminho_front = "http://localhost/ControlMED_FRONT/";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get or read cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function VerificaSenha() {
    val1 = document.getElementById('senha').value;
    val2 = document.getElementById('senha_confirmar').value;
    if (val1 != val2) {
        document.getElementById('senha').style.borderColor = "#f00";
        document.getElementById('senha_confirmar').style.borderColor = "#f00";
    }
    else {
        document.getElementById('senha').style.borderColor = "#39ff14";
        document.getElementById('senha_confirmar').style.borderColor = "#39ff14";

    }
}
function validarSenha() {
    val1 = document.getElementById('senha').value;
    val2 = document.getElementById('senha_confirmar').value;
    if (val1 != val2) {
        return false;
    }
    else {
        return true;
    }
}

function cadastrar_medico() {

    if (validarSenha()) {
        var form = document.getElementById('form_cadastro_farmarcia');
        var data = {};
        data['cnpj'] = form.cnpj.value;
        data['cnpj'] = data['cnpj'].replace(".", "");
        data['cnpj'] = data['cnpj'].replace("/", "");
        data['cnpj'] = data['cnpj'].replace("-", "");
        data['cnpj'] = data['cnpj'].replace(".", "");
        data['nome'] = form.nome_farmarcia.value;
        data['senha'] = form.senha.value;

        console.log(JSON.stringify(data));
        fetch(caminho_api + 'farmarcia/cadastrar', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                $("#modalCadastro_sucesso").modal();
            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })
            .then((data) => console.log(data))
            .catch(err => console.log('Error message:', err.statusText));
    } else {
        $("#modalCadastro_erro").modal();
    }
}

window.onload = tabela_receitas_farmacia;
function tabela_receitas_farmacia() {
    if (document.querySelector('#receitas_fechadas')) {
        var data = {};
        data['cnpj'] = getCookie('cnpj');
        console.log(JSON.stringify(data));
        console.log(data);
        fetch(caminho_api + 'farmacia/receitas_cnpj', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                response.json().then(function (parsedJson) {
                    var table = document.getElementById("receitas_fechadas");
                    table.deleteRow(1);
                    for (i in parsedJson) {
                        var row = table.insertRow(-1);

                        var cpfPaciente = row.insertCell(0);
                        var descricao = row.insertCell(1);
                        var dataEmicao = row.insertCell(2);
                        var vencimento = row.insertCell(3);

                        cpfPaciente.innerHTML = parsedJson[i]['cpf_paciente'];
                        descricao.innerHTML = parsedJson[i]['descricao'];
                        dataEmicao.innerHTML = parsedJson[i]['data_emicao'];
                        vencimento.innerHTML = parsedJson[i]['vencimento'];
                    }
                });
            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })
            .then((data) => console.log(data))
            .catch(err => console.log('Error message:', err.statusText));


    }
}

function login_medico() {
    var form = document.getElementById('form_login');
    var data = {};
    data['cnpj'] = form.cnpj.value;
    data['cnpj'] = data['cnpj'].replace(".", "");
    data['cnpj'] = data['cnpj'].replace("/", "");
    data['cnpj'] = data['cnpj'].replace("-", "");
    data['cnpj'] = data['cnpj'].replace(".", "");
    data['senha'] = form.senha.value;
    console.log(JSON.stringify(data));
    fetch(caminho_api + 'farmarcia/login', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            response.json().then(function (parsedJson) {
                if (parsedJson.mensagem == "Sucesso login.") {
                    setCookie("jwt_farmarcia", parsedJson.jwt, 1);
                    window.location.href = caminho_front + "farmarcia/inicio";
                } else {
                    $("#modal_login_erro").modal();
                }
            });
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }

    })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}

function pesquisar_receitas() {
    var form = document.getElementById('form_cpf_pesquisa');
    var data = {};
    data['cpf_paciente'] = form.cpf_pesquisa.value;
    data['cpf_paciente']=data['cpf_paciente'].replace(".","");
    data['cpf_paciente']=data['cpf_paciente'].replace("-","");
    data['cpf_paciente']=data['cpf_paciente'].replace(".","");
    console.log(JSON.stringify(data));
    console.log(data);
    fetch(caminho_api + 'farmacia/receitas_cpf', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            response.json().then(function (parsedJson) {
                var table = document.getElementById("farmacia_receitas_cpf");
                table.deleteRow(1);
                for (i in parsedJson) {
                    var row = table.insertRow(-1);

                    var cpfPaciente = row.insertCell(0);
                    var descricao = row.insertCell(1);
                    var dataEmicao = row.insertCell(2);
                    var vencimento = row.insertCell(3);
                    var status = row.insertCell(4);
                    var acao = row.insertCell(5);

                    cpfPaciente.innerHTML = parsedJson[i]['cpf_paciente'];
                    descricao.innerHTML = parsedJson[i]['descricao'];
                    dataEmicao.innerHTML = parsedJson[i]['data_emicao'];
                    vencimento.innerHTML = parsedJson[i]['vencimento'];

                    if(parsedJson[i]['status_receita']==1){
                        var botao="<button class='btn btn btn-primary form-control' value='"+parsedJson[i]['status_receita']+"'>Fechar</button>";
                        var faixa="<div class='card bg-success text-white shadow'><div class='card-body'>Aberta</div></div>";
                    }else{
                        var botao="<button class='btn btn btn-danger form-control'>Fechar</button>";
                        var faixa="<div class='card bg-danger text-white shadow'><div class='card-body'>Fechada</div></div>";
                    }
                    status.innerHTML = faixa;
                    acao.innerHTML = botao;
                }
            });
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }
    })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}

function mascara(m, t, e, c) {
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g, '');
    var l = texto.length;
    var lm = m.length;
    if (window.event) {
        id = e.keyCode;
    } else if (e.which) {
        id = e.which;
    }
    cursorfixo = false;
    if (cursor < l) cursorfixo = true;
    var livre = false;
    if (id == 16 || id == 19 || (id >= 33 && id <= 40)) livre = true;
    ii = 0;
    mm = 0;
    if (!livre) {
        if (id != 8) {
            t.value = "";
            j = 0;
            for (i = 0; i < lm; i++) {
                if (m.substr(i, 1) == "#") {
                    t.value += texto.substr(j, 1);
                    j++;
                } else if (m.substr(i, 1) != "#") {
                    t.value += m.substr(i, 1);
                }
                if (id != 8 && !cursorfixo) cursor++;
                if ((j) == l + 1) break;

            }
        }
    }
    if (cursorfixo && !livre) cursor--;
    t.setSelectionRange(cursor, cursor);
}
function sairFarmacia() {
    apagarCookie('jwt_farmarcia');
    apagarCookie('cnpj');
    window.location.href = caminho_front + "farmacia/login";
}
function apagarCookie(name) {
    setCookie(name, -1); // deletando o cookie encontrado a partir do mostraCookie
}

function pesquisar_receitas_cpf_user() {
    var form = document.getElementById('form_cpf_pesquisa');
    var data = {};
    data['cpf_paciente'] = form.cpf_pesquisa.value;
    data['cpf_paciente']=data['cpf_paciente'].replace(".","");
    data['cpf_paciente']=data['cpf_paciente'].replace("-","");
    data['cpf_paciente']=data['cpf_paciente'].replace(".","");
    console.log(JSON.stringify(data));
    console.log(data);
    fetch(caminho_api + 'farmacia/receitas_cpf', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            response.json().then(function (parsedJson) {
                var table = document.getElementById("farmacia_receitas_cpf");
                table.deleteRow(1);
                for (i in parsedJson) {
                    var row = table.insertRow(-1);

                    var cpfPaciente = row.insertCell(0);
                    var descricao = row.insertCell(1);
                    var dataEmicao = row.insertCell(2);
                    var vencimento = row.insertCell(3);
                    var status = row.insertCell(4);

                    cpfPaciente.innerHTML = parsedJson[i]['cpf_paciente'];
                    descricao.innerHTML = parsedJson[i]['descricao'];
                    dataEmicao.innerHTML = parsedJson[i]['data_emicao'];
                    vencimento.innerHTML = parsedJson[i]['vencimento'];

                    if(parsedJson[i]['status_receita']==1){
                        var faixa="<div class='card bg-success text-white shadow'><div class='card-body'>Aberta</div></div>";
                    }else{
                        var faixa="<div class='card bg-danger text-white shadow'><div class='card-body'>Fechada</div></div>";
                    }
                    status.innerHTML = faixa;
                }
            });
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }
    })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}