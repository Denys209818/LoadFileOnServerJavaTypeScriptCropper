import axios from "axios";
// Шлях до серверної частини
export const urlBackend = "http://localhost:8800";
// Ініціалізація axios. Містить базовий шлях і заголовки запиту
export default axios.create({
    baseURL:urlBackend,
    headers: {
        'Content-Type':'application/json'
    }
});