// JS
let estadoSigla = "";
let municipioNome = "";

// Inicializar o Select2 para os selects de estados e municípios
$('.select2').select2();

// Obter dados dos estados da API do IBGE
$.ajax({
  url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  dataType: 'json',
  success: function(data) {
    // Preencher o select de estados
    $.each(data, function(i, estado) {
      $('#estados').append($('<option>', {
        value: estado.sigla,
        text: estado.nome
      }));
    });
  }
});

// Quando um estado é selecionado, obter dados dos municípios correspondentes da API do IBGE
$('#estados').on('change', function() {
  estadoSigla = $(this).val();
  if (estadoSigla) {
    $.ajax({
      url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estadoSigla + '/municipios',
      dataType: 'json',
      success: function(data) {
        // Limpar o select de municípios e preencher com os dados obtidos
        $('#municipios').empty().append($('<option>', {
          value: '',
          text: 'Selecione um município'
        }));
        $.each(data, function(i, municipio) {
          $('#municipios').append($('<option>', {
            value: municipio.nome,
            text: municipio.nome,
            'data-nome': municipio.nome
          }));
        });
        // Atualizar o Select2 para o select de municípios com os novos dados
        $('#municipios').trigger('change.select2');
      }
    });
  }
});

// Quando um município é selecionado, atualizar a variável municipioNome com o valor selecionado
$('#municipios').on('change', function() {
  municipioNome = $(this).find(':selected').data('nome');
});
