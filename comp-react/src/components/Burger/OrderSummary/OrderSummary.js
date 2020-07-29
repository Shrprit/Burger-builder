import React, {Component} from 'react';

import Auxi from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
    render () {
     const ingredientSummary = Object.keys(this.props.ingredient)
     .map( igKey => {
     return ( <li key={igKey}>
         <span style={{textTransform: 'capitalize'}}>{igKey}</span>
         :{this.props.ingredient[igKey]}</li>)
     })
    return (
     <Auxi>
     <h1> Your Order </h1>
     <p>A delicious Burger with following ingredient </p>
      <ul>
          {ingredientSummary}
      </ul>
    <p><strong>Total price: {this.props.price.toFixed('2')}</strong></p>
        <p> Continue to checkOut ?? </p>
        <Button btnType = "Success" clicked = {this.props.purchaseContinued}>CONTINUE</Button>
        <Button btnType = "Danger" clicked = {this.props.purchaseCanceled}>CANCEL</Button>
     </Auxi>
    );
    }
};

export default OrderSummary;