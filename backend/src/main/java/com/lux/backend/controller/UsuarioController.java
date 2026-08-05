package com.lux.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.dto.LoginRequest;
import com.lux.backend.entity.Usuario;
import com.lux.backend.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registrar")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {

        Usuario usuario = usuarioService.login(
                login.getUsuario(),
                login.getPassword());

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario o contraseña incorrectos");
        }

        return ResponseEntity.ok(usuario);
    }

}