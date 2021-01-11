import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './BurgerIngredient/BurgerIngredient.css';


// method to transfer an Object of keyvalue pairs into array of burger ingredients where value of object gives howmany ingredients are needed and key for which type of ingredient
//as ingredients is an object it has to be transformme into array of value of ingredients. mapcan be used only on array
//.keys()=> extracts the keys of a given object and turns that into an array.Eg: string asalad, bacon

//Object is JS
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        //new array to construct.Eg: Array(length) => Array(3) will give an array of 3 undefined spaces ie, 3 empty spaces.
        // _ is blank element
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key = {igKey + i} type ={igKey}/>
        });
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    }, []);
    if (transformedIngredients.length===0){
        transformedIngredients = <p>Please add ingredients!</p>
    }
    return(
        <div className='Burger'> 
            <BurgerIngredient type ="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type ="bread-bottom"/>
        </div>
    );
};
export default burger; 