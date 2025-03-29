package com.example.lms.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConnfig {  // Fixed typo in class name

    // Password Encoder Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable() // Disable CSRF for simplicity
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/student/**").permitAll() // Allow all student endpoints
                        .requestMatchers("/instructor/addCourse").permitAll()
                        .requestMatchers("/instructor/getCourses").permitAll()
                        .requestMatchers("/instructor/deleteCourse/**").permitAll()
                        .requestMatchers("/instructor/uploadVideo").permitAll() // Allow video uploads
                        .requestMatchers("/instructor/videos/**").permitAll() // ✅ Allow public access to videos
                        .requestMatchers("/enrollment/**").permitAll()
                        .requestMatchers("/student/profile").authenticated()
                        .anyRequest().denyAll() // Block everything else
                )
                .build();
    }


    // CORS Configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all routes
                        .allowedOrigins("http://localhost:5173") // Frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // Allow credentials (for Authorization headers)
            }
        };
    }
}
