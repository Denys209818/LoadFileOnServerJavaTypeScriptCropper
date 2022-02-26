import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { DefaultRoutes } from './routes/DefaultRoutes';

const App = () => {
  return (
    // Компонент, який відображається при завантаженні сторінки. fallback - приймає компонент, 
    // який відображається при загрузці
    <Suspense fallback={<div>Loading...</div>}>
      {/* Компонент, який синхронізує компонент інтерфейсу з шляхом */}
    <BrowserRouter>
      {/* Шляхи і компоненти для них */}
      <Routes>
        {/* Вказує шлях для шаблону. Даний компонент містить усі маршрути, які прилягали до даного шаблону */}
        {/* Атрибути path i element вказують на шлях до компонета і сам компонент */}
        <Route path='/' element={<DefaultLayout/>}>
            {DefaultRoutes.map((element, index) =>  {
             return <Route key={"default" + index.toString()} path={element.path} element={<element.element/>}/>
            })}
        </Route>
      </Routes>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
