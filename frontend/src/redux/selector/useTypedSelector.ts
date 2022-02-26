import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { RootReducers } from '../reducers/RootReducer';

// Створення та експорт типізованого селектора. Тип TypedUseSelectorHook є типізованим і приймає кореневий редюсер,
// для визначення усіх редюсерів у типізованому селекторі
export const useTypedSelector : TypedUseSelectorHook<RootReducers> = useSelector;