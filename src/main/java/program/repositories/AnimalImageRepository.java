package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.AnimalImage;

import java.util.List;

// Атрибут, який реалізує CRUD для фотографій тварин
@Repository
// JpaRepository вказує, що CRUD реалізовується для фотографій тварин. Тип шаблонний і приймає тип обєкту
// до якого реалізується CRUD і тип первічного ключа
public interface AnimalImageRepository extends JpaRepository<AnimalImage, Integer> {
    // Провадить пошук по імені фотографії і повертає її
    AnimalImage findAnimalImageByImage(String Image);
}
