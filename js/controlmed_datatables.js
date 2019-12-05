// Call the dataTables jQuery plugin
$(document).ready(function () {
    if (document.querySelector('#medico_receitas')) {
        $('#medico_receitas').DataTable({
            "language": {
                "decimal": "",
                "emptyTable": "Sem receitas emitidas",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ receitas",
                "infoEmpty": "Mostrando 0 a 0 de 0 receitas",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Visualizar _MENU_ receitas",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar:",
                "zeroRecords": "No matching records found",
                "paginate": {
                    "first": "Primeira",
                    "last": "Ultima",
                    "next": "Proxima",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Classificar coluna crescente",
                    "sortDescending": ": Classificar coluna decrescente"
                }
            }
        });
    }
});

$(document).ready(function () {
    if (document.querySelector('#farmacia_receitas_cpf')) {
        $('#farmacia_receitas_cpf').DataTable({
            "language": {
                "decimal": "",
                "emptyTable": "Sem receitas emitidas",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ receitas",
                "infoEmpty": "Mostrando 0 a 0 de 0 receitas",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Visualizar _MENU_ receitas",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar:",
                "zeroRecords": "No matching records found",
                "paginate": {
                    "first": "Primeira",
                    "last": "Ultima",
                    "next": "Proxima",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Classificar coluna crescente",
                    "sortDescending": ": Classificar coluna decrescente"
                }
            }
        });
    }
});

$(document).ready(function () {
    if (document.querySelector('#receitas_fechadas')) {
        $('#receitas_fechadas').DataTable({
            "language": {
                "decimal": "",
                "emptyTable": "Sem receitas emitidas",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ receitas",
                "infoEmpty": "Mostrando 0 a 0 de 0 receitas",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Visualizar _MENU_ receitas",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar:",
                "zeroRecords": "No matching records found",
                "paginate": {
                    "first": "Primeira",
                    "last": "Ultima",
                    "next": "Proxima",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Classificar coluna crescente",
                    "sortDescending": ": Classificar coluna decrescente"
                }
            }
        });
    }
});