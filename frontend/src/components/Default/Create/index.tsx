import { Form, FormikProvider, useFormik } from "formik";
import { AnimalAddModel, AnimalModel } from "./types";
import yupValidation from "./yupValidation";
import {Row, Col,  Button, message} from 'antd';
import TextInputField from "./FormikFields/TextInputField";
import ImageInputField from "./FormikFields/ImageInputField";
import { useActions } from "../../../actions/useActions";
import { useTypedSelector } from "../../../redux/selector/useTypedSelector";
import { urlBackend } from "../../../services/axiosCreate";
import axiosService from "../../../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Create: React.FC = () => 
{
    const key = 'updatable';
    // Стан, який визначає чи кнопка для додавання доступна чи ні
    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    // Обєкт який відповідає за перенаправлення на іншу сторінку
    const navigate = useNavigate();
    // Подія, яка відпрацьовує при натисканні кнопки підтвердити (на формі)
    const onSubmitHandler = (values: AnimalModel) => 
    {
        // Формування обєкту для відправки на сервер (з даних моделі та redux)
        var animalAddModel:AnimalAddModel = 
        {
            name: values.name,
            animalType: values.animalType,
            age: values.age,
            imagesNames: [
                ...(animalImages.map((el) => {
                    return el.filename;
                }))
            ]
        }
        // Відкривання інформуйочого вікна
        message.loading({ content: 'Загрузка...', key });
        // Блокування кнопки
        setAddButtonDisabled(true);
        axiosService.addAnimal(animalAddModel).then(res => {
            // Коли дані успішно відправлено і дії на сервері виконані відображається інформаційне вікно
            // яке повідомляє про успішну загрузку. content: контент вікна; key: ключ вікна 
            // (необхідно щоб він спіпадав з попереднім ключем для синхронної роботи);
            // duration: тривалість (в секундах)
            message.success({ content: 'Загружено!', key, duration: 2 }).then(ok => {
                //  Викликання події для очищення сховища з інформацією про фотографії
                clearImages();
                // Розблокування кнопки
                setAddButtonDisabled(false);
                // Переадресація на головну сторінку
                navigate("/");
            });

        });
    }

    // Ініціалізація початкових даних моделі
    const initialValues: AnimalModel = 
    {
        name: '',
        animalType:'',
        age: ''
    }
    // Ініціалізація обєкту форміка
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema:yupValidation,
        onSubmit: onSubmitHandler
    });
    // Отримання необхідних методів та обєктів з форміка
    const {handleChange, handleSubmit, errors, touched} = formik;
    // Отримання необхідних подій
    const {animalAction, clearImages} = useActions();
    // Отримання сховища інформації про фотографії з redux (масив з даними про фотографії) 
    const animalImages = useTypedSelector(redux => redux.animalImages);
    // Метод, який виникає, коли на модальному вікні було підтверджене редагування фотографії. Приймає строку base64
    const onSuccessEvent = (data: string) => 
    {
        // Дія, яка додає фотографію про тварину на сервер
        animalAction({
            base64: data
        });
    }

    return (<>
        {/* Створення ряда сітки */}
        <Row className="mt-3">
            {/* Центральна колонка  */}
            <Col offset={6} md={12} xs={24}>
                {/* Заголовок */}
                <h2 className="text-center">Додати нову тварину</h2>
                {/* Провайдер форміка, який ініціалує форміка на основі створеного обєкта */}
                <FormikProvider value={formik}>
                    {/* Сама форма */}
                    <Form onSubmit={handleSubmit}>
                        {/* Текстове поле 
                        type - тип поля
                        label - заголовок для поля
                        field - назва поля
                        onChangeHandler - метод, який змінює стан форміка
                        error - помилка поля форміка
                        touched - подія, яка вказує чи поле нажате
                        */}
                        <TextInputField
                            type="text"
                            label="Ім'я тварини"
                            field="name"
                            onChangeHandler={handleChange}
                            error={errors.name}
                            touched={touched.name}
                        />
                        <TextInputField
                            type="text"
                            label="Тип тварини"
                            field="animalType"
                            onChangeHandler={handleChange}
                            error={errors.animalType}
                            touched={touched.animalType}
                        />
                        <TextInputField
                            type="number"
                            label="Вік тварини"
                            field="age"
                            onChangeHandler={handleChange}
                            error={errors.age}
                            touched={touched.age}
                        />
                        {/* Створення bootstrap-рядка */}
                        <div className="row">
                            {/* Відображення усіх доданих фотографій */}
                            {animalImages.map((element, index) => {
                                return (
                                    <div key={"img" + index.toString()} className="col-md-3 mt-4">
                                <img width="150" src={urlBackend + '/files/' + element.filename}/>
                                </div>)
                            })}
                            {/* Поле для додавання фотографій (кнопка із зображенням) */}
                            {/* Даний компонент містить cropper */}
                            {/* aspectRation - відношення сторін для cropper
                            successLoad - метод, який викликається, коли кропер сформував base64 фотографію */}
                            <ImageInputField
                            aspectRatio={1/1}
                            successLoad={onSuccessEvent}
                            />
                        </div>
                        {/* Кнопка для підтвердження форми */}
                        <input type="submit" disabled={addButtonDisabled} value="Додати нову тварину" className="btn btn-success mt-4"/>
                    </Form>
                </FormikProvider>
            </Col>
        </Row>
    </>);
}

export default Create;