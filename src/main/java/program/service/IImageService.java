package program.service;

// Сервіс для роботи з фотографіями. Метод init() створює кореневу папку
// Метод saveImage() конвертує base64 у файл і зберігає його на сервері. Повертається назва файлу
public interface IImageService {
    void init();
    String saveImage(String base64);
}
