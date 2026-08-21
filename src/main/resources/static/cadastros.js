// ========================================================
// CONFIGURAÇÃO
// ========================================================

const API_URL = "http://localhost:8080/api/colaboradores";

let colaboradores = [];


// ========================================================
// INICIALIZAÇÃO
// ========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Página de cadastros carregada.");

    carregarCadastros();

    document
        .getElementById("btnAtualizar")
        .addEventListener("click", carregarCadastros);

    document
        .getElementById("btnNovoCadastro")
        .addEventListener("click", function () {

            window.location.href = "index.html";

        });

    document
        .getElementById("campoBusca")
        .addEventListener("input", pesquisar);

    document
        .getElementById("fecharModal")
        .addEventListener("click", fecharModal);

});


// ========================================================
// CARREGAR CADASTROS
// ========================================================

async function carregarCadastros() {

    const status = document.getElementById("status");

    status.className = "status";
    status.textContent = "Carregando cadastros...";

    console.log("Buscando:", API_URL);

    try {

        const response = await fetch(API_URL);

        console.log("Status da API:", response.status);

        if (!response.ok) {

            const erro = await response.text();

            console.error("Erro retornado pela API:", erro);

            throw new Error(
                "Erro HTTP " +
                response.status +
                ": " +
                erro
            );
        }

        colaboradores = await response.json();

        console.log(
            "Colaboradores recebidos:",
            colaboradores
        );

        mostrarCadastros(colaboradores);

        status.className = "status sucesso";

        status.textContent =
            colaboradores.length +
            " cadastro(s) encontrado(s).";

    } catch (erro) {

        console.error(
            "ERRO AO CARREGAR CADASTROS:",
            erro
        );

        status.className = "status erro";

        status.innerHTML =
            "❌ Não foi possível carregar os cadastros.<br>" +
            "Verifique se o backend Spring Boot está rodando.<br><br>" +
            erro.message;
    }
}


// ========================================================
// MOSTRAR CADASTROS
// ========================================================

