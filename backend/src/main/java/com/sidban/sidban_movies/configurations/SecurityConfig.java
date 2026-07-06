package com.sidban.sidban_movies.configurations;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

            .csrf(csrf -> csrf.disable())

            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth

                // APIs
                .requestMatchers(
                    "/sidbannews/**",
                    "/sidbanai/**"
                ).permitAll()

                // React Static Files
                .requestMatchers(
                    "/",
                    "/index.html",
                    "/static/**",
                    "/*.js",
                    "/*.css",
                    "/*.png",
                    "/*.jpg",
                    "/*.jpeg",
                    "/*.svg",
                    "/*.ico",
                    "/manifest.json",
                    "/favicon.ico",
                    "/asset-manifest.json"
                ).permitAll()

                // React Routes
                .requestMatchers(
                    "/about",
                    "/",
                    "/login",
                    "/home",
                    "/sidban-cinema/**",
                    "/history",
                    "/search/**",
                    "/history/**",
                    "/sidban-player/**",
                    "/sidban-player/series/**",
                    "/category",
                    "/category/**",
                    "/trending",
                    "/top-imdb",
                    "/series/**",
                    "/movies",
                    "/overview",
                    "/overview/**",
                    "/error",
                    "/credits",
                    "/credits/**",
                    "/not-found",
                    "/check-auth"
                ).permitAll()

                .anyRequest().permitAll()
            )

            .formLogin(form -> form.disable())

            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}