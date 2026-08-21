// ============================================================
// GRUPO NORTE - CADASTRO DE COLABORADOR
// JavaScript principal
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // ELEMENTOS PRINCIPAIS
    // ========================================================

    const form = document.getElementById("cadastroForm");
    const btnAdicionarVeiculo = document.getElementById("btnAdicionarVeiculo");
    const btnLimpar = document.getElementById("btnLimpar");
    const btnImprimir = document.getElementById("btnImprimir");
    const btnSalvar = document.getElementById("btnSalvar");
    const veiculosContainer = document.getElementById("veiculosContainer");

    let contadorVeiculos = 1;


    // ========================================================
    // DATA ATUAL
    // ========================================================

    function obterDataAtual() {
        const hoje = new Date();

        const dia = String(hoje.getDate()).padStart(2, "0");
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const ano = hoje.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    const campoData = document.getElementById("editData");

    if (campoData && !campoData.value) {
        campoData.value = obterDataAtual();
    }


    // ========================================================
    // MÁSCARA DE DATA
    // ========================================================

    function aplicarMascaraData(input) {

        input.addEventListener("input", () => {

            let valor = input.value.replace(/\D/g, "");

            if (valor.length > 8) {
                valor = valor.substring(0, 8);
            }

            if (valor.length >= 5) {
                valor =
                    valor.substring(0, 2) +
                    "/" +
                    valor.substring(2, 4) +
                    "/" +
                    valor.substring(4);
            } else if (valor.length >= 3) {
                valor =
                    valor.substring(0, 2) +
                    "/" +
                    valor.substring(2);
            }

            input.value = valor;
        });
    }

    aplicarMascaraData(document.getElementById("editData"));
    aplicarMascaraData(document.querySelector(".validadeEmbarcacao"));


    // ========================================================
    // MÁSCARA CPF
    // ========================================================

    function aplicarMascaraCPF(input) {

        input.addEventListener("input", () => {

            let valor = input.value.replace(/\D/g, "");

            valor = valor.substring(0, 11);

            if (valor.length > 9) {

                valor =
                    valor.substring(0, 3) +
                    "." +
                    valor.substring(3, 6) +
                    "." +
                    valor.substring(6, 9) +
                    "-" +
                    valor.substring(9);

            } else if (valor.length > 6) {

                valor =
                    valor.substring(0, 3) +
                    "." +
                    valor.substring(3, 6) +
                    "." +
                    valor.substring(6);

            } else if (valor.length > 3) {

                valor =
                    valor.substring(0, 3) +
                    "." +
                    valor.substring(3);
            }

            input.value = valor;
        });
    }

    const cpf = document.getElementById("cpf");

    if (cpf) {
        aplicarMascaraCPF(cpf);
    }


    // ========================================================
    // MÁSCARA TELEFONE
    // ========================================================

    function aplicarMascaraTelefone(input) {

        input.addEventListener("input", () => {

            let valor = input.value.replace(/\D/g, "");

            valor = valor.substring(0, 11);

            if (valor.length > 10) {

                valor =
                    "(" +
                    valor.substring(0, 2) +
                    ") " +
                    valor.substring(2, 7) +
                    "-" +
                    valor.substring(7);

            } else if (valor.length > 6) {

                valor =
                    "(" +
                    valor.substring(0, 2) +
                    ") " +
                    valor.substring(2, 6) +
                    "-" +
                    valor.substring(6);

            } else if (valor.length > 2) {

                valor =
                    "(" +
                    valor.substring(0, 2) +
                    ") " +
                    valor.substring(2);

            } else if (valor.length > 0) {

                valor = "(" + valor;
            }

            input.value = valor;
        });
    }

    const contato = document.getElementById("contato");

    if (contato) {
        aplicarMascaraTelefone(contato);
    }


    // ========================================================
    // MÁSCARA DE PLACA
    // ========================================================

    function aplicarMascaraPlaca(input) {

        input.addEventListener("input", () => {

            let valor = input.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");

            valor = valor.substring(0, 7);

            if (valor.length > 3) {

                valor =
                    valor.substring(0, 3) +
                    "-" +
                    valor.substring(3);
            }

            input.value = valor;
        });
    }


    // ========================================================
    // MÁSCARA CPF/CNPJ DO VEÍCULO
    // ========================================================

    function aplicarMascaraCpfCnpj(input) {

        input.addEventListener("input", () => {

            let valor = input.value.replace(/\D/g, "");

            valor = valor.substring(0, 14);

            if (valor.length <= 11) {

                // CPF

                if (valor.length > 9) {

                    valor =
                        valor.substring(0, 3) +
                        "." +
                        valor.substring(3, 6) +
                        "." +
                        valor.substring(6, 9) +
                        "-" +
                        valor.substring(9);

                } else if (valor.length > 6) {

                    valor =
                        valor.substring(0, 3) +
                        "." +
                        valor.substring(3, 6) +
                        "." +
                        valor.substring(6);

                } else if (valor.length > 3) {

                    valor =
                        valor.substring(0, 3) +
                        "." +
                        valor.substring(3);
                }

            } else {

                // CNPJ

                valor =
                    valor.substring(0, 2) +
                    "." +
                    valor.substring(2, 5) +
                    "." +
                    valor.substring(5, 8) +
                    "/" +
                    valor.substring(8, 12) +
                    "-" +
                    valor.substring(12);
            }

            input.value = valor;
        });
    }


    // ========================================================
    // CONTROLE TERRESTRE / FLUVIAL
    // ========================================================

    function configurarTipoVeiculo(card) {

        const select = card.querySelector(".tipoVeiculo");
        const camposTerrestre = card.querySelector(".camposTerrestre");
        const camposFluvial = card.querySelector(".camposFluvial");

        function atualizarCampos() {

            if (select.value === "fluvial") {

                camposTerrestre.style.display = "none";
                camposFluvial.style.display = "block";

            } else {

                camposTerrestre.style.display = "block";
                camposFluvial.style.display = "none";
            }
        }

        select.addEventListener("change", atualizarCampos);

        atualizarCampos();
    }


    // ========================================================
    // CONFIGURAR CAMPOS DE UM VEÍCULO
    // ========================================================

    function configurarVeiculo(card) {

        configurarTipoVeiculo(card);

        // Placa
        const placa = card.querySelector(".placa");

        if (placa) {
            aplicarMascaraPlaca(placa);
        }

        // CPF/CNPJ
        const cpfCnpj = card.querySelector(".cpfCnpjVeiculo");

        if (cpfCnpj) {
            aplicarMascaraCpfCnpj(cpfCnpj);
        }

        // Data da embarcação
        const validade = card.querySelector(".validadeEmbarcacao");

        if (validade) {
            aplicarMascaraData(validade);
        }
    }


    // Configura o primeiro veículo
    const primeiroVeiculo =
        veiculosContainer.querySelector(".veiculo-card");

    configurarVeiculo(primeiroVeiculo);


    // ========================================================
    // ADICIONAR NOVO VEÍCULO
    // ========================================================

    btnAdicionarVeiculo.addEventListener("click", () => {

        contadorVeiculos++;

        const novoVeiculo = document.createElement("div");

        novoVeiculo.classList.add("veiculo-card");

        novoVeiculo.innerHTML = `

            <div class="veiculo-card-title">

                <h3>Veículo ${contadorVeiculos}</h3>

                <button
                    type="button"
                    class="btn-remover-veiculo"
                    title="Remover veículo"
                >
                    <i class="fas fa-trash"></i>
                    Remover
                </button>

            </div>

            <div class="row">

                <div class="field">

                    <label>TIPO DE VEÍCULO</label>

                    <select class="tipoVeiculo">

                        <option value="terrestre">
                            TERRESTRE
                        </option>

                        <option value="fluvial">
                            FLUVIAL
                        </option>

                    </select>

                </div>

            </div>


            <!-- CAMPOS TERRESTRES -->

            <div class="camposTerrestre">

                <div class="row">

                    <div class="field">

                        <label>MODELO (Terrestre)</label>

                        <input
                            type="text"
                            class="modeloTerrestre"
                            placeholder="Ex: Ônibus, Van"
                        >

                    </div>

                    <div class="field">

                        <label>PLACA</label>

                        <input
                            type="text"
                            class="placa"
                            placeholder="AAA-0000"
                        >

                    </div>

                    <div class="field">

                        <label>RENAVAN</label>

                        <input
                            type="text"
                            class="renavan"
                            placeholder="Número RENAVAN"
                        >

                    </div>

                    <div class="field">

                        <label>CPF/CNPJ</label>

                        <input
                            type="text"
                            class="cpfCnpjVeiculo"
                            placeholder="CPF ou CNPJ prop."
                        >

                    </div>

                </div>

            </div>


            <!-- CAMPOS FLUVIAIS -->

            <div
                class="camposFluvial"
                style="display: none;"
            >

                <div class="vehicle-detail">

                    <div class="row">

                        <div class="field">

                            <label>MODELO (Embarcação)</label>

                            <input
                                type="text"
                                class="modeloFluvial"
                                placeholder="Modelo do barco"
                            >

                        </div>

                        <div class="field">

                            <label>NOME DA EMBARCAÇÃO</label>

                            <input
                                type="text"
                                class="nomeEmbarcacao"
                                placeholder="Nome da embarcação"
                            >

                        </div>

                        <div class="field">

                            <label>Nº INSC</label>

                            <input
                                type="text"
                                class="numInsc"
                                placeholder="Inscrição da embarcação"
                            >

                        </div>

                        <div class="field">

                            <label>VALIDADE</label>

                            <input
                                type="text"
                                class="validadeEmbarcacao"
                                placeholder="DD/MM/AAAA"
                                maxlength="10"
                            >

                        </div>

                    </div>

                </div>

            </div>
        `;


        veiculosContainer.appendChild(novoVeiculo);


        // Configura os eventos e máscaras do novo veículo
        configurarVeiculo(novoVeiculo);


        // Configura botão remover
        const btnRemover =
            novoVeiculo.querySelector(".btn-remover-veiculo");

        btnRemover.addEventListener("click", () => {

            novoVeiculo.remove();

            atualizarNumeracaoVeiculos();

        });

    });


    // ========================================================
    // ATUALIZAR NUMERAÇÃO DOS VEÍCULOS
    // ========================================================

    function atualizarNumeracaoVeiculos() {

        const veiculos =
            veiculosContainer.querySelectorAll(".veiculo-card");

        veiculos.forEach((veiculo, index) => {

            const titulo =
                veiculo.querySelector("h3");

            titulo.textContent = `Veículo ${index + 1}`;
        });

        contadorVeiculos = veiculos.length;
    }


    // ========================================================
    // LIMPAR FORMULÁRIO
    // ========================================================

    btnLimpar.addEventListener("click", () => {

        const confirmar =
            confirm("Deseja realmente limpar todo o formulário?");

        if (!confirmar) {
            return;
        }

        form.reset();


        // Remove todos os veículos adicionais
        const veiculos =
            veiculosContainer.querySelectorAll(".veiculo-card");

        veiculos.forEach((veiculo, index) => {

            if (index > 0) {
                veiculo.remove();
            }

        });


        contadorVeiculos = 1;


        // Volta o primeiro veículo para terrestre
        const primeiro =
            veiculosContainer.querySelector(".veiculo-card");

        const select =
            primeiro.querySelector(".tipoVeiculo");

        select.value = "terrestre";


        const terrestre =
            primeiro.querySelector(".camposTerrestre");

        const fluvial =
            primeiro.querySelector(".camposFluvial");

        terrestre.style.display = "block";
        fluvial.style.display = "none";


        // Coloca a data atual novamente
        campoData.value = obterDataAtual();
    });


    // ========================================================
    // IMPRIMIR
    // ========================================================

    btnImprimir.addEventListener("click", () => {

        window.print();

    });


    // ========================================================
    // COLETAR VEÍCULOS
    // ========================================================

    function coletarVeiculos() {

        const veiculos = [];

        const cards = veiculosContainer.querySelectorAll(".veiculo-card");

        cards.forEach((card) => {

            const tipo = card.querySelector(".tipoVeiculo").value;

            const veiculo = {
                tipoVeiculo: tipo.toUpperCase()
            };


            // ==========================================
            // VEÍCULO TERRESTRE
            // ==========================================

            if (tipo === "terrestre") {

                veiculo.modeloVeiculo =
                    card.querySelector(".modeloTerrestre").value;

                veiculo.placa =
                    card.querySelector(".placa").value;

                veiculo.renavam =
                    card.querySelector(".renavan").value;

                veiculo.cpfCnpjProprietario =
                    card.querySelector(".cpfCnpjVeiculo").value;
            }


            // ==========================================
            // VEÍCULO FLUVIAL
            // ==========================================

            if (tipo === "fluvial") {

                veiculo.modeloVeiculo =
                    card.querySelector(".modeloFluvial").value;

                veiculo.nomeEmbarcacao =
                    card.querySelector(".nomeEmbarcacao").value;

                veiculo.numInsc =
                    card.querySelector(".numInsc").value;

                veiculo.validadeEmbarcacao =
                    card.querySelector(".validadeEmbarcacao").value;
            }


            veiculos.push(veiculo);
        });

        return veiculos;
    }


    // ========================================================
    // COLETAR DADOS DO FORMULÁRIO
    // ========================================================

    function coletarDados() {

        const tipoConta =
            document.querySelector('input[name="tipoConta"]:checked');

        const tipoPix =
            document.querySelector('input[name="tipoPix"]:checked');


        return {

            // ==========================================
            // DADOS DO COLABORADOR
            // ==========================================

            nomeCompleto:
            document.getElementById("nomeCompleto").value,

            apelido:
            document.getElementById("apelido").value,

            endereco:
            document.getElementById("endereco").value,

            cpf:
            document.getElementById("cpf").value,

            rg:
            document.getElementById("rg").value,

            nisPis:
            document.getElementById("nis").value,

            numeroCirCnh:
            document.getElementById("cnh").value,

            validadeCnh:
            document.getElementById("validadeCnh").value,

            numeroContato:
            document.getElementById("contato").value,

            email:
            document.getElementById("email").value,


            // ==========================================
            // VEÍCULOS
            // ==========================================

            veiculos: coletarVeiculos(),


            // ==========================================
            // ROTA
            // ==========================================

            escola:
            document.getElementById("escola").value,

            detalhamentoRota:
            document.getElementById("detalheRota").value,

            manhaIda:
            document.getElementById("manhaIda").value,

            manhaVolta:
            document.getElementById("manhaVolta").value,

            tardeIda:
            document.getElementById("tardeIda").value,

            tardeVolta:
            document.getElementById("tardeVolta").value,

            noiteIda:
            document.getElementById("noiteIda").value,

            noiteVolta:
            document.getElementById("noiteVolta").value,

            integralIda:
            document.getElementById("integralIda").value,

            integralVolta:
            document.getElementById("integralVolta").value,


            // ==========================================
            // DADOS BANCÁRIOS
            // ==========================================

            banco:
            document.getElementById("banco").value,

            agencia:
            document.getElementById("agencia").value,

            numeroConta:
            document.getElementById("numeroConta").value,

            tipoConta:
                tipoConta ? tipoConta.value.toUpperCase() : null,

            tipoChavePix:
                tipoPix ? tipoPix.value.toUpperCase() : null,

            chavePix:
            document.getElementById("chavePix").value,


            // ==========================================
            // CHECKLIST
            // ==========================================

            entregaRg:
            document.getElementById("checkRG").checked,

            entregaCpf:
            document.getElementById("checkCPF").checked,

            entregaCnhCir:
            document.getElementById("checkCNH").checked,

            entregaClrv:
            document.getElementById("checkCLRV").checked,

            entregaDocumentacaoBarco:
            document.getElementById("checkDocBarco").checked,

            entregaCartaoBanco:
            document.getElementById("checkCartaoBanco").checked,

            entregaComprovanteResidencia:
            document.getElementById("checkComprovanteRes").checked,


            // ==========================================
            // OBSERVAÇÕES
            // ==========================================

            observacoes:
            document.getElementById("observacoes").value
        };
    }


    // ========================================================
    // SALVAR CADASTRO
    // ========================================================

    btnSalvar.addEventListener("click", () => {

        enviarCadastro();

    });


    // ========================================================
    // ENVIAR CADASTRO
    // ========================================================

    window.enviarCadastro = function () {

        // Validação básica
        const nome =
            document.getElementById("nomeCompleto").value.trim();

        if (!nome) {

            alert("Digite o nome completo do colaborador.");

            document.getElementById("nomeCompleto").focus();

            return;
        }


        const validadeCnh =
            document.getElementById("validadeCnh").value;

        if (!validadeCnh) {

            alert("Informe a validade da CNH.");

            document.getElementById("validadeCnh").focus();

            return;
        }


        const dados = coletarDados();


        // Mostra os dados no console
        console.log("=================================");
        console.log("CADASTRO DO COLABORADOR");
        console.log("=================================");
        console.log(dados);

        async function enviarCadastro() {
            const colaborador = getColaboradorDTO();

            console.log("Enviando JSON para a API:", colaborador);

            try {
                const response = await fetch("http://localhost:8080/api/colaboradores", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(colaborador)
                });

                if (response.status === 201 || response.ok) {
                    const salvo = await response.json();
                    console.log("Registro persistido no MySQL:", salvo);
                    alert("Cadastro enviado e salvo com sucesso!");
                } else {
                    const erroMsg = await response.text();
                    console.error("Erro da API:", erroMsg);
                    alert("Erro ao cadastrar: " + erroMsg);
                }
            } catch (error) {
                console.error("Erro de conexão com o servidor:", error);
                alert("Não foi possível conectar com o backend.");
            }
        }
    };

});
