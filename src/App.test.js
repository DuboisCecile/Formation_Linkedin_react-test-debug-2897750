import { useReducer } from 'react';
import { renderHook, act } from '@testing-library/react';
import { ADD_ITEM, CHECK_ITEM, REMOVE_ITEMS } from './context';
import reducer, { initialState } from './context/reducer';

// On teste qu'on va bien ajouter un élémment todo à la liste
test('should add item to items', () => {
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [, dispatch] = result.current;
    act(() => {
        dispatch({ type: ADD_ITEM, payload: { value: 'new value' } });
    });

    const [state] = result.current;
    // On avait bien 2 items dans le state initial, et on en a ajouté 1, on vérifie donc qu'il y en a bien 3
    expect(state.items).toHaveLength(3);
});

// On vérifie que les todo complétés sont bien retirés de la liste, une fois complétés
test('should remove todos done', () => {
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [, dispatch] = result.current;
    // act(() => {
    //     dispatch({ type: CHECK_ITEM, payload: { id: 123 } }) // On cible l'objet avec l'id 123
    // });

    // const [state] = result.current;
    // On a un échec car on reçoit 2 éléments au lieu de 1 : [{"done": true, "id": 123, "value": "item #1"}, {"done": false, "id": 124, "value": "item #2"}], cela a juste mis true à done
    // expect(state.items).toHaveLength(1);

    act(() => {
        dispatch({ type: CHECK_ITEM, payload: { id: 123 } }); // On cible l'objet avec l'id 123
        dispatch({ type: REMOVE_ITEMS }); // On supprime les éléments complétés
    });

    const [state] = result.current;
    // Cette fois-ci, ça passe car on a retiré l'élément avec l'id 123
    expect(state.items).toHaveLength(1);
});
