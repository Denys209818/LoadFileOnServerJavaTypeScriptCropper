package program.dto;

import lombok.Data;

// Підключення lombok
@Data
// Повернення моделі, яка містить ідентифікатор створеної тварини
public class AnimalReturnedDto {
    // Ідентифікатор створеної тварини
    private int Id;
    // Конструктор, який ініціалізує ідентифікатор створеної тварини
    public AnimalReturnedDto(int id)
    {
        this.Id = id;
    }
}
