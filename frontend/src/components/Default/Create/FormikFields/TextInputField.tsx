import classNames from "classnames";
import React from "react";

// Інтерфейс з властивостями поля 
// label - заголовок поля 
// type - тип інпута поля 
// field - назва поля 
// onChangeHandler - подія яка змінює властивість форміка
// error - помилка, яка може виникати на це поле
// touched - вказує чи поле нажато (активне)
export interface FieldProps 
{
    label: string,
    type: 'text' | 'number',
    field: string,
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: undefined | string,
    touched?: boolean 
}


const TextInputField : React.FC<FieldProps> = ({label, type, field, onChangeHandler, error = null, touched}) => 
{
    return (<>
    {/* Блок для групи форми */}
        <div className="form-group mt-3">
            {/* Заголовок для текстового поля, яке звязується з полем через id i htmlFor */}
            <label htmlFor={field} className="form-label">{label}</label>
            {/* Текстове поле */}
            <input className={classNames("form-control", 
            {"is-invalid" : error && touched},
            {"is-valid" : !error && touched}
            )} onChange={onChangeHandler} id={field} type={type} name={field}/>
            {/* Блок, який виводиться при наявності помилок і виводить помилки */}
            {touched && error && 
                <div className="invalid-feedback">
                    {/* Текст помилки */}
                    {error}
                </div>}
        </div>
    </>);
}
// Експорт текстового поля
export default TextInputField;