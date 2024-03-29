<?php
//define('PASTAPROJETO', 'AulaBanco');
define('PASTAPROJETO', 'ControlMED');
define('PASTAFRONT', 'ControlMED_FRONT');
define('RAIZ_FRONT', 'C:\xampp\htdocs');

define('HTMLMODELOP1', "<!DOCTYPE html><html lang='pt-br'><head>");
define('HTMLMODELOP2', "</head><body id='page-top'><div id='wrapper'>");
define('HTMLMODELOP3', "<div id='content-wrapper' class='d-flex flex-column'><div id='content'>");
define('HTMLMODELOP4', "</div>");
define('HTMLMODELOP5', "</div></div><a class='scroll-to-top rounded' href='#page-top'><i class='fas fa-angle-up'></i></a>");
define('HTMLMODELOP6', "</body></html>");

/* Função criada para retornar o tipo de requisição */
function checkRequest()
{
	$method = $_SERVER['REQUEST_METHOD'];
	switch ($method) {
		case 'PUT':
			$answer = "update";
			break;
		case 'POST':
			$answer = "post";
			break;
		case 'GET':
			$answer = "get";
			break;
		case 'DELETE':
			$answer = "delete";
			break;
		default:
			handle_error($method);
			break;
	}
	return $answer;
}

$answer = checkRequest();

$request = $_SERVER['REQUEST_URI'];
http: //localhost:8080/PhpBackEnd
//echo $request;

// IDENTIFICA A URI DA REQUISIÇÃO


