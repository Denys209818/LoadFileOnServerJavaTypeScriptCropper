package program.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

// Оголошення сущності
@Entity
// Підключення lombok
@Data
public class Animal {
    // Вказує на ідентифікатор
    @Id
    // Встановлення автоматичної генерації значення GenerationType.IDENTITY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Ідентифікатор сущності
    private int id;
    // Інформація про максимальну довжину і чи може значення бути null
    @Column(length = 200, nullable = false)
    private String name;
    // Інформація про максимальну довжину і чи може значення бути null
    @Column(length = 200, nullable = false)
    private String animalType;
    // Інформація чи може значення бути null
    @Column(nullable = false)
    private int age;
    // Колекція фотографій тварин. Звязуються з фотографіями (звязок один до багатьох)
    @OneToMany(mappedBy = "animal")
    private List<AnimalImage> images;
}
