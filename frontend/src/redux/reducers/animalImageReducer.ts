import {AnimalActions, AnimalImageModel, ANIMAL_TYPE_ACTIONS} from './animalTypes';

// Типізація початкового обєкта (масиву з даними про збережені фотографії)
const initialValues: Array<AnimalImageModel> =[];

// Редюсер для роботи з фотографіями (які вже є збереженими)
const animalImageReducer = (state: Array<AnimalImageModel> = initialValues, 
    action: AnimalActions): Array<AnimalImageModel> => 
{
    switch(action.type) 
    {
        // Додавання інформації про новостворену фотографію
        case ANIMAL_TYPE_ACTIONS.ADD_ANIMAL_IMAGE: 
        {
            return [
                ...state,
                action.payload
            ];
        }
        // Очищення сховища з даними про фотографії
        case ANIMAL_TYPE_ACTIONS.CLEAR_IMAGES: {
            return [];
        }
        // За замовчанням повертається масив з файлами
        default: {
            return state;
        }
    }
}
// Експорт редюсера
export default animalImageReducer;