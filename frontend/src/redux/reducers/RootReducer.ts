import { combineReducers } from "redux";
import animalImageReducer from "./animalImageReducer";

// Експорт кореневого редюсера, який містить усі редюсери
export const RootReducer = combineReducers({
    // Редюсер, який містить усі зображення (назви файлів), щоб використати їх при відображенні фотографій та додаванні тварин
    animalImages: animalImageReducer 
});
// Експорт типу кореневого редюсера, для типізованого визначення усіх включених у кореневий редюсер редюсерів
export type RootReducers = ReturnType<typeof RootReducer>;