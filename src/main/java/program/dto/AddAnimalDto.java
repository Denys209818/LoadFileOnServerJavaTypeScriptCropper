package program.dto;

import lombok.Data;

import java.util.List;

// Підключення lombok
@Data
// Модель для додавання тварин
public class AddAnimalDto {
    // Назва тварини
    private String Name;
    // Тип тварини (кіт, собака, ...)
    private String AnimalType;
    // Вік тварини
    private int Age;
    // Колекція назв фотографій
    private List<String> imagesNames;
}
