package com.tech.cadastrogruponorte.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_veiculos")
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipoVeiculo; // "TERRESTRE" ou "FLUVIAL"
    private String modeloVeiculo;
    private String placa;
    private String renavam;
    private String cpfCnpjProprietario;
    private String nomeEmbarcacao;
    private String numInsc;
    private String validadeEmbarcacao;

    public String getNomeEmbarcacao() {
        return nomeEmbarcacao;
    }

    public void setNomeEmbarcacao(String nomeEmbarcacao) {
        this.nomeEmbarcacao = nomeEmbarcacao;
    }

    public String getNumInsc() {
        return numInsc;
    }

    public void setNumInsc(String numInsc) {
        this.numInsc = numInsc;
    }

    public String getValidadeEmbarcacao() {
        return validadeEmbarcacao;
    }

    public void setValidadeEmbarcacao(String validadeEmbarcacao) {
        this.validadeEmbarcacao = validadeEmbarcacao;
    }

    @ManyToOne
    @JoinColumn(name = "colaborador_id")
    @JsonIgnore
    private Colaborador colaborador;

    private Veiculo(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoVeiculo() {
        return tipoVeiculo;
    }

    public void setTipoVeiculo(String tipoVeiculo) {
        this.tipoVeiculo = tipoVeiculo;
    }

    public String getModeloVeiculo() {
        return modeloVeiculo;
    }

    public void setModeloVeiculo(String modeloVeiculo) {
        this.modeloVeiculo = modeloVeiculo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getRenavam() {
        return renavam;
    }

    public void setRenavam(String renavam) {
        this.renavam = renavam;
    }

    public String getCpfCnpjProprietario() {
        return cpfCnpjProprietario;
    }

    public void setCpfCnpjProprietario(String cpfCnpjProprietario) {
        this.cpfCnpjProprietario = cpfCnpjProprietario;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public void setColaborador(Colaborador colaborador) {
        this.colaborador = colaborador;
    }
}
