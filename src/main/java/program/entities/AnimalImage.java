package program.entities;

import lombok.Data;

import javax.persistence.*;
// Сущность фотографії тварини
@Entity
// Ініціалізація lombok
@Data
public class AnimalImage {
    // Вказує на ідентифікатор
    @Id
    // Встановлення автоматичної генерації значення GenerationType.IDENTITY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Ідентифікатор сущності
    private int id;
    // Інформація про максимальну довжину і чи може значення бути null
    @Column(length = 200, nullable = false)
    private String image;
    // Звязок з твариною. Звязок один до багатьох
    // Атрибут optional=true вказує що обєкт може не вказувати на жодну тварину
    // Атрибут fetch=FetchType.LAZY вказує, що обєкт загружається лише при необхідності
    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    // Поєднання з сущностю тварини через ідентифікатор тварини.
    // Атрибут nullable=true вказує, що елемент може бути null
    @JoinColumn(name = "animal_id", nullable = true)
    private Animal animal;
}
