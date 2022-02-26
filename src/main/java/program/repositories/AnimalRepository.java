package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.Animal;

// Атрибут, який реалізує CRUD для тварин
@Repository
// JpaRepository вказує, що CRUD реалізовується для тварин. Тип шаблонний і приймає тип обєкту
// до якого реалізується CRUD і тип первічного ключа
public interface AnimalRepository extends JpaRepository<Animal, Integer>
{

}
