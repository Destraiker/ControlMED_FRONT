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

function login_medico() {
    var form = document.getElementById('form_login');
    var data = {};
    data['crm'] = form.crm.value;
    data['senha'] = form.senha.value;
    console.log(JSON.stringify(data));
    fetch(caminho_api + 'medico/login', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            response.json().then(function (parsedJson) {
                setCookie("jwt_medico", parsedJson.jwt, 1);
            });
            window.location.href = caminho_front + "medico/inicio";
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }

    })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}
window.onload = tabela_receitas_medico;

function tabela_receitas_medico() {
    if (document.querySelector('#medico_receitas')) {
        var data = {};
        data['crm'] = getCookie('crm');
        console.log(JSON.stringify(data));
        console.log(data);
        fetch(caminho_api + 'medico/receitas', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                response.json().then(function (parsedJson) {
                    var table = document.getElementById("medico_receitas");
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
                        status.innerHTML = parsedJson[i]['status_receita'];
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
function inverterData_americano(data) {
    split = data.split('/');
    novadata = split[2] + "-" + split[1] + "-" + split[0];
    return data_americana = new Date(novadata);
}

function dataAtual() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var str_data = ano + '-' + (mes + 1) + '-' + dia;

    return new Date(str_data);
}
function Emitir_Receita() {
    var form = document.getElementById('form_receita');
    var data = {};
    data['medico_crm'] = getCookie('crm');
    data['cpf_paciente'] = form.cpf_usuario.value;
    data['vencimento'] = inverterData_americano(form.vencimento.value);
    data['descricao'] = form.decricao.value;
    console.log(JSON.stringify(data));
    fetch(caminho_api + 'medico/emitir_receita', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            window.location.href = caminho_front + "medico/receitas";
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }

    })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}
function cadastrar_medico() {
    if (validarSenha()) {
        var form = document.getElementById('form_cadastro_medico');
        var data = {};
        data['crm'] = form.crm.value;
        data['nome'] = form.nome_medico.value;
        data['senha'] = form.senha.value;
        console.log(JSON.stringify(data));
        fetch(caminho_api + 'medico/cadastrar', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                window.location.href = caminho_front + "medico/login";
            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }

        })
            .then((data) => console.log(data))
            .catch(err => console.log('Error message:', err.statusText));
    } else {
        $("#modalCadastro").modal();
    }
}
function sairMedico() {
    apagarCookie('jwt_medico');
    apagarCookie('crm');
    window.location.href = caminho_front + "medico/login";
}
function apagarCookie(name) {
    setCookie(name, -1); // deletando o cookie encontrado a partir do mostraCookie
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
/*
window.onload = function(e) {
	fetch(
		this.caminho_api+'get_receitas.php', {
		}).then(response => response.json())
	.then(data => {
		console.log(data);
		data.forEach(receita => {
			var table = document.getElementById("medico_receitas");
			var row = table.insertRow(-1);
			var cpfPaciente = row.insertCell(0);
			var descricao = row.insertCell(1);
			var dataEmicao = row.insertCell(2);
			var vencimento = row.insertCell(3);
			var status = row.insertCell(4);
			cpfPaciente.innerHTML = receita.cpf_paciente;
			descricao.innerHTML = receita.descricao;
			dataEmicao.innerHTML = receita.data_emicao;
			vencimento.innerHTML = receita.vencimento;
			status.innerHTML = receita.status_receita;
		})
	}).catch(error => console.error(error))
}*/