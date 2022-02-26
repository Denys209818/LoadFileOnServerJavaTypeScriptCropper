import * as Yup from 'yup';

// Створення обєкту Yup для валідації полів форми
export default Yup.object({
    name: Yup.string().required("Поле має бути заповненим!"),
    animalType: Yup.string().required("Поле має бути заповненим!"),
    age: Yup.number().required("Поле має бути заповненим!").min(0, "Мінімальне значення - 0")
});