function mostrarCadastros(lista) {

    const tabela =
        document.getElementById("tabelaCadastros");

    tabela.innerHTML = "";

    if (!lista || lista.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="sem-registros">
                        <i class="fas fa-folder-open fa-2x"></i>

                        <p>
                            Nenhum cadastro encontrado.
                        </p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    lista.forEach(function (colaborador) {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                ${colaborador.id ?? "-"}
            </td>

            <td>
                <strong>
                    ${escaparHTML(
            colaborador.nomeCompleto ?? ""
        )}
                </strong>
            </td>

            <td>
                ${escaparHTML(
            colaborador.cpf ?? "-"
        )}
            </td>

            <td>
                ${escaparHTML(
            colaborador.numeroCirCnh ?? "-"
        )}
            </td>

            <td>
                ${formatarData(
            colaborador.validadeCnh
        )}
            </td>

            <td>
                ${escaparHTML(
            colaborador.numeroContato ?? "-"
        )}
            </td>

            <td>

                <button
                    class="btn-visualizar"
                    onclick="visualizarColaborador(${colaborador.id})">

                    <i class="fas fa-eye"></i>
                    Visualizar

                </button>

            </td>

        `;

        tabela.appendChild(linha);

    });
}


// ========================================================
// PESQUISA
// ========================================================

function pesquisar() {

    const texto =
        document
            .getElementById("campoBusca")
            .value
            .toLowerCase()
            .trim();


    if (!texto) {

        mostrarCadastros(colaboradores);

        return;
    }


    const resultado =
        colaboradores.filter(function (colaborador) {

            const nome =
                String(
                    colaborador.nomeCompleto ?? ""
                ).toLowerCase();

            const cpf =
                String(
                    colaborador.cpf ?? ""
                ).toLowerCase();

            return (
                nome.includes(texto) ||
                cpf.includes(texto)
            );

        });


    mostrarCadastros(resultado);

}


// ========================================================
// VISUALIZAR COLABORADOR
// ========================================================

function visualizarColaborador(id) {

    const colaborador =
        colaboradores.find(function (item) {

            return item.id === id;

        });


    if (!colaborador) {

        alert("Colaborador não encontrado.");

        return;
    }


    const container =
        document.getElementById(
            "detalhesColaborador"
        );


    let html = `

        <div class="detalhes-grid">

            <div class="detalhe">
                <strong>NOME COMPLETO</strong>
                ${escaparHTML(
        colaborador.nomeCompleto ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>APELIDO</strong>
                ${escaparHTML(
        colaborador.apelido ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>CPF</strong>
                ${escaparHTML(
        colaborador.cpf ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>RG</strong>
                ${escaparHTML(
        colaborador.rg ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>NIS/PIS</strong>
                ${escaparHTML(
        colaborador.nisPis ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>CNH/CIR</strong>
                ${escaparHTML(
        colaborador.numeroCirCnh ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>VALIDADE CNH</strong>
                ${formatarData(
        colaborador.validadeCnh
    )}
            </div>

            <div class="detalhe">
                <strong>CONTATO</strong>
                ${escaparHTML(
        colaborador.numeroContato ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>E-MAIL</strong>
                ${escaparHTML(
        colaborador.email ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>ENDEREÇO</strong>
                ${escaparHTML(
        colaborador.endereco ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>ESCOLA</strong>
                ${escaparHTML(
        colaborador.escola ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>BANCO</strong>
                ${escaparHTML(
        colaborador.banco ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>AGÊNCIA</strong>
                ${escaparHTML(
        colaborador.agencia ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>CONTA</strong>
                ${escaparHTML(
        colaborador.numeroConta ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>TIPO DE CONTA</strong>
                ${escaparHTML(
        colaborador.tipoConta ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>TIPO PIX</strong>
                ${escaparHTML(
        colaborador.tipoChavePix ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>CHAVE PIX</strong>
                ${escaparHTML(
        colaborador.chavePix ?? "-"
    )}
            </div>

        </div>

        <h3 style="margin-top:30px;">
            <i class="fas fa-truck"></i>
            Veículos
        </h3>

    `;


    // ====================================================
    // VEÍCULOS
    // ====================================================

    if (
        colaborador.veiculos &&
        colaborador.veiculos.length > 0
    ) {

        colaborador.veiculos.forEach(function (veiculo) {

            html += `

                <div class="veiculo">

                    <strong>
                        Tipo:
                    </strong>

                    ${escaparHTML(
                veiculo.tipoVeiculo ?? "-"
            )}

                    <br><br>

                    <strong>
                        Modelo:
                    </strong>

                    ${escaparHTML(
                veiculo.modeloVeiculo ?? "-"
            )}

                    <br><br>

                    <strong>
                        Placa:
                    </strong>

                    ${escaparHTML(
                veiculo.placa ?? "-"
            )}

                    <br><br>

                    <strong>
                        RENAVAM:
                    </strong>

                    ${escaparHTML(
                veiculo.renavam ?? "-"
            )}

                    <br><br>

                    <strong>
                        Proprietário:
                    </strong>

                    ${escaparHTML(
                veiculo.cpfCnpjProprietario ?? "-"
            )}

                    <br><br>

                    <strong>
                        Embarcação:
                    </strong>

                    ${escaparHTML(
                veiculo.nomeEmbarcacao ?? "-"
            )}

                    <br><br>

                    <strong>
                        Nº Inscrição:
                    </strong>

                    ${escaparHTML(
                veiculo.numInsc ?? "-"
            )}

                    <br><br>

                    <strong>
                        Validade:
                    </strong>

                    ${escaparHTML(
                veiculo.validadeEmbarcacao ?? "-"
            )}

                </div>

            `;

        });

    } else {

        html += `

            <p>
                Nenhum veículo cadastrado.
            </p>

        `;

    }


    // ====================================================
    // ROTA
    // ====================================================

    html += `

        <h3 style="margin-top:30px;">
            <i class="fas fa-route"></i>
            Informações da Rota
        </h3>

        <div class="detalhes-grid">

            <div class="detalhe">
                <strong>ESCOLA</strong>
                ${escaparHTML(
        colaborador.escola ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>ROTA</strong>
                ${escaparHTML(
        colaborador.detalhamentoRota ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>MANHÃ - IDA</strong>
                ${escaparHTML(
        colaborador.manhaIda ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>MANHÃ - VOLTA</strong>
                ${escaparHTML(
        colaborador.manhaVolta ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>TARDE - IDA</strong>
                ${escaparHTML(
        colaborador.tardeIda ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>TARDE - VOLTA</strong>
                ${escaparHTML(
        colaborador.tardeVolta ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>NOITE - IDA</strong>
                ${escaparHTML(
        colaborador.noiteIda ?? "-"
    )}
            </div>

            <div class="detalhe">
                <strong>NOITE - VOLTA</strong>
                ${escaparHTML(
        colaborador.noiteVolta ?? "-"
    )}
            </div>

        </div>

    `;


    // ====================================================
    // OBSERVAÇÕES
    // ====================================================

    html += `

        <h3 style="margin-top:30px;">
            <i class="fas fa-comment"></i>
            Observações
        </h3>

        <div class="detalhe">

            ${escaparHTML(
        colaborador.observacoes ?? "Nenhuma observação."
    )}

        </div>

    `;


    container.innerHTML = html;


    document.getElementById("modal").style.display =
        "block";
}


// ========================================================
// FECHAR MODAL
// ========================================================

function fecharModal() {

    document.getElementById("modal").style.display =
        "none";

}


// ========================================================
// FORMATAR DATA
// ========================================================

function formatarData(data) {

    if (!data) {
        return "-";
    }


    // Data recebida do Spring:
    // 2030-10-15

    if (
        typeof data === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(data)
    ) {

        const partes = data.split("-");

        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }


    return data;
}


// ========================================================
// PROTEÇÃO CONTRA HTML
// ========================================================

function escaparHTML(valor) {

    const div = document.createElement("div");

    div.textContent = valor;

    return div.innerHTML;
}


// ========================================================
// FECHAR MODAL CLICANDO FORA
// ========================================================

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("modal");

    if (event.target === modal) {

        fecharModal();

    }

});