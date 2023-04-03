const estadosSelect = document.getElementById("estados");
const municipiosSelect = document.getElementById("municipios");

const API_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

// Função que cria as opções do select de estados
function popularEstados(estados) {
    for (const estado of estados) {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.sigla;
        estadosSelect.appendChild(option);
    }
}

// Função que cria as opções do select de municípios
function popularMunicipios(municipios) {
    // Limpa as opções do select de municípios
    municipiosSelect.innerHTML = "";
    // Adiciona as novas opções
    for (const municipio of municipios) {
        const option = document.createElement("option");
        option.value = municipio.nome;
        option.textContent = municipio.nome;
        municipiosSelect.appendChild(option);
    }
}

// Requisição GET para obter a lista de estados
fetch(`${API_URL}/estados`)
    .then(response => response.json())
    .then(estados => {
        // Preenche o select de estados com os dados obtidos da API
        popularEstados(estados);
    });

// Evento disparado quando o usuário seleciona um estado
estadosSelect.addEventListener("change", () => {
    const uf = estadosSelect.value; // Pega a sigla do estado selecionado

    // Requisição GET para obter a lista de municípios do estado selecionado
    fetch(`${API_URL}/estados/${uf}/municipios`)
        .then(response => response.json())
        .then(municipios => {
            // Preenche o select de municípios com os dados obtidos da API
            popularMunicipios(municipios);
        });
});
