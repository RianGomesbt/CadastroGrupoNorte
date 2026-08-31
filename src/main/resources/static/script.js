document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================

    const API_URL = "http://localhost:8080/api/colaboradores";

    const form = document.getElementById("cadastroForm");
    const btnSalvar = document.getElementById("btnSalvar");
    const btnLimpar = document.getElementById("btnLimpar");
    const btnImprimir = document.getElementById("btnImprimir");
    const btnAdicionarVeiculo =
        document.getElementById("btnAdicionarVeiculo");

    const veiculosContainer =
        document.getElementById("veiculosContainer");


    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================

    inicializarVeiculos();


    // ============================================================
    // ADICIONAR VEÍCULO
    // ============================================================

    if (btnAdicionarVeiculo) {

        btnAdicionarVeiculo.addEventListener("click", function () {

            adicionarVeiculo();

        });

    }


    // ============================================================
    // LIMPAR FORMULÁRIO
    // ============================================================

    if (btnLimpar) {

        btnLimpar.addEventListener("click", function () {

            const confirmar = confirm(
                "Deseja realmente limpar todos os dados do cadastro?"
            );

            if (!confirmar) {
                return;
            }

            form.reset();


            // Remove veículos extras
            const veiculos =
                veiculosContainer.querySelectorAll(".veiculo-card");

            veiculos.forEach(function (veiculo, index) {

                if (index > 0) {
                    veiculo.remove();
                }

            });


            atualizarNumeracaoVeiculos();

            inicializarVeiculos();


            console.log("Formulário limpo.");

        });

    }


    // ============================================================
    // IMPRIMIR
    // ============================================================

    if (btnImprimir) {

        btnImprimir.addEventListener("click", function () {

            window.print();

        });

    }


    // ============================================================
    // INICIALIZAR VEÍCULOS
    // ============================================================

    function inicializarVeiculos() {

        const cards =
            veiculosContainer.querySelectorAll(".veiculo-card");


        cards.forEach(function (card) {

            const select =
                card.querySelector(".tipoVeiculo");


            if (!select) {
                return;
            }


            // Atualiza visual
            atualizarTipoVeiculo(card);


            // Evita adicionar o evento duas vezes
            if (select.dataset.eventoConfigurado === "true") {
                return;
            }


            select.addEventListener("change", function () {

                atualizarTipoVeiculo(card);

            });


            select.dataset.eventoConfigurado = "true";

        });

    }


    // ============================================================
    // MOSTRAR CAMPOS TERRESTRE / FLUVIAL
    // ============================================================

    function atualizarTipoVeiculo(card) {

        const select =
            card.querySelector(".tipoVeiculo");

        const camposTerrestre =
            card.querySelector(".camposTerrestre");

        const camposFluvial =
            card.querySelector(".camposFluvial");


        if (!select) {
            return;
        }


        if (select.value === "fluvial") {

            if (camposTerrestre) {
                camposTerrestre.style.display = "none";
            }

            if (camposFluvial) {
                camposFluvial.style.display = "block";
            }

        } else {

            if (camposTerrestre) {
                camposTerrestre.style.display = "block";
            }

            if (camposFluvial) {
                camposFluvial.style.display = "none";
            }

        }

    }


    // ============================================================
    // ADICIONAR NOVO VEÍCULO
    // ============================================================

    function adicionarVeiculo() {

        const quantidade =
            veiculosContainer.querySelectorAll(".veiculo-card").length;

        const numero =
            quantidade + 1;


        const card =
            document.createElement("div");

        card.className = "veiculo-card";


        card.innerHTML = `

            <div class="veiculo-card-title">

                <h3>Veículo ${numero}</h3>

                <button
                    type="button"
                    class="btn-remover-veiculo">

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


            <!-- TERRESTRE -->

            <div class="camposTerrestre">

                <div class="row">

                    <div class="field">

                        <label>MODELO (Terrestre)</label>

                        <input
                            type="text"
                            class="modeloTerrestre"
                            placeholder="Ex: Ônibus, Van">

                    </div>


                    <div class="field">

                        <label>PLACA</label>

                        <input
                            type="text"
                            class="placa"
                            placeholder="AAA-0000">

                    </div>


                    <div class="field">

                        <label>RENAVAN</label>

                        <input
                            type="text"
                            class="renavan"
                            placeholder="Número RENAVAN">

                    </div>


                    <div class="field">

                        <label>CPF/CNPJ</label>

                        <input
                            type="text"
                            class="cpfCnpjVeiculo"
                            placeholder="CPF ou CNPJ prop.">

                    </div>

                </div>

            </div>


            <!-- FLUVIAL -->

            <div
                class="camposFluvial"
                style="display: none;">

                <div class="vehicle-detail">

                    <div class="row">

                        <div class="field">

                            <label>MODELO (Embarcação)</label>

                            <input
                                type="text"
                                class="modeloFluvial"
                                placeholder="Modelo do barco">

                        </div>


                        <div class="field">

                            <label>NOME DA EMBARCAÇÃO</label>

                            <input
                                type="text"
                                class="nomeEmbarcacao"
                                placeholder="Nome da embarcação">

                        </div>


                        <div class="field">

                            <label>Nº INSC</label>

                            <input
                                type="text"
                                class="numInsc"
                                placeholder="Inscrição da embarcação">

                        </div>


                        <div class="field">

                            <label>VALIDADE</label>

                            <input
                                type="text"
                                class="validadeEmbarcacao"
                                placeholder="DD/MM/AAAA"
                                maxlength="10">

                        </div>

                    </div>

                </div>

            </div>

        `;


        veiculosContainer.appendChild(card);


        // Botão remover
        const btnRemover =
            card.querySelector(".btn-remover-veiculo");


        if (btnRemover) {

            btnRemover.addEventListener("click", function () {

                card.remove();

                atualizarNumeracaoVeiculos();

            });

        }


        inicializarVeiculos();

    }


    // ============================================================
    // NUMERAÇÃO DOS VEÍCULOS
    // ============================================================

    function atualizarNumeracaoVeiculos() {

        const cards =
            veiculosContainer.querySelectorAll(".veiculo-card");


        cards.forEach(function (card, index) {

            const titulo =
                card.querySelector("h3");


            if (titulo) {

                titulo.textContent =
                    "Veículo " + (index + 1);

            }

        });

    }


    // ============================================================
    // PEGAR VALOR DE UM INPUT
    // ============================================================

    function pegarValor(id) {

        const elemento =
            document.getElementById(id);


        if (!elemento) {
            return "";
        }


        return elemento.value.trim();

    }


    // ============================================================
    // PEGAR RADIO
    // ============================================================

    function pegarRadio(name) {

        const selecionado =
            document.querySelector(
                'input[name="' + name + '"]:checked'
            );


        if (!selecionado) {
            return null;
        }


        return selecionado.value;

    }


    // ============================================================
    // PEGAR CHECKBOX
    // ============================================================

    function pegarCheckbox(id) {

        const elemento =
            document.getElementById(id);


        if (!elemento) {
            return false;
        }


        return elemento.checked;

    }


    // ============================================================
    // COLETAR VEÍCULOS
    // ============================================================

    function coletarVeiculos() {

        const lista = [];


        const cards =
            veiculosContainer.querySelectorAll(".veiculo-card");


        cards.forEach(function (card) {

            const tipo =
                card.querySelector(".tipoVeiculo")?.value
                || "terrestre";


            const veiculo = {

                tipoVeiculo:
                    tipo.toUpperCase(),

                modeloVeiculo: "",

                placa: "",

                renavam: "",

                cpfCnpjProprietario: "",

                nomeEmbarcacao: "",

                numInsc: "",

                validadeEmbarcacao: ""

            };


            // ==================================================
            // TERRESTRE
            // ==================================================

            if (tipo === "terrestre") {

                veiculo.modeloVeiculo =
                    card.querySelector(
                        ".modeloTerrestre"
                    )?.value.trim() || "";


                veiculo.placa =
                    card.querySelector(
                        ".placa"
                    )?.value.trim() || "";


                veiculo.renavam =
                    card.querySelector(
                        ".renavan"
                    )?.value.trim() || "";


                veiculo.cpfCnpjProprietario =
                    card.querySelector(
                        ".cpfCnpjVeiculo"
                    )?.value.trim() || "";

            }


            // ==================================================
            // FLUVIAL
            // ==================================================

            if (tipo === "fluvial") {

                veiculo.modeloVeiculo =
                    card.querySelector(
                        ".modeloFluvial"
                    )?.value.trim() || "";


                veiculo.nomeEmbarcacao =
                    card.querySelector(
                        ".nomeEmbarcacao"
                    )?.value.trim() || "";


                veiculo.numInsc =
                    card.querySelector(
                        ".numInsc"
                    )?.value.trim() || "";


                veiculo.validadeEmbarcacao =
                    card.querySelector(
                        ".validadeEmbarcacao"
                    )?.value.trim() || "";

            }


            lista.push(veiculo);

        });


        return lista;

    }


    // ============================================================
    // MONTAR OBJETO COLABORADOR
    // ============================================================

    function montarColaborador() {

        const colaborador = {

            // ==================================================
            // 1. DADOS DO COLABORADOR
            // ==================================================

            nomeCompleto:
                pegarValor("nomeCompleto"),

            apelido:
                pegarValor("apelido"),

            endereco:
                pegarValor("endereco"),

            cpf:
                pegarValor("cpf"),

            rg:
                pegarValor("rg"),

            nisPis:
                pegarValor("nis"),

            numeroCirCnh:
                pegarValor("cnh"),

            validadeCnh:
                pegarValor("validadeCnh"),

            numeroContato:
                pegarValor("contato"),

            email:
                pegarValor("email"),


            // ==================================================
            // 2. VEÍCULOS
            // ==================================================

            veiculos:
                coletarVeiculos(),


            // ==================================================
            // 3. ROTA
            // ==================================================

            escola:
                pegarValor("escola"),

            detalhamentoRota:
                pegarValor("detalheRota"),

            manhaIda:
                pegarValor("manhaIda"),

            manhaVolta:
                pegarValor("manhaVolta"),

            tardeIda:
                pegarValor("tardeIda"),

            tardeVolta:
                pegarValor("tardeVolta"),

            noiteIda:
                pegarValor("noiteIda"),

            noiteVolta:
                pegarValor("noiteVolta"),

            integralIda:
                pegarValor("integralIda"),

            integralVolta:
                pegarValor("integralVolta"),


            // ==================================================
            // 4. DADOS BANCÁRIOS
            // ==================================================

            banco:
                pegarValor("banco"),

            agencia:
                pegarValor("agencia"),

            numeroConta:
                pegarValor("numeroConta"),

            tipoConta:
                pegarRadio("tipoConta"),

            tipoChavePix:
                pegarRadio("tipoPix"),

            chavePix:
                pegarValor("chavePix"),


            // ==================================================
            // 5. CHECKLIST
            // ==================================================

            entregaRg:
                pegarCheckbox("checkRG"),

            entregaCpf:
                pegarCheckbox("checkCPF"),

            entregaCnhCir:
                pegarCheckbox("checkCNH"),

            entregaClrv:
                pegarCheckbox("checkCLRV"),

            entregaDocumentacaoBarco:
                pegarCheckbox("checkDocBarco"),

            entregaCartaoBanco:
                pegarCheckbox("checkCartaoBanco"),

            entregaComprovanteResidencia:
                pegarCheckbox("checkComprovanteRes"),


            // ==================================================
            // 6. OBSERVAÇÕES
            // ==================================================

            observacoes:
                pegarValor("observacoes")

        };


        return colaborador;

    }


    // ============================================================
    // VALIDAR FORMULÁRIO
    // ============================================================

    function validarFormulario() {

        // --------------------------------------------------------
        // NOME
        // --------------------------------------------------------

        const nome =
            pegarValor("nomeCompleto");


        if (!nome) {

            alert(
                "Digite o nome completo do colaborador."
            );


            document
                .getElementById("nomeCompleto")
                .focus();


            return false;

        }


        // --------------------------------------------------------
        // CPF
        // --------------------------------------------------------

        const cpf =
            pegarValor("cpf");


        if (!cpf) {

            alert(
                "Digite o CPF do colaborador."
            );


            document
                .getElementById("cpf")
                .focus();


            return false;

        }


        // --------------------------------------------------------
        // VALIDADE CNH
        // --------------------------------------------------------

        const validadeCnh =
            pegarValor("validadeCnh");


        if (!validadeCnh) {

            alert(
                "Informe a validade da CNH."
            );


            document
                .getElementById("validadeCnh")
                .focus();


            return false;

        }


        // --------------------------------------------------------
        // TELEFONE
        // --------------------------------------------------------

        const contato =
            pegarValor("contato");


        if (contato) {

            const telefoneRegex =
                /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;


            if (!telefoneRegex.test(contato)) {

                alert(
                    "Telefone inválido.\n\n" +
                    "Use o formato:\n" +
                    "(91) 99999-9999"
                );


                document
                    .getElementById("contato")
                    .focus();


                return false;

            }

        }


        // --------------------------------------------------------
        // E-MAIL
        // --------------------------------------------------------

        const email =
            pegarValor("email");


        if (email) {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailRegex.test(email)) {

                alert(
                    "Digite um e-mail válido."
                );


                document
                    .getElementById("email")
                    .focus();


                return false;

            }

        }


        return true;

    }


    // ============================================================
    // ENVIAR CADASTRO
    // ============================================================

    window.enviarCadastro = async function () {

        console.log("");
        console.log("======================================");
        console.log(" INICIANDO SALVAMENTO DO CADASTRO");
        console.log("======================================");


        // --------------------------------------------------------
        // VALIDAÇÃO
        // --------------------------------------------------------

        if (!validarFormulario()) {
            return;
        }


        // --------------------------------------------------------
        // MONTAR OBJETO
        // --------------------------------------------------------

        const colaborador =
            montarColaborador();


        // --------------------------------------------------------
        // MOSTRAR JSON NO CONSOLE
        // --------------------------------------------------------

        console.log(
            "JSON enviado para o backend:"
        );


        console.log(
            JSON.stringify(
                colaborador,
                null,
                2
            )
        );


        // --------------------------------------------------------
        // DESABILITAR BOTÃO
        // --------------------------------------------------------

        btnSalvar.disabled = true;


        const span =
            btnSalvar.querySelector("span");


        const textoOriginal =
            span ? span.textContent : "Salvar Cadastro";


        if (span) {
            span.textContent = "Salvando...";
        }


        try {

            // ====================================================
            // ENVIAR PARA SPRING BOOT
            // ====================================================

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify(colaborador)

                    }
                );


            console.log(
                "Status HTTP:",
                response.status
            );


            // ====================================================
            // CADASTRO SALVO
            // ====================================================

            if (response.ok) {

                let resultado = null;


                const contentType =
                    response.headers.get(
                        "content-type"
                    );


                if (
                    contentType &&
                    contentType.includes(
                        "application/json"
                    )
                ) {

                    resultado =
                        await response.json();

                } else {

                    resultado =
                        await response.text();

                }


                console.log(
                    "Resposta do backend:"
                );


                console.log(resultado);


                alert(
                    "Cadastro salvo com sucesso!"
                );


                return;

            }


            // ====================================================
            // ERRO DO BACKEND
            // ====================================================

            let mensagemErro =
                "Erro desconhecido.";


            try {

                const contentType =
                    response.headers.get(
                        "content-type"
                    );


                if (
                    contentType &&
                    contentType.includes(
                        "application/json"
                    )
                ) {

                    const erro =
                        await response.json();


                    if (erro.message) {

                        mensagemErro =
                            erro.message;

                    } else if (erro.error) {

                        mensagemErro =
                            erro.error;

                    } else {

                        mensagemErro =
                            JSON.stringify(
                                erro
                            );

                    }

                } else {

                    mensagemErro =
                        await response.text();

                }

            } catch (e) {

                mensagemErro =
                    "Erro HTTP " +
                    response.status;

            }


            console.error(
                "Erro retornado pelo backend:"
            );


            console.error(
                mensagemErro
            );


            alert(
                "Não foi possível salvar o cadastro.\n\n" +
                "Status: " +
                response.status +
                "\n\n" +
                mensagemErro
            );

        } catch (error) {

            // ====================================================
            // ERRO DE CONEXÃO
            // ====================================================

            console.error(
                "Erro de conexão:"
            );


            console.error(error);


            alert(
                "Não foi possível conectar ao servidor.\n\n" +
                "Verifique se o Spring Boot está rodando em:\n\n" +
                "http://localhost:8080"
            );

        } finally {

            // ====================================================
            // RESTAURAR BOTÃO
            // ====================================================

            btnSalvar.disabled = false;


            if (span) {
                span.textContent = textoOriginal;
            }

        }

    };


    // ============================================================
    // FUNÇÃO DE TESTE
    // ============================================================
    //
    // No console do navegador você pode executar:
    //
    // verCadastro()
    //
    // para visualizar o JSON antes de enviar.
    //

    window.verCadastro = function () {

        const dados =
            montarColaborador();


        console.log(
            "======================================"
        );


        console.log(
            "JSON DO CADASTRO"
        );


        console.log(
            "======================================"
        );


        console.log(
            JSON.stringify(
                dados,
                null,
                2
            )
        );


        return dados;

    };


});
const contato = document.getElementById("contato");

contato.addEventListener("input", function () {
    let valor = contato.value.replace(/\D/g, "");

    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }

    if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    }

    contato.value = valor;
});