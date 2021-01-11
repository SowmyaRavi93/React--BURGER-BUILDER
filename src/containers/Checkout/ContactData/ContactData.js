import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect} from 'react-redux';

class ContactData extends Component {
    // to create form dynamically 

    state = {
        orderForm: {
           
                name: {
                    elementType: 'input',// HTML tag,input 
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid: false,
                    touched: false
                },
                
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input', 
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',// HTML tag,input 
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid: false,
                    touched: false
                },
                delivery: {
                    elementType: 'select',
                    elementConfig: {
                        options: [ 
                            { value: 'fastest', displayValue: 'Fastest'},
                            { value: 'cheapeast', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ' cheapest ',
                    validation:  {},
                    valid:true
                }

        },
        formIsValid: false,
        loading: false
    }
    orderHandler =(event) => {

            event.preventDefault();// to prevent send a request automatically that would reload the page

            console.log(this.props.ingredients);
            // loading: true because request is being sent
        this.setState({loading: true});
        const formData = {};
        //formElementIdentifier is country, name, email etc
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;

        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
            
        }

    // to send/ store data
    // for firebase put .json format, orders is the node that gets created in firebase 
    axios.post('/orders.json', order)
    .then(response => {
        //To stop showing the spinner, to stop loading, purchasing: false => to not display modal 
       this.setState({ loading: false});
       this.props.history.push('/');

   })
   .catch(error => {
    //To stop showing the spinner, to stop loading
   this.setState({ loading: false});
   });

}
checkValidity(value,rules) {
    //should return true or false
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        //.trim() to remove any white spaces before and after
        isValid = value.trim() !== '';

    }
    return isValid;
}
inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
        
    };
    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm)   {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    } 

    this.setState ( { orderForm : updatedOrderForm, formIsValid: formIsValid});
}

render(){
    // to convert orderForm into an array so we can loop through, key is name, street,country ets and value is the whole value in them  
    const formElementsArray = [];
    for ( let key in this.state.orderForm) {
        formElementsArray.push ({
            id: key,
            config: this.state.orderForm[key]
        });

    }
    let form = (
        <form onSubmit = { this.orderHandler}>
            {/* should pass 3 items */}
                    
                    {formElementsArray.map(formElement => (
                        <Input 
                            key ={formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = { formElement.config.value}
                            invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched={formElement.config.touched}
                            changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                    ))}
                    
                    <Button btnType= "Success" disabled={!this.state.formIsValid} >Order</Button>



                </form>
    );
    if (this.state.loading) {
        form = <Spinner />;
    }
    return(
            <div className = { classes.ContactData}>
                <h4> Enter your Contact Details</h4>
                {form}

                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect( mapStateToProps) (ContactData);