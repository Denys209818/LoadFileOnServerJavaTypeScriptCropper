package program.dto;

import lombok.Data;

// Підключення lombok
@Data
// Модель для повернення інформації про файл, який було збережено
public class AnimalImageReturnDto {
    // Назва файлу
    private String filename;
    // Конструктор, який задає нащву файлу
    public AnimalImageReturnDto(String filename)
    {
        this.filename = filename;
    }
}
