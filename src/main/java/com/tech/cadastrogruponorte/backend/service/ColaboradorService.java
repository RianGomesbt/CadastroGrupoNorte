package com.tech.cadastrogruponorte.backend.service;
import com.tech.cadastrogruponorte.backend.entity.Colaborador;
import com.tech.cadastrogruponorte.backend.repository.ColaboradorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColaboradorService {

    private final ColaboradorRepository repository;

    public ColaboradorService(ColaboradorRepository repository) {
        this.repository = repository;
    }

    // Salva ou atualiza uma ficha
    public Colaborador salvar(Colaborador colaborador) {
        // Trata/Limpa o CPF (remove pontos e traço) se necessário
        if (colaborador.getCpf() != null) {
            colaborador.setCpf(colaborador.getCpf().replaceAll("[^0-9]", ""));
        }

        // Se for um novo cadastro, verifica duplicidade de CPF
        if (colaborador.getId() == null && repository.existsByCpf(colaborador.getCpf())) {
            throw new IllegalArgumentException("Já existe uma ficha cadastrada com este CPF!");
        }

        return repository.save(colaborador);
    }

    // Busca por CPF
    public Colaborador buscarPorCpf(String cpf) {
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");
        return repository.findByCpf(cpfLimpo)
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada para o CPF informado."));
    }

    // Lista todas as fichas
    public List<Colaborador> listarTodos() {
        return repository.findAll();
    }
}