package program.dto;

import lombok.Data;

// Підключення lombok
@Data
// Модель для додавання фотографії на сервер
public class AddAnimalImageDto {
    // Строка, з якої формуватиметься зображення і зберігатиметься на сервері
    private String base64;
}
