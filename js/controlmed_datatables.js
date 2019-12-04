// Call the dataTables jQuery plugin
$(document).ready(function () {
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
});

