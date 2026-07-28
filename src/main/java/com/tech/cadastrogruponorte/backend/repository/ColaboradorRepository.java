package com.tech.cadastrogruponorte.backend.repository;


import com.tech.cadastrogruponorte.backend.entity.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    // Busca exata pelo CPF
    Optional<Colaborador> findByCpf(String cpf);

    // Verifica se já existe o CPF cadastrado para evitar duplicados
    boolean existsByCpf(String cpf);
}