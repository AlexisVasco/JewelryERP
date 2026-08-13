package com.lux.backend.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        Path carpetaUploads = Paths.get("uploads");

        String rutaAbsoluta = carpetaUploads
                .toFile()
                .getAbsolutePath();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(
                        "file:" + rutaAbsoluta + "/"
                );
    }
}