import { AddImageModel, ReturnedName } from "../actions/types";
import { AnimalAddModel } from "../components/Default/Create/types";
import axiosCreate from "./axiosCreate";


class AxiosService 
{
    // Метод, який додає зображення на сервер. Приймає модель для додвання зображень. Повертає потік з іменем створеного файлу
    addImage = async (data: AddImageModel) : Promise<ReturnedName> => 
    {
        // Запит на додавання зображень на сервер. Повертається обєкт з назвою файлу
        return (await axiosCreate.post<ReturnedName>("/animal/addAnimalImage", data)).data;
    }
    // Метод, який додає тварину на сервер для збереження у БД. Приймає модель для додавання тварин
    addAnimal = async (data: AnimalAddModel) => 
    {
        // Запит, який надсилається на сервер. Як відповідь повертається ідентифікатор створеного обєкту
        return (await axiosCreate.post<number>("/animal/addAnimal", data)).data;
    }
}

// Експорт обєкту класу
export default new AxiosService();