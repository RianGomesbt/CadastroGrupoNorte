package com.tech.cadastrogruponorte.backend.controller;
import com.tech.cadastrogruponorte.backend.entity.Colaborador;
import com.tech.cadastrogruponorte.backend.service.ColaboradorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colaboradores")
@CrossOrigin(origins = "*") // Permite chamadas do frontend em porta diferente (ex: http://localhost:5500)
public class ColaboradorController {

    private final ColaboradorService service;

    public ColaboradorController(ColaboradorService service) {
        this.service = service;
    }

    // POST /api/colaboradores -> Salva uma nova ficha
    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Colaborador colaborador) {
        System.out.println(">>> Novo cadastro recebido:");
        System.out.println("Nome: " + colaborador.getNomeCompleto());
        System.out.println("CPF: " + colaborador.getCpf());
        System.out.println("Banco: " + colaborador.getBanco());
        System.out.println("Check RG: " + colaborador.isEntregaRg());
        try {
            Colaborador salvo = service.salvar(colaborador);
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // GET /api/colaboradores/cpf/{cpf} -> Busca ficha específica por CPF
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<?> buscarPorCpf(@PathVariable String cpf) {
        try {
            Colaborador colaborador = service.buscarPorCpf(cpf);
            return ResponseEntity.ok(colaborador);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // GET /api/colaboradores -> Retorna todas as fichas cadastradas
    @GetMapping
    public ResponseEntity<List<Colaborador>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }
}
