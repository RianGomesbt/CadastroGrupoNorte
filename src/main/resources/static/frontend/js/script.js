    // Função para obter a data atual formatada (DD/MM/AAAA)
    function getDataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

    // Máscara para data no formato DD/MM/AAAA
    function applyDateMask(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
    value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
} else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
}
    input.value = value;
}

    // Máscara para o campo DATA do cabeçalho
    const editDataInput = document.getElementById('editData');
    if (editDataInput) {
    // Definir a data atual automaticamente ao carregar a página
    editDataInput.value = getDataAtual();

    editDataInput.addEventListener('input', function(e) {
    applyDateMask(this);
});
}
    const validadeEmbarcacaoInput = document.getElementById('validadeEmbarcacao');
    if (validadeEmbarcacaoInput) {
    validadeEmbarcacaoInput.addEventListener('input', function(e) { applyDateMask(this); });
}

    const tipoVeiculoSelect = document.getElementById('tipoVeiculo');
    const divTerrestre = document.getElementById('camposTerrestre');
    const divFluvial = document.getElementById('camposFluvial');

    function toggleVeiculoFields() {
    if (tipoVeiculoSelect.value === 'fluvial') {
    divTerrestre.style.display = 'none';
    divFluvial.style.display = 'block';
} else {
    divTerrestre.style.display = 'block';
    divFluvial.style.display = 'none';
}
}
    tipoVeiculoSelect.addEventListener('change', toggleVeiculoFields);
    toggleVeiculoFields();

    function showToast(message, isError = false) {
    const toast = document.getElementById('toastMsg');
    toast.textContent = isError ? '⚠️ ' + message : '✅ ' + message;
    toast.style.backgroundColor = isError ? '#9e2d2f' : '#1e4620';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

    function getFormData() {
    const municipioEditado = document.getElementById('editMunicipio').value.trim();
    const nomeMunicipio = municipioEditado === "" ? "TAILÂNDIA" : municipioEditado;

    const dataEditada = document.getElementById('editData').value.trim();
    const dataFicha = dataEditada === "" ? getDataAtual() : dataEditada;

    return {
    version: "1.0",
    tipoDocumento: "CADASTRO_COLABORADOR",
    municipio: nomeMunicipio,
    data: dataFicha,
    dataGeracao: new Date().toLocaleString(),
    condutor: {
    nome: document.getElementById('nomeCompleto').value,
    apelido: document.getElementById('apelido').value,
    endereco: document.getElementById('endereco').value,
    cpf: document.getElementById('cpf').value,
    rg: document.getElementById('rg').value,
    nis: document.getElementById('nis').value,
    cnh: document.getElementById('cnh').value,
    validadeCnh: document.getElementById('validadeCnh').value,
    contato: document.getElementById('contato').value,
    email: document.getElementById('email').value
},
    veiculo: {
    tipo: tipoVeiculoSelect.value,
    terrestre: tipoVeiculoSelect.value !== 'fluvial' ? {
    modelo: document.getElementById('modeloTerrestre').value,
    placa: document.getElementById('placa').value,
    renavan: document.getElementById('renavan').value,
    cpfCnpj: document.getElementById('cpfCnpjVeiculo').value
} : null,
    fluvial: tipoVeiculoSelect.value === 'fluvial' ? {
    modelo: document.getElementById('modeloFluvial').value,
    nomeEmbarcacao: document.getElementById('nomeEmbarcacao').value,
    numInsc: document.getElementById('numInsc').value,
    validade: document.getElementById('validadeEmbarcacao').value
} : null
},
    rota: {
    escola: document.getElementById('escola').value,
    turno: {
    manha: {
    ida: document.getElementById('manhaIda').value,
    volta: document.getElementById('manhaVolta').value
},
    tarde: {
    ida: document.getElementById('tardeIda').value,
    volta: document.getElementById('tardeVolta').value
},
    noite: {
    ida: document.getElementById('noiteIda').value,
    volta: document.getElementById('noiteVolta').value
},
    integral: {
    ida: document.getElementById('integralIda').value,
    volta: document.getElementById('integralVolta').value
}
},
    detalheRota: document.getElementById('detalheRota').value
},
    bancario: {
    banco: document.getElementById('banco').value,
    agencia: document.getElementById('agencia').value,
    numeroConta: document.getElementById('numeroConta').value,
    tipoConta: document.querySelector('input[name="tipoConta"]:checked')?.value || '',
    tipoPix: document.querySelector('input[name="tipoPix"]:checked')?.value || '',
    chavePix: document.getElementById('chavePix').value
},
    checklist: {
    rg: document.getElementById('checkRG').checked,
    cpf: document.getElementById('checkCPF').checked,
    cnh: document.getElementById('checkCNH').checked,
    clrv: document.getElementById('checkCLRV').checked,
    docBarco: document.getElementById('checkDocBarco').checked,
    cartaoBanco: document.getElementById('checkCartaoBanco').checked,
    comprovanteRes: document.getElementById('checkComprovanteRes').checked
},
    observacoes: document.getElementById('observacoes').value
};
}

    function preencherFormulario(data) {
    document.getElementById('editMunicipio').value = data.municipio || "";
    document.getElementById('editData').value = data.data || getDataAtual();
    document.getElementById('nomeCompleto').value = data.condutor?.nome || '';
    document.getElementById('apelido').value = data.condutor?.apelido || '';
    document.getElementById('endereco').value = data.condutor?.endereco || '';
    document.getElementById('cpf').value = data.condutor?.cpf || '';
    document.getElementById('rg').value = data.condutor?.rg || '';
    document.getElementById('nis').value = data.condutor?.nis || '';
    document.getElementById('cnh').value = data.condutor?.cnh || '';
    document.getElementById('validadeCnh').value = data.condutor?.validadeCnh || '';
    document.getElementById('contato').value = data.condutor?.contato || '';
    document.getElementById('email').value = data.condutor?.email || '';

    if (data.veiculo) {
    tipoVeiculoSelect.value = data.veiculo.tipo || 'terrestre';
    toggleVeiculoFields();
    if (data.veiculo.terrestre) {
    document.getElementById('modeloTerrestre').value = data.veiculo.terrestre.modelo || '';
    document.getElementById('placa').value = data.veiculo.terrestre.placa || '';
    document.getElementById('renavan').value = data.veiculo.terrestre.renavan || '';
    document.getElementById('cpfCnpjVeiculo').value = data.veiculo.terrestre.cpfCnpj || '';
}
    if (data.veiculo.fluvial) {
    document.getElementById('modeloFluvial').value = data.veiculo.fluvial.modelo || '';
    document.getElementById('nomeEmbarcacao').value = data.veiculo.fluvial.nomeEmbarcacao || '';
    document.getElementById('numInsc').value = data.veiculo.fluvial.numInsc || '';
    document.getElementById('validadeEmbarcacao').value = data.veiculo.fluvial.validade || '';
}
}

    document.getElementById('escola').value = data.rota?.escola || '';
    document.getElementById('manhaIda').value = data.rota?.turno?.manha?.ida || '';
    document.getElementById('manhaVolta').value = data.rota?.turno?.manha?.volta || '';
    document.getElementById('tardeIda').value = data.rota?.turno?.tarde?.ida || '';
    document.getElementById('tardeVolta').value = data.rota?.turno?.tarde?.volta || '';
    document.getElementById('noiteIda').value = data.rota?.turno?.noite?.ida || '';
    document.getElementById('noiteVolta').value = data.rota?.turno?.noite?.volta || '';
    document.getElementById('integralIda').value = data.rota?.turno?.integral?.ida || '';
    document.getElementById('integralVolta').value = data.rota?.turno?.integral?.volta || '';
    document.getElementById('detalheRota').value = data.rota?.detalheRota || '';
    document.getElementById('banco').value = data.bancario?.banco || '';
    document.getElementById('agencia').value = data.bancario?.agencia || '';
    document.getElementById('numeroConta').value = data.bancario?.numeroConta || '';
    if (data.bancario?.tipoConta) {
    const tipoContaRadio = document.querySelector(`input[name="tipoConta"][value="${data.bancario.tipoConta}"]`);
    if (tipoContaRadio) tipoContaRadio.checked = true;
}
    if (data.bancario?.tipoPix) {
    const tipoPixRadio = document.querySelector(`input[name="tipoPix"][value="${data.bancario.tipoPix}"]`);
    if (tipoPixRadio) tipoPixRadio.checked = true;
}
    document.getElementById('chavePix').value = data.bancario?.chavePix || '';

    if (data.checklist) {
    document.getElementById('checkRG').checked = data.checklist.rg || false;
    document.getElementById('checkCPF').checked = data.checklist.cpf || false;
    document.getElementById('checkCNH').checked = data.checklist.cnh || false;
    document.getElementById('checkCLRV').checked = data.checklist.clrv || false;
    document.getElementById('checkDocBarco').checked = data.checklist.docBarco || false;
    document.getElementById('checkCartaoBanco').checked = data.checklist.cartaoBanco || false;
    document.getElementById('checkComprovanteRes').checked = data.checklist.comprovanteRes || false;
}
    document.getElementById('observacoes').value = data.observacoes || '';
}

    async function salvarEmArquivoComPasta() {
    const nomeCondutor = document.getElementById('nomeCompleto').value.trim();
    if (!nomeCondutor) {
    showToast("Preencha o NOME COMPLETO antes de salvar!", true);
    return;
}
    const dados = getFormData();
    const jsonStr = JSON.stringify(dados, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const nomeArquivo = `cadastro_colaborador_${dados.condutor.nome.replace(/\s+/g, '_')}_${dados.municipio}.json`;

    if ('showDirectoryPicker' in window) {
    try {
    const directoryHandle = await window.showDirectoryPicker();
    const fileHandle = await directoryHandle.getFileHandle(nomeArquivo, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    showToast(`Arquivo salvo em: ${directoryHandle.name}/${nomeArquivo}`);
    return;
} catch (err) {
    if (err.name !== 'AbortError') {
    showToast('Erro ao salvar. Salvando na pasta Downloads...', true);
} else {
    return;
}
}
}
    saveAs(blob, nomeArquivo);
    showToast(`Arquivo salvo na pasta Downloads: ${nomeArquivo}`);
}

    const modal = document.getElementById('importModal');
    function abrirModalImportacao() { modal.style.display = 'block'; }
    function fecharModal() { modal.style.display = 'none'; document.getElementById('fileInput').value = ''; }

    function processarArquivo(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
    try {
    const dados = JSON.parse(e.target.result);
    if (dados.tipoDocumento === "CADASTRO_COLABORADOR" || dados.condutor) {
    preencherFormulario(dados);
    showToast(`Cadastro de ${dados.condutor?.nome || 'desconhecido'} importado!`);
    fecharModal();
} else {
    showToast("Arquivo inválido! Selecione um arquivo .json de cadastro.", true);
}
} catch (error) {
    showToast("Erro ao ler o arquivo. Verifique se é um JSON válido.", true);
}
};
    reader.readAsText(file);
}

    document.getElementById('fileInput').addEventListener('change', function(e) {
    if (this.files && this.files[0]) processarArquivo(this.files[0]);
});
    window.onclick = function(event) { if (event.target === modal) fecharModal(); };

    // IMPRIMIR - Versão otimizada para caber em UMA PÁGINA A4
    function imprimirFicha() {
    const nomeCondutor = document.getElementById('nomeCompleto').value.trim();
    if (!nomeCondutor) {
    showToast("Preencha o NOME COMPLETO antes de imprimir!", true);
    return;
}

    const data = getFormData();
    const tipoContaLabel = data.bancario.tipoConta === 'corrente' ? 'CORRENTE' : (data.bancario.tipoConta === 'poupanca' ? 'POUPANÇA' : '___________');
    const tipoPixLabel = { cpf: 'CPF', tel: 'TEL', email: 'EMAIL' }[data.bancario.tipoPix] || '';
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Cadastro Colaborador - ${data.condutor.nome}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: Arial, Helvetica, sans-serif; padding: 0.3cm; background: white; font-size: 9pt; line-height: 1.2; }
                    @media print { body { padding: 0.2cm; margin: 0; } .no-print { display: none; } @page { size: A4; margin: 0.5cm; } }
                    .print-container { max-width: 100%; margin: 0 auto; }
                    .header { text-align: center; margin-bottom: 0.2cm; padding-bottom: 0.15cm; border-bottom: 1.5px solid #003057; }
                    .header h1 { color: #003057; font-size: 14pt; margin-bottom: 0.1cm; }
                    .header .subtitle { font-size: 8pt; font-weight: bold; }
                    .header .ficha-title { font-size: 10pt; font-weight: bold; margin: 0.1cm 0; color: #0077b6; }
                    .info-municipio { text-align: center; margin: 0.2cm 0; font-size: 8pt; font-weight: bold; }
                    .section { margin-bottom: 0.2cm; page-break-inside: avoid; }
                    .section-title { background: #eef2fc; padding: 0.1cm 0.2cm; margin-bottom: 0.15cm; border-left: 3px solid #0077b6; font-size: 9pt; font-weight: bold; color: #003057; }
                    .row { display: flex; flex-wrap: wrap; margin-bottom: 0.1cm; }
                    .field-group { flex: 1; min-width: 140px; padding: 0 0.1cm; }
                    .label { font-weight: bold; font-size: 7pt; color: #4b6f8c; display: block; margin-bottom: 0.05cm; }
                    .value { font-size: 8pt; border-bottom: 0.5px dotted #ccc; padding: 0.05cm 0; min-height: 0.4cm; }
                    .full-width { flex: 1 1 100%; }
                    .checklist-print { display: flex; flex-wrap: wrap; gap: 0.3cm; margin: 0.1cm 0; }
                    .check-item-print { display: flex; align-items: center; gap: 0.1cm; font-size: 7.5pt; background: #f9f9fd; padding: 0.05cm 0.2cm; border-radius: 0.2cm; }
                    .assinatura-print { margin-top: 0.2cm; padding-top: 0.15cm; border-top: 0.5px solid #999; display: flex; justify-content: space-between; flex-wrap: wrap; font-size: 7.5pt; }
                    .footer { text-align: center; margin-top: 0.2cm; font-size: 6pt; color: #666; }
                    .no-print { text-align: center; margin-top: 0.3cm; }
                    button { padding: 0.2cm 0.4cm; margin: 0.1cm; cursor: pointer; background: #003057; color: white; border: none; border-radius: 0.2cm; font-size: 9pt; }
                    .compact-row { margin-bottom: 0.05cm; }
                    .turno-print-title { font-weight: bold; font-size: 7.5pt; color: #4b6f8c; margin: 0.15cm 0 0.12cm; text-transform: uppercase; }
                    .turno-print-grid { display: flex; flex-wrap: wrap; gap: 0.1cm 0.6cm; }
                    .turno-print-row { flex: 1 1 45%; display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.2cm; font-size: 8pt; margin-bottom: 0.15cm; }
                    .turno-print-shift { font-weight: bold; min-width: 1.5cm; }
                    .turno-print-label { font-weight: bold; }
                    .turno-print-blank { display: inline-block; min-width: 1.4cm; border-bottom: 0.5px dotted #999; padding: 0 0.05cm; }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <div class="header">
                        <h1>GRUPO NORTE</h1>
                        <div class="subtitle">Serviços & Transporte LTDA</div>
                        <div class="ficha-title">CADASTRO COLABORADOR</div>
                    </div>

                    <div class="info-municipio">
                        MUNICÍPIO: ${data.municipio} &nbsp;&nbsp;&nbsp; DATA: ${data.data}
                    </div>

                    <div class="section">
                        <div class="section-title">1. DADOS DO COLABORADOR</div>
                        <div class="row compact-row">
                            <div class="field-group" style="flex: 2;"><div class="label">NOME COMPLETO</div><div class="value">${data.condutor.nome || '_________________________'}</div></div>
                            <div class="field-group"><div class="label">APELIDO</div><div class="value">${data.condutor.apelido || '___________'}</div></div>
                        </div>
                        <div class="row compact-row">
                            <div class="field-group"><div class="label">ENDEREÇO</div><div class="value">${data.condutor.endereco || '_________________________'}</div></div>
                            <div class="field-group"><div class="label">CPF</div><div class="value">${data.condutor.cpf || '___________'}</div></div>
                            <div class="field-group"><div class="label">RG</div><div class="value">${data.condutor.rg || '___________'}</div></div>
                            <div class="field-group"><div class="label">NIS/PIS</div><div class="value">${data.condutor.nis || '___________'}</div></div>
                        </div>
                        <div class="row compact-row">
                            <div class="field-group"><div class="label">Nº CIR/CNH</div><div class="value">${data.condutor.cnh || '___________'}</div></div>
                            <div class="field-group"><div class="label">VALIDADE CNH</div><div class="value">${data.condutor.validadeCnh || '___________'}</div></div>
                            <div class="field-group"><div class="label">Nº DE CONTATO</div><div class="value">${data.condutor.contato || '___________'}</div></div>
                            <div class="field-group"><div class="label">E-MAIL</div><div class="value">${data.condutor.email || '___________'}</div></div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">2. DADOS DO VEÍCULO</div>
                        <div class="row compact-row"><div class="field-group"><div class="label">TIPO DE VEÍCULO</div><div class="value">${data.veiculo.tipo.toUpperCase()}</div></div></div>
        `);

    if (data.veiculo.tipo === 'terrestre' && data.veiculo.terrestre) {
    printWindow.document.write(`
                        <div class="row compact-row">
                            <div class="field-group"><div class="label">MODELO</div><div class="value">${data.veiculo.terrestre.modelo || '___________'}</div></div>
                            <div class="field-group"><div class="label">PLACA</div><div class="value">${data.veiculo.terrestre.placa || '___________'}</div></div>
                            <div class="field-group"><div class="label">RENAVAN</div><div class="value">${data.veiculo.terrestre.renavan || '___________'}</div></div>
                            <div class="field-group"><div class="label">CPF/CNPJ</div><div class="value">${data.veiculo.terrestre.cpfCnpj || '___________'}</div></div>
                        </div>
            `);
} else if (data.veiculo.tipo === 'fluvial' && data.veiculo.fluvial) {
    printWindow.document.write(`
                        <div class="row compact-row">
                            <div class="field-group"><div class="label">MODELO</div><div class="value">${data.veiculo.fluvial.modelo || '___________'}</div></div>
                            <div class="field-group"><div class="label">NOME DA EMBARCAÇÃO</div><div class="value">${data.veiculo.fluvial.nomeEmbarcacao || '___________'}</div></div>
                            <div class="field-group"><div class="label">Nº INSC</div><div class="value">${data.veiculo.fluvial.numInsc || '___________'}</div></div>
                            <div class="field-group"><div class="label">VALIDADE</div><div class="value">${data.veiculo.fluvial.validade || '___________'}</div></div>
                        </div>
            `);
}

    printWindow.document.write(`
                    </div>

                    <div class="section">
                        <div class="section-title">3. INFORMAÇÕES DA ROTA</div>
                        <div class="row compact-row">
                            <div class="field-group full-width"><div class="label">ESCOLA</div><div class="value">${data.rota.escola || '_________________________'}</div></div>
                        </div>
                        <div class="row compact-row">
                            <div class="field-group full-width"><div class="label">DETALHAMENTO DA ROTA</div><div class="value" style="min-height:0.6cm;">${data.rota.detalheRota || '________________________________________'}</div></div>
                        </div>
                        <div class="turno-print-title">TURNO</div>
                        <div class="turno-print-grid">
                            <div class="turno-print-row">
                                <span class="turno-print-shift">MANHÃ:</span>
                                <span class="turno-print-label">IDA</span>
                                <span class="turno-print-blank">${data.rota.turno?.manha?.ida || '--:--'}</span>
                                <span class="turno-print-label">VOLTA:</span>
                                <span class="turno-print-blank">${data.rota.turno?.manha?.volta || '--:--'}</span>
                            </div>
                            <div class="turno-print-row">
                                <span class="turno-print-shift">TARDE:</span>
                                <span class="turno-print-label">IDA</span>
                                <span class="turno-print-blank">${data.rota.turno?.tarde?.ida || '--:--'}</span>
                                <span class="turno-print-label">VOLTA:</span>
                                <span class="turno-print-blank">${data.rota.turno?.tarde?.volta || '--:--'}</span>
                            </div>
                            <div class="turno-print-row">
                                <span class="turno-print-shift">NOITE:</span>
                                <span class="turno-print-label">IDA</span>
                                <span class="turno-print-blank">${data.rota.turno?.noite?.ida || '--:--'}</span>
                                <span class="turno-print-label">VOLTA:</span>
                                <span class="turno-print-blank">${data.rota.turno?.noite?.volta || '--:--'}</span>
                            </div>
                            <div class="turno-print-row">
                                <span class="turno-print-shift">INTEGRAL:</span>
                                <span class="turno-print-label">IDA</span>
                                <span class="turno-print-blank">${data.rota.turno?.integral?.ida || '--:--'}</span>
                                <span class="turno-print-label">VOLTA:</span>
                                <span class="turno-print-blank">${data.rota.turno?.integral?.volta || '--:--'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">4. DADOS BANCÁRIOS</div>
                        <div class="row compact-row">
                            <div class="field-group"><div class="label">BANCO</div><div class="value">${data.bancario.banco || '___________'}</div></div>
                            <div class="field-group"><div class="label">AGÊNCIA</div><div class="value">${data.bancario.agencia || '___________'}</div></div>
                            <div class="field-group"><div class="label">Nº CONTA</div><div class="value">${data.bancario.numeroConta || '___________'}</div></div>
                            <div class="field-group"><div class="label">TIPO DE CONTA</div><div class="value">${tipoContaLabel}</div></div>
                        </div>
                        <div class="row compact-row">
                            <div class="field-group"><div class="label">CHAVE PIX${tipoPixLabel ? ' (' + tipoPixLabel + ')' : ''}</div><div class="value">${data.bancario.chavePix || '___________'}</div></div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">5. CHECK LIST DOCUMENTAÇÃO</div>
                        <div class="checklist-print">
                            <div class="check-item-print">RG: ${data.checklist.rg ? '✓' : '□'}</div>
                            <div class="check-item-print">CPF: ${data.checklist.cpf ? '✓' : '□'}</div>
                            <div class="check-item-print">CNH/CIR: ${data.checklist.cnh ? '✓' : '□'}</div>
                            <div class="check-item-print">CLRV: ${data.checklist.clrv ? '✓' : '□'}</div>
                            <div class="check-item-print">DOC. BARCO: ${data.checklist.docBarco ? '✓' : '□'}</div>
                            <div class="check-item-print">CARTÃO BANCO: ${data.checklist.cartaoBanco ? '✓' : '□'}</div>
                            <div class="check-item-print">COMPROV. RESIDÊNCIA: ${data.checklist.comprovanteRes ? '✓' : '□'}</div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">6. OBSERVAÇÕES</div>
                        <div class="value" style="min-height: 0.6cm;">${data.observacoes || '________________________________________________________'}</div>
                    </div>

                    <div class="assinatura-print">
                        <div>Assinatura do Colaborador: __________________________________</div>
                        <div><strong>GRUPO NORTE - CNPJ: 21.128.792/0001-54</strong></div>
                    </div>

                    <div class="footer">Documento gerado em ${new Date().toLocaleString()}</div>
                    <div class="no-print">
                        <button onclick="window.print();">🖨️ Imprimir</button>
                        <button onclick="window.close();">❌ Fechar</button>
                    </div>
                </div>
            </body>
            </html>
        `);

    printWindow.document.close();
    showToast("Janela de impressão aberta - documento otimizado para uma página!");
}

    function limparFormulario() {
    // Limpar todos os campos do formulário principal
    const form = document.getElementById('cadastroForm');
    const allInputs = form.querySelectorAll('input, textarea, select');
    allInputs.forEach(campo => {
    if (campo.type === 'checkbox' || campo.type === 'radio') {
    campo.checked = false;
} else if (campo.tagName === 'SELECT') {
    campo.selectedIndex = 0;
} else {
    campo.value = '';
}
});

    // Resetar campos específicos
    toggleVeiculoFields();
    document.getElementById('tipoVeiculo').value = 'terrestre';
    toggleVeiculoFields();

    // Resetar município (campo vazio para digitação manual)
    document.getElementById('editMunicipio').value = '';

    // NÃO apagar a DATA - manter a data atual do sistema
    // A data já está definida com getDataAtual() e não será alterada
    // Garantir que a data esteja como a data atual do sistema
    document.getElementById('editData').value = getDataAtual();

    showToast("Formulário limpo - Data mantida como atual", false);
}

    function applyCpfMask(campo) {
    let value = campo.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0,11);
    if (value.length > 9) {
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
} else if (value.length > 6) {
    value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
} else if (value.length > 3) {
    value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
}
    campo.value = value;
}

    document.getElementById('cpf')?.addEventListener('input', function(e) { applyCpfMask(this); });
    document.getElementById('placa')?.addEventListener('input', function(e){
    let val = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if(val.length > 3 && val.length <= 7) val = val.slice(0,3) + '-' + val.slice(3,7);
    this.value = val;
});
    document.getElementById('contato')?.addEventListener('input', function(e){
    let v = this.value.replace(/\D/g,'');
    if(v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if(v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if(v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    this.value = v;
});

    document.getElementById('btnLimpar').addEventListener('click', limparFormulario);
    document.getElementById('btnImprimir').addEventListener('click', imprimirFicha);
    document.getElementById('btnSalvarArquivo').addEventListener('click', salvarEmArquivoComPasta);
    document.getElementById('btnImportar').addEventListener('click', abrirModalImportacao);

    if(sessionStorage.getItem('ultimoMunicipio')) {
    document.getElementById('editMunicipio').value = sessionStorage.getItem('ultimoMunicipio');
}

    document.getElementById('editMunicipio').addEventListener('change', function() {
    sessionStorage.setItem('ultimoMunicipio', this.value);
});
    function converterDataParaISO(data) {
        if (!data) return null;

        // Se o input HTML for do tipo "date", ele já entrega YYYY-MM-DD
        if (data.includes("-")) return data;

        // Se estiver recebendo DD/MM/AAAA (ex: via máscara)
        const partes = data.split("/");
        if (partes.length !== 3) return null;

        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    function getColaboradorDTO() {
        const tipoVeiculoRaw = document.getElementById("tipoVeiculo")?.value || "";

        return {
            // ==========================
            // 1. DADOS DO COLABORADOR
            // ==========================
            nomeCompleto: document.getElementById("nomeCompleto")?.value.trim() || "",
            apelido: document.getElementById("apelido")?.value.trim() || "",
            endereco: document.getElementById("endereco")?.value.trim() || "",
            cpf: document.getElementById("cpf")?.value.trim() || "",
            rg: document.getElementById("rg")?.value.trim() || "",
            nisPis: document.getElementById("nis")?.value.trim() || "",
            numeroCirCnh: document.getElementById("cnh")?.value.trim() || "",
            validadeCnh: converterDataParaISO(document.getElementById("validadeCnh")?.value),
            numeroContato: document.getElementById("contato")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",

            // ==========================
            // 2. DADOS DO VEÍCULO
            // ==========================
            tipoVeiculo: tipoVeiculoRaw.toUpperCase(),
            modeloVeiculo: tipoVeiculoRaw.toLowerCase() === "fluvial"
                ? document.getElementById("modeloFluvial")?.value.trim() || ""
                : document.getElementById("modeloTerrestre")?.value.trim() || "",
            placa: document.getElementById("placa")?.value.trim() || "",
            renavam: document.getElementById("renavan")?.value.trim() || "",
            cpfCnpjProprietario: document.getElementById("cpfCnpjVeiculo")?.value.trim() || "",

            // ==========================
            // 3. INFORMAÇÕES DA ROTA
            // ==========================
            escola: document.getElementById("escola")?.value.trim() || "",
            detalhamentoRota: document.getElementById("detalheRota")?.value.trim() || "",
            manhaIda: document.getElementById("manhaIda")?.value || "",
            manhaVolta: document.getElementById("manhaVolta")?.value || "",
            tardeIda: document.getElementById("tardeIda")?.value || "",
            tardeVolta: document.getElementById("tardeVolta")?.value || "",
            noiteIda: document.getElementById("noiteIda")?.value || "",
            noiteVolta: document.getElementById("noiteVolta")?.value || "",
            integralIda: document.getElementById("integralIda")?.value || "",
            integralVolta: document.getElementById("integralVolta")?.value || "",

            // ==========================
            // 4. DADOS BANCÁRIOS
            // ==========================
            banco: document.getElementById("banco")?.value.trim() || "",
            agencia: document.getElementById("agencia")?.value.trim() || "",
            numeroConta: document.getElementById("numeroConta")?.value.trim() || "",
            tipoConta: document.querySelector('input[name="tipoConta"]:checked')?.value || "",
            tipoChavePix: document.querySelector('input[name="tipoPix"]:checked')?.value || "", // Igual à Entity
            chavePix: document.getElementById("chavePix")?.value.trim() || "",

            // ==========================
            // 5. CHECKLIST DOCUMENTAÇÃO (Nomes sincronizados com a Entity)
            // ==========================
            entregaRg: document.getElementById("checkRG")?.checked || false,
            entregaCpf: document.getElementById("checkCPF")?.checked || false,
            entregaCnhCir: document.getElementById("checkCNH")?.checked || false,
            entregaClrv: document.getElementById("checkCLRV")?.checked || false,
            entregaDocumentacaoBarco: document.getElementById("checkDocBarco")?.checked || false,
            entregaCartaoBanco: document.getElementById("checkCartaoBanco")?.checked || false,
            entregaComprovanteResidencia: document.getElementById("checkComprovanteRes")?.checked || false,

            // ==========================
            // 6. OBSERVAÇÕES
            // ==========================
            observacoes: document.getElementById("observacoes")?.value.trim() || ""
        };
    }

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