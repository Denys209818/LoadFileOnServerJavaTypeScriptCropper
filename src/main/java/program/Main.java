package program;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import program.configuration.SystemConfiguration;
import program.service.ImageService;

// Ініціалізація Spring boot
@SpringBootApplication
// Застосування властивостей конфігурацій
@EnableConfigurationProperties(SystemConfiguration.class)
public class Main {
    public static void main(String[] args) {
        // Запуск Spring boot
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer()
    {
        // Додавання правил доступу CORS
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Відключення CORS для ресурсу http://localhost:3000. Надає доступ до всіх сервісів
                // для даного ресурсу
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }

    // Метод, який створює папку для фотографій, якщо її немає.
    // Приймає сервіс для роботи з файлами
    @Bean
    CommandLineRunner InitializeDirectories(ImageService service)
    {
        // Повернення лямбди-функції,яка, використовуючи сервіс,
        // створює папку, якщо її не існує
        return (args) -> {
            service.init();
        };
    }
}
