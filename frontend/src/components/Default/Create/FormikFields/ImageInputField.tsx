import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { Modal, Row, Col } from 'antd';
import { useRef, useState } from 'react';

// Інтерфейс для вхідних данних компонента вибірки фотографій
interface ImageCropperProps 
{
    // Відношення сторін
    aspectRatio: number,
    // метод, який передає сформовану фотографію
    successLoad: (base64: string) => void
}

const ImageInputField: React.FC<ImageCropperProps> = ({aspectRatio, successLoad}) => 
{
    // Стан, який містить обєкт кропера
    const [cropperObj, setCropperObj] = useState<Cropper>();
    
    // Стан, який вказує чи відображається модальне вікно
    const [visible, setVisible] = useState(false);
    // Посилання на фотографію (на яку буде накладатися фільтр кропера)
    const imageRef = useRef<HTMLImageElement>(null);
    // Посилання на передоглядну фотографію
    const imagePreview = useRef<HTMLImageElement>(null);

    // Подія, яка виникає при зміні фотографії у input
    const onChangeImage = async (e: any) => 
    {
        // Отримання файлу з обєкту події поля
        var file = (e.target.files as FileList)[0];
        // Перевірка наявності файлу
        if(file) 
        {
            // Формування посилання до зображення на основі обєкту
            var urlImage = URL.createObjectURL(file);
            // Відображення модального вікна
            await setVisible(true);
            //    Ініціалізація кропера
                var cropper = cropperObj ? cropperObj : new Cropper(imageRef.current as HTMLImageElement, {
                    aspectRatio: aspectRatio,
                    preview: imagePreview.current as HTMLImageElement,
                    viewMode: 1
               });
            // Заміна фотографії кропера
            cropper?.replace(urlImage);
            // Встановлення нового обєкту кропера
            setCropperObj(cropper);
        }
    }
    // Подія яка виникає при нажатті ок на модальному вікні
    const onOkHandler = () => 
    {
        // Закривання модального вікна
        setVisible(false);
        // Отримання відредагованої фотографії у форматі base64
        var base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
        // Викликання метода, який передає сформовану фотографію для відправки на сервер
        successLoad(base64);
    }

    return (<>
        {/* Створення Bootstrap-блоку рядка */}
        <div className="mt-4 col-md-3">
            {/* Створення label, який зсилається на поле для загрузки фотографій */}
            <label htmlFor="images" className="form-label" id="addImage">
                {/* Відображення фотографії, при нажатті на яку відкривається вікно для вибірки файлів */}
                <img width="150" src="http://localhost:8800/files/add.png"/>
                <p>Додати фотографію</p>
            </label>
            {/* Поле для вибірки файлів */}
            <input type="file" id="images" onChange={onChangeImage} name="images" className="d-none"/>
            {/* Формування antd модального вікна */}
            <Modal
            // Заголовок модального вікна
            title="Редагування фотографії"
            // Вирівнювання модального вікна по центру
            centered
            // Чи відображено модальне вікно
            visible={visible}
            // Подія, яка виникає при нажатті на ок на модальному вікні 
            onOk={() => {
                onOkHandler()}}
            // Ширина модального вікна
            width={1000}
            // Властивість вказує на те, що модальне вікно не можна закрити постороннім клацанням
            closable={false}
            // Текст кнопки ok
            okText="Підтвердити"
            // Стилі для кнопки скасувати
            cancelButtonProps={{ disabled: true, style:{display:'none'} }}
        >
            {/* Рядок antd */}
            <Row>
                {/* Колонка, яка містить фотографію, на яку накладається фільтр cropper */}
                <Col md={16} xs={24}>
                    <img ref={imageRef} width="100%"/>
                </Col>
                {/* Колонка, яка містить фотографію для попереднього перегляду */}
                <Col offset={2} md={6} xs={24}>
                    {/* Блок для preview фотографії */}
                    <div style={{
                        height: "150px",
                        border: "1px solid silver",
                        overflow: "hidden"
                    }} ref={imagePreview}>
                        
                    </div>
                </Col>
            </Row>
        </Modal>
        </div>
    </>);
}
// Експорт поля для додавання фотографій
export default ImageInputField;