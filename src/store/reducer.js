import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese : 0,
        meat: 0

    },
    totalPrice: 4
};

const Ingredient_Prices = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1,
    bacon: 1
};
//create the reducer 

const reducer = (state= initialState,action) => {

//to handel the 2 actions set up in action.js
switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
        return {

            // create a copy of the state and add new ingredients
            ...state,
            ingredients: {
                ...state.ingredients,
                // to overwrite the copy that is got above (...state.ingredients), to add a new ingredient
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            }, 
            totalPrice: state.totalPrice + Ingredient_Prices[action.ingredientName]
        };
    case actionTypes.REMOVE_INGREDIENT:
        return {

            // create a copy of the state and add new ingredients
            ...state,
            ingredients: {
                ...state.ingredients,
                // to overwrite the copy that is got above (...state.ingredients), to delete a ingredient -1
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            }, 
            totalPrice: state.totlaPrice - Ingredient_Prices[action.ingredientName]
        };
    default:
        return state;
}
};

export default reducer;