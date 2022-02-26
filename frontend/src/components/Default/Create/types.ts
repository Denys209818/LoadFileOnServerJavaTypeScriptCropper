// Інтерфейс, який містить інформацію з полів форми
export interface AnimalModel 
{
    name: string,
    age: string,
    animalType: string
}
// Інтерфейс для відправлення тварини на сервер
export interface AnimalAddModel 
{
    name: string,
    age: string,
    animalType: string,
    imagesNames: Array<string>
}