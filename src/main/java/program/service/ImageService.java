package program.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import program.configuration.SystemConfiguration;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@RequiredArgsConstructor
// Оголошення сервісу
@Service
public class ImageService implements IImageService{
    // Ініціалізація обєкту системної конфігурації, яка містить властивість - шлях до кореневої папки
    private final SystemConfiguration configuration;
    @Override
    // Метод, який створює папку при її відсутності
    public void init() {
        try
        {
            // Формування шляху до кореневої папки
            Path pathDir = Paths.get(configuration.getFilePath());
            // Якщо папки не існує
            if(!Files.exists(pathDir))
            {
                // Створення папки
                Files.createDirectory(pathDir);
            }
        }
        catch (IOException ex)
        {
            // Виведення помилки на консолі
            System.out.println("Помилка при створенні папки: " + ex.getMessage());
        }
    }

    @Override
    // Метод, який зберігає зображення на сервер і повертає назву фотографії
    public String saveImage(String base64) {
        try
        {
            // Формування рандомної назви файлу
            String fileName = UUID.randomUUID().toString() + ".jpg";
            // Отримання кореневої папки з обєкту конфігурації
            Path savePath = Paths.get(this.configuration.getFilePath());
            // Формування шляху, а саме дописування до кореневої папки назви файлу
            savePath =  savePath.resolve(fileName);
            // Конвертація шляху у строку
            String savingFilePath = savePath.toString();
            // Формування декодера, який конвртує base64 у байтовий масив
            Base64.Decoder decoder = Base64.getDecoder();
            // Переведення коду фотографії у байтовий масив
            byte[] bytes = decoder.decode(base64.split(",")[1]);
            // Створення потоку на основі заданого шляху і запис у нього байтового масиву (формування фотографії)
            new FileOutputStream(savingFilePath).write(bytes);
            // Повернення назви файлу
            return fileName;
        }catch (IOException ex)
        {
            // Виведення у консоль помилки
            System.out.println("Виникла помилка при збереженні файлу! "+ ex.getMessage());
        }
        // Якщо виникла помилка, то повертається null
        return null;
    }
}
