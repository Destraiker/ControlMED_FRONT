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
    fetch(caminho_api + 'login_medico.php', {
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

function decodificar_token(token) {
    var data = {};
    data['jwt'] = token;
    console.log(JSON.stringify(data));
    fetch(caminho_api + 'validar_token.php', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            response.json().then(data => {
                alert(data.message);
                console.log(data.message);
                
            });
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }

    })
        .then((data) => console.log(data))
        .catch(err => console.log('Error message:', err.statusText));
}

 function teste_de_tabela() {
    if (document.querySelector('#medico_receitas')) {
        var data = {};
        data['crm'] = this.decodificar_token(this.getCookie('jwt_medico'));
        console.log(JSON.stringify(data));
        console.log(data);
        fetch(caminho_api + 'medico/receitas', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                response.json().then(function (parsedJson) {
                    var table = document.getElementById("medico_receitas");
                    var row = table.insertRow(-1);
                    for (i in parsedJson) {
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