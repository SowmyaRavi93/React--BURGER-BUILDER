import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


const Ingredient_Prices = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1,
    bacon: 1
};


class  BurgerBuilder extends Component {
    state ={
        // should have key value pairs, wher key is ingredient and value is amount(how many)
        //ingredients: {
            //salad: 0,
            //bacon: 0,
            //cheese:0,
            //meat : 0
        //},
        //as we are fetching data from backend, set it to null
      

        purchasing : false,
        loading : false
    }

    //componentDidMount() to fetch data

    componentDidMount() {
       {/* axios.get('https://react-myburger-d08d3.firebaseio.com/ingredients.json')
        .then (response => {
            this.setState({ingredients: response.data});

        })
    .catch(error => {});*/}
    }



    updatePurchaseState (ingredients) {
        
        //turn theabove ingredients object into an array
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];

        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;

    }

  /*  with redux this is removed
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = Ingredient_Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        
    this.updatePurchaseState(updatedIngredients);
}

        removeIngredientHandler = (type) =>{
            const oldCount = this.state.ingredients[type];
            if (oldCount <= 0){
                return;
            }
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = Ingredient_Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
         this.updatePurchaseState(updatedIngredients);
    }*/

    //for Modal to dispaly or not
    purchaseHandler = () =>  {
        this.setState({purchasing: true});
    }

    //For not continuing
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    //for continuing
    purchaseContinueHandler = () => {
        //alert ('You Continue!');
/*const queryParams = [];
for (let i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price=' + this.state.totalPrice);
const queryString = queryParams.join('&');

// history special prop provided by router
        this.props.history.push({
            pathname: '/checkout',
        search : '?' + queryString
        });
    }*/
this.props.history.push('/checkout');
}



    
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            // update disabledInfo key
            disabledInfo[key] = disabledInfo[key] <=0
            //disabledInfo[key] <=0 check if is true or false
            //ie. meat: true, salad:false
        }

        let orderSummary = null;

        
        

        let burger =<Spinner />
        if (this.props.ings){
            burger= (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                     <BuildControls
                       ingredientAdded ={this.props.onIngredientAdded} 
                       ingredientRemoved = {this.props.onIngredientRemoved} 
                        disabled = {disabledInfo}
                       purchasable = {this.updatePurchaseState(this.props.ings)}
                       ordered ={this.purchaseHandler}
                       price={this.props.price}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
        ingredients = {this.props.ings}
        price = {this.props.price.toFixed(2)}
        purchaseCancelled = {this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler}/>;

        }
        if (this.state.loading){
            orderSummary = <Spinner/>;
        }
         
        return(
            <Aux>
                <Modal show = { this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
        }
    }
      // to define which props we get in burgerbuilder

      const mapStateToProps = state => {
          return {
              ings: state.ingredients,
              price: state.totalPrice
          };
      }

      const mapDispatchToProps = dispatch => {
          return {
              onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
              onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
          }
      }

// use hoc withErrorHandler with axios to get message from the server


export default connect( mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));