switch ($request) {
	case '/' . PASTAFRONT . '/medico/inicio':
		$data = VeridicarCookie($_COOKIE['jwt_medico']);
		if ($data == "Token invalido") {
			header('Location: ./login');
		} else {
			$nome = "crm";
			$valor = $data->crm;
			$expira = time() + 3600;
			setcookie($nome, $valor, $expira);

			echo HTMLMODELOP1;
			echo "<title>ControlMED | Medico | Inicio</title>";
			require __DIR__ . '/medico/head.html';
			echo HTMLMODELOP2;
			require __DIR__  . '/medico/menu.html';
			echo HTMLMODELOP3;
			require __DIR__ . '/medico/cabecalho.html';
			require __DIR__  . '/medico/inicio.html';
			echo HTMLMODELOP4;
			require __DIR__  . '/medico/rodape.html';
			echo HTMLMODELOP5;
			require __DIR__  . '\\medico\\modals.html';
			require __DIR__  . '\\medico\\scripts.html';
			echo query_nome($data->nome);
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/medico/nova_receita':
		$data = VeridicarCookie($_COOKIE['jwt_medico']);
		if ($data == "Token invalido") {
			header('Location: ./login');
		} else {
			$nome = "crm";
			$valor = $data->crm;
			$expira = time() + 3600;
			setcookie($nome, $valor, $expira);

			echo HTMLMODELOP1;
			echo "<title>ControlMED | Medico | Inicio</title>";
			require __DIR__ . '/medico/head.html';
			echo HTMLMODELOP2;
			require __DIR__  . '/medico/menu.html';
			echo HTMLMODELOP3;
			require __DIR__ . '/medico/cabecalho.html';
			require __DIR__  . '/medico/nova_receita.html';
			echo HTMLMODELOP4;
			require __DIR__  . '/medico/rodape.html';
			echo HTMLMODELOP5;
			require __DIR__  . '\\medico\\modals.html';
			require __DIR__  . '\\medico\\scripts.html';
			echo query_nome($data->nome);
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/medico/caregando':
		require __DIR__  . '/medico/caregando.html';
		break;

	case '/' . PASTAFRONT . '/medico/receitas':
		$data = VeridicarCookie($_COOKIE['jwt_medico']);
		if ($data == "Token invalido") {
			header('Location: ./login');
		} else {
			$nome = "crm";
			$valor = $data->crm;
			$expira = time() + 3600;
			setcookie($nome, $valor, $expira);
			echo HTMLMODELOP1;
			echo "<title>ControlMED | Medico | Receitas</title>";
			require __DIR__  . '/medico/head.html';
			echo "<link href='../vendor/datatables/dataTables.bootstrap4.min.css' rel='stylesheet'>";
			echo HTMLMODELOP2;
			require __DIR__  .  '/medico/menu.html';
			echo HTMLMODELOP3;
			require __DIR__  .  '/medico/cabecalho.html';
			require __DIR__  .  '/medico/listar_receitas.html';
			echo HTMLMODELOP4;
			require __DIR__  .  '/medico/rodape.html';
			echo HTMLMODELOP5;
			require __DIR__  .  '/medico/modals.html';
			require __DIR__ . '/medico/scripts.html';
			require __DIR__ . '/medico/scripts_tables.html';
		}
		echo HTMLMODELOP6;
		break;
	case '/' . PASTAFRONT . '/medico/login':
		if (isset($_COOKIE['jwt_medico']) && $_COOKIE['jwt_medico'] != -1) {
			header('Location: ./inicio');
		} else {
			echo HTMLMODELOP1;
			echo "<title>ControlMED | Medico | Login</title>";
			require __DIR__ . '/medico/head.html';
			echo "</head><body class='bg-gradient-primary'>";
			require __DIR__  . '/medico/login.html';
			require __DIR__  . '/medico/scripts.html';
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/medico/cadastrar':
		if (isset($_COOKIE['jwt_medico']) && $_COOKIE['jwt_medico'] != -1) {
			header('Location: ./inicio');
		} else {
			echo HTMLMODELOP1;
			echo "<title>ControlMED | Medico | Cadastrar</title>";
			require __DIR__ . '/medico/head.html';
			echo "</head><body class='bg-gradient-primary'>";
			require __DIR__  . '/medico/cadastro.html';
			require __DIR__  . '\\medico\\modals.html';
			require __DIR__  . '/medico/scripts.html';
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/farmacia/inicio':
		$data = VeridicarCookie($_COOKIE['jwt_farmarcia']);
		if ($data == "Token invalido") {
			header('Location: ./login');
		} else {
			$nome = "cnpj";
			$valor = $data->cnpj;
			$expira = time() + 3600;
			setcookie($nome, $valor, $expira);

			echo HTMLMODELOP1;
			echo "<title>ControlMED | Farmacia | Inicio</title>";
			require __DIR__ . '/farmacia/head.html';
			echo HTMLMODELOP2;
			require __DIR__  . '/farmacia/menu.html';
			echo HTMLMODELOP3;
			require __DIR__ . '/farmacia/cabecalho.html';
			require __DIR__  . '/farmacia/inicio.html';
			echo HTMLMODELOP4;
			require __DIR__  . '/farmacia/rodape.html';
			echo HTMLMODELOP5;
			require __DIR__  . '\\farmacia\\modals.html';
			require __DIR__  . '\\farmacia\\scripts.html';
			echo query_nome($data->nome);
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/farmacia/procurar_receita':
		$data = VeridicarCookie($_COOKIE['jwt_farmarcia']);
		if ($data == "Token invalido") {
			header('Location: ./login');
		} else {
			$nome = "cnpj";
			$valor = $data->cnpj;
			$expira = time() + 3600;
			setcookie($nome, $valor, $expira);

			echo HTMLMODELOP1;
			echo "<title>ControlMED | Farmacia | Procurar</title>";
			require __DIR__ . '/farmacia/head.html';
			echo "<link href='../vendor/datatables/dataTables.bootstrap4.min.css' rel='stylesheet'>";
			echo HTMLMODELOP2;
			require __DIR__  . '/farmacia/menu.html';
			echo HTMLMODELOP3;
			require __DIR__ . '/farmacia/cabecalho.html';
			require __DIR__  . '/farmacia/procurar_receita.html';
			echo HTMLMODELOP4;
			require __DIR__  . '/farmacia/rodape.html';
			echo HTMLMODELOP5;
			require __DIR__  . '\\farmacia\\modals.html';
			require __DIR__  . '\\farmacia\\scripts.html';
			require __DIR__ . '/medico/scripts_tables.html';
			echo query_nome($data->nome);
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/farmacia/receitas':
		$data = VeridicarCookie($_COOKIE['jwt_farmarcia']);
		if ($data == "Token invalido") {
			header('Location: ./login');
		} else {
			$nome = "cnpj";
			$valor = $data->cnpj;
			$expira = time() + 3600;
			setcookie($nome, $valor, $expira);

			echo HTMLMODELOP1;
			echo "<title>ControlMED | Farmacia | Procurar</title>";
			require __DIR__ . '/farmacia/head.html';
			echo "<link href='../vendor/datatables/dataTables.bootstrap4.min.css' rel='stylesheet'>";
			echo HTMLMODELOP2;
			require __DIR__  . '/farmacia/menu.html';
			echo HTMLMODELOP3;
			require __DIR__ . '/farmacia/cabecalho.html';
			require __DIR__  . '/farmacia/receitas.html';
			echo HTMLMODELOP4;
			require __DIR__  . '/farmacia/rodape.html';
			echo HTMLMODELOP5;
			require __DIR__  . '\\farmacia\\modals.html';
			require __DIR__  . '\\farmacia\\scripts.html';
			require __DIR__ . '/medico/scripts_tables.html';
			echo query_nome($data->nome);
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/farmacia/cadastrar':
		if (isset($_COOKIE['jwt_farmarcia']) && $_COOKIE['jwt_farmarcia'] != -1) {
			header('Location: ./inicio');
		} else {
			echo HTMLMODELOP1;
			echo "<title>ControlMED | Farmacia | Cadastrar</title>";
			require __DIR__ . '/farmacia/head.html';
			echo "</head><body class='bg-gradient-primary'>";
			require __DIR__  . '/farmacia/cadastro.html';
			require __DIR__  . '\\farmacia\\modals.html';
			require __DIR__  . '/farmacia/scripts.html';
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/farmacia/login':
		if (isset($_COOKIE['jwt_farmarcia']) && $_COOKIE['jwt_farmarcia'] != -1) {
			header('Location: ./inicio');
		} else {
			echo HTMLMODELOP1;
			echo "<title>ControlMED | Farmacia | Login</title>";
			require __DIR__ . '/farmacia/head.html';
			echo "</head><body class='bg-gradient-primary'>";
			require __DIR__  . '/farmacia/login.html';
			require __DIR__  . '\\farmacia\\modals.html';
			require __DIR__  . '/farmacia/scripts.html';
			echo HTMLMODELOP6;
		}
		break;
	case '/' . PASTAFRONT . '/':
		require __DIR__  . '/index.html';
		break;

	case '/' . PASTAFRONT . '/procurar_receita':
		require __DIR__  . '/pesquisar_cpf.html';
		break;

	default:
		echo HTMLMODELOP1;
		echo "<title>ControlMED | 404</title>";
		require __DIR__ . '/medico/head.html';
		echo "</head><body id='page-top'><div id='wrapper' style='height: 100%;position: absolute;width: 100%;'>";
		echo HTMLMODELOP3;
		require __DIR__  . '/404.html';
		echo HTMLMODELOP4;
		echo HTMLMODELOP4 . HTMLMODELOP4;
		require __DIR__ . '\\medico\\scripts.html';
		echo HTMLMODELOP6;
		break;
}
function VeridicarCookie($Cokie)
{
	$data = array(
		'jwt'      => $Cokie
	);
	if ($Cokie != null) {
		$options = array(
			'http' => array(
				'method'  => 'POST',
				'content' => json_encode($data),
				'header' =>  "Content-Type: application/json\r\n" .
					"Accept: application/json\r\n"
			)
		);
		$url = "http://localhost/ControlMED/api/validar";
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		$response = json_decode($result);
		if ($response->message == "Acesso_concedido.") {
			return $response->data;
		} else {
			return "Token invalido";
		}
	} else {
		return "Token invalido";
	}
}

function query_nome($nome)
{
	return "<script>var nome_user = document.getElementById('nome_user');nome_user.innerText='" . $nome . "';</script>";
}
