import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { RootReducer } from './reducers/RootReducer';

// Стороннє ПО для забезпечення роботи redux
var middleware = [thunk];
// Створення обєкту сховища. Метод приймає кореневий редюсер і 
// додаткові налаштування для роботи з redux у браузері
const store = createStore(RootReducer, 
    composeWithDevTools(applyMiddleware(...middleware)));

// Експорт сховища
export default store;