package program.mapstructs;

import javax.annotation.Generated;
import org.springframework.stereotype.Component;
import program.dto.AddAnimalDto;
import program.entities.Animal;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-02-24T01:28:38+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.12 (Microsoft)"
)
@Component
public class AnimalMapStructImpl implements AnimalMapStruct {

    @Override
    public Animal convertToAnimal(AddAnimalDto animalAdd) {
        if ( animalAdd == null ) {
            return null;
        }

        Animal animal = new Animal();

        animal.setName( animalAdd.getName() );
        animal.setAnimalType( animalAdd.getAnimalType() );
        animal.setAge( animalAdd.getAge() );

        return animal;
    }
}
