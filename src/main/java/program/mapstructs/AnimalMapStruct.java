package program.mapstructs;

import org.mapstruct.Mapper;
import program.dto.AddAnimalDto;
import program.entities.Animal;

// Маппер, який вказує, що маппер застосовується для spring boot
@Mapper(componentModel = "spring")
public interface AnimalMapStruct {
    // Конвертує обєкт AddAnimalDto у обєкт Animal
    Animal convertToAnimal(AddAnimalDto animalAdd);
}
