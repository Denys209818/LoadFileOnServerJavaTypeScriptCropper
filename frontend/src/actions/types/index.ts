
// Інтерфейс, який містить назву файлу, який повертається із серверу
export interface ReturnedName 
{
    filename: string
}
// Модель для додавання фотографії на сервер
export interface AddImageModel 
{
    base64: string
}