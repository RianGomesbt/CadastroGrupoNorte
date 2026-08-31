package com.tech.cadastrogruponorte.backend.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_colaboradores")
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1. DADOS DO COLABORADOR
    @Column(nullable = false)
    @NotBlank(message = "O nome completo é obrigatório.")
    @Size(max = 80, message = "O nome deve ter no máximo 80 caracteres.")
    private String nomeCompleto;
    private String apelido;
    private String endereco;

    @NotBlank(message = "O CPF é obrigatório.")
    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Size(max = 20, message = "RG muito grande.")
    private String rg;

    @Size(max = 20)
    private String nisPis;

    @Size(max = 30)
    private String numeroCirCnh;

    @NotNull(message = "Informe a validade da CNH.")
    private LocalDate validadeCnh;

    /*@Pattern(
            regexp = "^\\(\\d{2}\\)\\s?\\d{4,5}-\\d{4}$",
            message = "Telefone inválido."
    )*/
    private String numeroContato;
    private String email;

    // 2. DADOS DO VEICULO
    @OneToMany(
            mappedBy = "colaborador",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Veiculo> veiculos = new ArrayList<>();

    // 3. INFORMAÇÕES DA ROTA
    private String escola;

    @Column(columnDefinition = "TEXT")
    private String detalhamentoRota;

    private String manhaIda;
    private String manhaVolta;
    private String tardeIda;
    private String tardeVolta;
    private String noiteIda;
    private String noiteVolta;
    private String integralIda;
    private String integralVolta;

    // 4. DADOS BANCÁRIOS
    private String banco;
    private String agencia;
    private String numeroConta;
    private String tipoConta; // "CORRENTE" ou "POUPANCA"
    private String tipoChavePix; // "CPF", "TEL", "EMAIL"
    private String chavePix;

    // 5. CHECKLIST DOCUMENTAÇÃO (booleans para as caixas de seleção)
    private boolean entregaRg;
    private boolean entregaCpf;
    private boolean entregaCnhCir;
    private boolean entregaClrv;
    private boolean entregaDocumentacaoBarco;
    private boolean entregaCartaoBanco;
    private boolean entregaComprovanteResidencia;

    // 6. OBSERVAÇÕES
    @Column(columnDefinition = "TEXT")
    private String observacoes;

    public Colaborador() {
    }

    // --- GETTERS E SETTERS ---


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getApelido() {
        return apelido;
    }

    public void setApelido(String apelido) {
        this.apelido = apelido;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getNisPis() {
        return nisPis;
    }

    public void setNisPis(String nisPis) {
        this.nisPis = nisPis;
    }

    public String getNumeroCirCnh() {
        return numeroCirCnh;
    }

    public void setNumeroCirCnh(String numeroCirCnh) {
        this.numeroCirCnh = numeroCirCnh;
    }

    public LocalDate getValidadeCnh() {
        return validadeCnh;
    }

    public void setValidadeCnh(LocalDate validadeCnh) {
        this.validadeCnh = validadeCnh;
    }

    public String getNumeroContato() {
        return numeroContato;
    }

    public void setNumeroContato(String numeroContato) {
        this.numeroContato = numeroContato;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEscola() {
        return escola;
    }

    public void setEscola(String escola) {
        this.escola = escola;
    }

    public String getDetalhamentoRota() {
        return detalhamentoRota;
    }

    public void setDetalhamentoRota(String detalhamentoRota) {
        this.detalhamentoRota = detalhamentoRota;
    }

    public String getManhaIda() {
        return manhaIda;
    }

    public void setManhaIda(String manhaIda) {
        this.manhaIda = manhaIda;
    }

    public String getManhaVolta() {
        return manhaVolta;
    }

    public void setManhaVolta(String manhaVolta) {
        this.manhaVolta = manhaVolta;
    }

    public String getTardeIda() {
        return tardeIda;
    }

    public void setTardeIda(String tardeIda) {
        this.tardeIda = tardeIda;
    }

    public String getTardeVolta() {
        return tardeVolta;
    }

    public void setTardeVolta(String tardeVolta) {
        this.tardeVolta = tardeVolta;
    }

    public String getNoiteIda() {
        return noiteIda;
    }

    public void setNoiteIda(String noiteIda) {
        this.noiteIda = noiteIda;
    }

    public String getNoiteVolta() {
        return noiteVolta;
    }

    public void setNoiteVolta(String noiteVolta) {
        this.noiteVolta = noiteVolta;
    }

    public String getIntegralIda() {
        return integralIda;
    }

    public void setIntegralIda(String integralIda) {
        this.integralIda = integralIda;
    }

    public String getIntegralVolta() {
        return integralVolta;
    }

    public void setIntegralVolta(String integralVolta) {
        this.integralVolta = integralVolta;
    }

    public String getBanco() {
        return banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public void setNumeroConta(String numeroConta) {
        this.numeroConta = numeroConta;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public String getTipoChavePix() {
        return tipoChavePix;
    }

    public void setTipoChavePix(String tipoChavePix) {
        this.tipoChavePix = tipoChavePix;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

    public boolean isEntregaRg() {
        return entregaRg;
    }

    public void setEntregaRg(boolean entregaRg) {
        this.entregaRg = entregaRg;
    }

    public boolean isEntregaCpf() {
        return entregaCpf;
    }

    public void setEntregaCpf(boolean entregaCpf) {
        this.entregaCpf = entregaCpf;
    }

    public boolean isEntregaCnhCir() {
        return entregaCnhCir;
    }

    public void setEntregaCnhCir(boolean entregaCnhCir) {
        this.entregaCnhCir = entregaCnhCir;
    }

    public boolean isEntregaClrv() {
        return entregaClrv;
    }

    public void setEntregaClrv(boolean entregaClrv) {
        this.entregaClrv = entregaClrv;
    }

    public boolean isEntregaDocumentacaoBarco() {
        return entregaDocumentacaoBarco;
    }

    public void setEntregaDocumentacaoBarco(boolean entregaDocumentacaoBarco) {
        this.entregaDocumentacaoBarco = entregaDocumentacaoBarco;
    }

    public boolean isEntregaCartaoBanco() {
        return entregaCartaoBanco;
    }

    public void setEntregaCartaoBanco(boolean entregaCartaoBanco) {
        this.entregaCartaoBanco = entregaCartaoBanco;
    }

    public boolean isEntregaComprovanteResidencia() {
        return entregaComprovanteResidencia;
    }

    public void setEntregaComprovanteResidencia(boolean entregaComprovanteResidencia) {
        this.entregaComprovanteResidencia = entregaComprovanteResidencia;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public List<Veiculo> getVeiculos() {
        return veiculos;
    }

    public void setVeiculos(List<Veiculo> veiculos) {
        this.veiculos = veiculos;
    }
}