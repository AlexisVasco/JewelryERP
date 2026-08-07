package com.lux.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lux.backend.entity.Usuario;
import com.lux.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario guardarUsuario(Usuario usuario) {

        if (usuario.getActivo() == null) {
            usuario.setActivo(true);
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario login(String usuario, String password) {

        Optional<Usuario> usuarioBD = usuarioRepository.findByUsuario(usuario);

        if (usuarioBD.isPresent()) {

            Usuario u = usuarioBD.get();

            if (!Boolean.TRUE.equals(u.getActivo())) {
                return null;
            }

            if (u.getPassword().equals(password)) {
                return u;
            }

        }

        return null;
    }

}