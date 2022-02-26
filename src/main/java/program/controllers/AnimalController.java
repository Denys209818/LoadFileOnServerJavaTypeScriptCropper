package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dto.AddAnimalDto;
import program.dto.AddAnimalImageDto;
import program.dto.AnimalImageReturnDto;
import program.dto.AnimalReturnedDto;
import program.entities.Animal;
import program.entities.AnimalImage;
import program.mapstructs.AnimalMapStruct;
import program.repositories.AnimalImageRepository;
import program.repositories.AnimalRepository;
import program.service.ImageService;

import java.util.ArrayList;
import java.util.List;

// Атрибут, який оголошує RestController
@RestController
// Підключає автоматичну ініціалізацію усіх полів private final полів
@RequiredArgsConstructor
// Задає підшлях для доступу до ресурсів даного контроллера
@RequestMapping("/animal")
public class AnimalController {
    // Сервіс, який конвертує строку base64 у файл і зберігає його на сервері
    private final ImageService imageService;
    // Маппер для тварин
    private final AnimalMapStruct animalMapStruct;
    // Репозиторій для тварин
    private final AnimalRepository animalRepository;
    // Репозиторій для фотографій тварин
    private final AnimalImageRepository animalImageRepository;
    // Оголошення типу запиту POST і шляху до ресурсу
    @PostMapping("/addAnimalImage")
    // Вказує що відповідь має повертатися у JSON-форматі
    @ResponseBody
    public ResponseEntity<AnimalImageReturnDto> addAnimalImage(@RequestBody AddAnimalImageDto animal)
    {
        try
        {
            // Зберігається файл на сервері і повертається назва файлу
            String filename = imageService.saveImage(animal.getBase64());
            // Створюється Entity-обєкт для фотографії, щоб зберегти її у БД
            AnimalImage animalImage = new AnimalImage();
            // Присвоєння до властивості назви фотографії
            animalImage.setImage(filename);
            // Збереження фотографії у БД
            animalImageRepository.save(animalImage);
            // Формування моделі, яка повертатиметься (інформація про створений файл)
            AnimalImageReturnDto returned = new AnimalImageReturnDto(filename);
            // Повернення відповіді у форматі JSON
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
               .body(returned);


        }
        catch(Exception ex)
        {
            // Відображення у консолі помилки
            System.out.println("Помилка: " + ex.getMessage());
        }
        //  У випадку невдачі збереження повертається нуль
        return ResponseEntity.badRequest().body(null);
    }
    // Оголошення типу запиту POST і шляху до ресурсу
    @PostMapping("/addAnimal")
    // Вказує що відповідь має повертатися у JSON-форматі
    @ResponseBody
    public ResponseEntity<AnimalReturnedDto> addAnimal(@RequestBody AddAnimalDto animalDto)
    {
        try {
            // Формування обєкта тварини через маппер
        Animal animal = animalMapStruct.convertToAnimal(animalDto);
        // Збереження тварини у БД
        animalRepository.save(animal);
            // Ініціалізація колекції фотографій тварин
            List<AnimalImage> images = new ArrayList<>();
            for(String image : animalDto.getImagesNames())
            {
                // Пошук по назві файлу і присвоєння до обєкту
                AnimalImage animalImage = animalImageRepository.findAnimalImageByImage(image);
                // Присвоєння до фотографії тварину
                animalImage.setAnimal(animal);
                // Збереження змін у БД
                animalImageRepository.save(animalImage);
            }
            // Обєкт, який має повернутися із серверу. Приймає ідентифікатор створеної тварини
        AnimalReturnedDto returned = new AnimalReturnedDto(animal.getId());
            // Повернення відповіді у форматі JSON
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(returned);
        }
        catch(Exception ex)
        {
            // Виведення на консоль помилки
            System.out.println("Помилка: " + ex.getMessage());
        }
        // Якщо додавання не вийшло, то повертається пустий обєкт
        return ResponseEntity.badRequest().body(null);
    }
}
