package program.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

// Оголошення конфігурації
@Configuration
// Реєстрація веб-захисту
@EnableWebSecurity
// Реєстрація системи захисту від запитів
@EnableGlobalMethodSecurity(proxyTargetClass = true, securedEnabled = true)
// WebSecurityConfigurerAdapter - задає налашутвання для веб-захисту
public class WebConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    // Метод, який задає веб-захист для проекту
    protected void configure(HttpSecurity http) throws Exception {
        // Відключення захисту від csrf атак
        http.csrf().disable();
        // Включення доступу до ресурсів тільки при авторизації
        http.authorizeRequests()
                // Задання маршрутів, до яких дозволено всім звертатися (без авторизації)
                .antMatchers("/rest-api-docs/**", "/swagger", "/swagger-ui/**").permitAll()
                .antMatchers("/files/**").permitAll()
                .antMatchers("/animal/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                // Задання ініціалізації форми логіну
                .formLogin()
                .loginPage("/login");
    }
}
