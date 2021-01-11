import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component {
    

   /* componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        //ingredients object
        const ingredients = {};
        let price = 0;
        //.entries to loop through different queryparams
        for (let param of query.entries()){
            if (param[0] === 'price') {
                price = param[1];
            } else {
                // will be in ['salad' , '1'] format
            ingredients[param[0]] = +param[1];
        }
            }
            
        this.setState({ingredients: ingredients, totalPrice: price})
    }*/

    checkoutCancelHandeller =() => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return(
            <div>
                <CheckoutSummary 
                ingredients = { this.props.ings }
                checkoutCancelled = { this.checkoutCancelHandeller}
                checkoutContinued = { this.checkoutContinuedHandler} />
                <Route path = {this.props.match.path + '/contact-data'} 
                //component = {ContactData} to call component or
                component = { ContactData} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect (mapStateToProps) (Checkout);
