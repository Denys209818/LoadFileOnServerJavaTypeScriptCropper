import { Dispatch } from "react";
import axios, {AxiosError} from "axios";
import { AnimalActions, IServerReturnedError } from "../redux/reducers/animalTypes";
import { AddImageModel } from "./types";
import axiosService from "../services/axiosService";
import {ANIMAL_TYPE_ACTIONS} from '../redux/reducers/animalTypes';

// Дія, яка виникає, коли фотографія відпраляється на сервер.
// Через axios відправляється фотографія і зберігається назва фотографії (на сервері) через redux у сховище
export const animalAction = (data: AddImageModel) => (dispatch:Dispatch<AnimalActions>) =>
{
    try 
    {
        // Відправка зображення на сервер
        axiosService.addImage(data)
        .then(imgObject => {
            // Відправка отриманої інформації про збережений файл у redux
            dispatch({
                type: ANIMAL_TYPE_ACTIONS.ADD_ANIMAL_IMAGE,
                payload: {
                    filename: imgObject.filename
                }
            });
        });
    }
    catch(ex) 
    {
        // Перевірка чи помилка належить до помилок axios
        if(axios.isAxiosError(ex)) {
            // Приведення помилки до типу AxiosError
            const serverError : AxiosError = ex;
            // Якщо приведення успішне та є відповідь помилки
            if(serverError && serverError.response) 
            {
                // Отримання данних помики і повернення цих даних у промісі
                const {data} = serverError.response;
                return Promise.reject(data);
            }
        }
    }
}

// Дія, яка очищує колекцію, у якій є елементи, що містять інформацію про збереження фотографій.
//  Приймає тільки обєкт dispatch, який передається автоматично
export const clearImages = () => (dispatch:Dispatch<AnimalActions>) => 
{
    try 
    {
        //  Викликання події очищення колекції
        dispatch({type: ANIMAL_TYPE_ACTIONS.CLEAR_IMAGES});
    }
    catch(ex) 
    {
        // Виведення помилки
        console.log(ex);
    }
}