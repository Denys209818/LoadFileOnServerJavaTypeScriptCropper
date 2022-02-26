package program.controllers;

import org.springframework.core.io.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import program.configuration.SystemConfiguration;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

// Ініціалізація рест-контроллера
@RestController
// Автоматичне заповнення усіх private final полів
@RequiredArgsConstructor
public class MainController {
    // Дані системної конфігурації (шлях до фотографій)
    private final SystemConfiguration configuration;

    // Оголошення типу запиту GET і шляху до ресурсу
    @GetMapping("/files/{filename:.+}")
    // Вказує що відповідь має повертатися у JSON-форматі
    @ResponseBody
    // Метод, який приймає назву файлу і повертає ресурс у форматі IMAGE_JPEG.
    public ResponseEntity<Resource> getFiles(@PathVariable(name = "filename") String filename) {
        try
        {
            // Сформування шляху до файлу
        Path filePath= Paths.get(configuration.getFilePath(), filename);
        // Створення на основі файлу ресурс
        Resource resource = new UrlResource(filePath.toUri());
        // Повернення ресурсу як відповіді у форматі IMAGE_JPEG
        // Заголовок HttpHeaders.CONTENT_DISPOSITION вказує, що елемент може бути повернений як сторінка
        // або як елемент сторінки. Заголовок filename вказує назву файлу, яка буде задана при збереженні файлу
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\""+ filename +"\"")
                .body(resource);


        }catch (MalformedURLException ex)
        {
            // Виведення на консоль тексту помилки
            System.out.println(ex.getMessage());
        }
        return null;
    }
}
