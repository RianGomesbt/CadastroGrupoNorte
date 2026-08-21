package com.tech.cadastrogruponorte.backend.service;

import com.tech.cadastrogruponorte.backend.entity.Colaborador;
import com.tech.cadastrogruponorte.backend.entity.Veiculo;
import com.tech.cadastrogruponorte.backend.repository.ColaboradorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColaboradorService {

    private final ColaboradorRepository repository;

    public ColaboradorService(ColaboradorRepository repository) {
        this.repository = repository;
    }

    // ============================================================
    // SALVAR OU ATUALIZAR COLABORADOR
    // ============================================================

    public Colaborador salvar(Colaborador colaborador) {

        // --------------------------------------------------------
        // Limpa o CPF
        // --------------------------------------------------------

        if (colaborador.getCpf() != null) {

            colaborador.setCpf(
                    colaborador.getCpf()
                            .replaceAll("[^0-9]", "")
            );
        }


        // --------------------------------------------------------
        // Verifica CPF duplicado
        // --------------------------------------------------------

        if (
                colaborador.getId() == null
                        && repository.existsByCpf(colaborador.getCpf())
        ) {

            throw new IllegalArgumentException(
                    "Já existe uma ficha cadastrada com este CPF!"
            );
        }


        // --------------------------------------------------------
        // Configura o relacionamento dos veículos
        // --------------------------------------------------------

        if (colaborador.getVeiculos() != null) {

            for (Veiculo veiculo : colaborador.getVeiculos()) {

                veiculo.setColaborador(colaborador);

                // Padroniza o tipo
                if (veiculo.getTipoVeiculo() != null) {

                    veiculo.setTipoVeiculo(
                            veiculo.getTipoVeiculo().toUpperCase()
                    );
                }
            }
        }


        // --------------------------------------------------------
        // Salva colaborador + veículos
        // --------------------------------------------------------

        return repository.save(colaborador);
    }


    // ============================================================
    // BUSCAR POR CPF
    // ============================================================

    public Colaborador buscarPorCpf(String cpf) {

        String cpfLimpo =
                cpf.replaceAll("[^0-9]", "");

        return repository.findByCpf(cpfLimpo)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Ficha não encontrada para o CPF informado."
                        )
                );
    }


    // ============================================================
    // LISTAR TODOS
    // ============================================================

    public List<Colaborador> listarTodos() {

        return repository.findAll();
    }
}