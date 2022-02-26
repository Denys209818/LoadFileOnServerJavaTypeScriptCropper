import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AnimalActions from './animalAction';

// Хук, який зєднує усі дії з обєктом dispatch
export const useActions = () => 
{
    //  Формування обєкту з усіма діями
    const actions = {
        ...AnimalActions
    };
    // Формування обєкту dispatch
    var dispatch = useDispatch();
    //  Повернення колекції дій, де всі вони поєднані з dispatch і тепер 
    //  при викликанні не потребують викликання їх через обєкт dispatch
    return bindActionCreators(actions, dispatch);
}