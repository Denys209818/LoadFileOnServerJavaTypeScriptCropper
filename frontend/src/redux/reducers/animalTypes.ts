// Типи подій, які можуть відбуватися у redux для редюсера зображень
export enum ANIMAL_TYPE_ACTIONS 
{
    // Додавання зображень до сховища redux
    ADD_ANIMAL_IMAGE = "ADD_ANIMAL_IMAGE",
    // Очищення сховища після додавання тварини
    CLEAR_IMAGES = "CLEAR_IMAGES"
}
//  Інтерфейс помилки, яка може виникнути на сервері
export interface IServerReturnedError 
{
    error: string
}
// Інтерфейс, який містить дані про збережений на сервері файл
export interface AnimalImageModel 
{
    // Назва файлу
    filename: string,
}
// Подія, яка виникає коли фотографія збережена і потрібно зберегти інформацію про файл у redux
export interface CreateAnimal 
{
    type: ANIMAL_TYPE_ACTIONS.ADD_ANIMAL_IMAGE,
    payload: AnimalImageModel
}
// Подія для очищення сховища з зображеннями (інформації про додані файли), після додавання їх на сервер
export interface ClearImages 
{
    type: ANIMAL_TYPE_ACTIONS.CLEAR_IMAGES
}
// Усі події які можуть відбуватися у redux
export type AnimalActions = CreateAnimal | ClearImages;