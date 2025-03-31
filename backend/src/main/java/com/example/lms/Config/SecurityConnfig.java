package com.example.lms.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConnfig implements WebMvcConfigurer {  // ✅ Implement WebMvcConfigurer

    // ✅ Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // ✅ Security Configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())  // 🔥 Disable CSRF for API calls
                .cors(cors -> cors.configurationSource(request -> new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues()))  // 🔥 Enable CORS properly
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/student/**").permitAll()
                        .requestMatchers("/instructor/**").permitAll()
                        .requestMatchers("/enrollment/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()  // ✅ Allow access to uploaded videos
                        .requestMatchers("/static/**", "/resources/**").permitAll() // ✅ Allow other static resources
                        .requestMatchers("/student/profile").authenticated()
                        .anyRequest().authenticated() // Require authentication for all other requests
                )
                .build();
    }

    // ✅ CORS Configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173", "http://localhost:3000") // ✅ Allow frontend access
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    // ✅ Static Resource Configuration (Enables Video Access)
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")  // ✅ Maps "/uploads/**" to actual folder
                .addResourceLocations("file:uploads/");
    }
}
