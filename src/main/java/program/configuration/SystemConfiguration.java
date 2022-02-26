package program.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

// Атрибут, який оголошує властивості конфігурації.
// Приймає строку як назву конфігурацій
@ConfigurationProperties("system")
// Підключення lombok
@Data
public class SystemConfiguration {
    private String filePath = "images";
}
