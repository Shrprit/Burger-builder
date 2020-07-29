import React, { Component } from 'react';
import Auxi from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
          salad: 0.5,
          bacon: 0.6,
          cheese: 0.4,
          meat: 1.7,
};
class BurgerBuilder extends Component {
    state = {
        ingredient:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalprice: 4,
        purchasable: false,
        purchased: false,
    }
    updatePurchaseState (ingredient) {
            const sum = Object.keys(ingredient).map(
                igKey => {
                    return ingredient[igKey] ;
                }
            ).reduce((sum ,el) => { 
                return sum + el;
            }, 0);
            this.setState({purchasable: sum>0})
    };
    purchaseHandler = () => {
         this.setState({purchased: true})
    }
    purchaseCancelHandler = () => {
        this.setState({
           purchased: false
        })
    }
    purchaseContinueHandler = () => {
        alert('You Continue!');
    }
    addIngredientHandler = (type) => {
         const  oldCount = this.state.ingredient[type];
         const  updatedCount = oldCount + 1;
         const  updatedIngredient = {
             ...this.state.ingredient
         };
          updatedIngredient[type] = updatedCount;
          const priceAddition = INGREDIENT_PRICES[type];
          const oldPrice = this.state.totalprice;
          const newPrice = oldPrice + priceAddition ;
          this.setState(
            {  totalprice: newPrice , 
            ingredient: {...updatedIngredient},
            }
          );
          this.updatePurchaseState (updatedIngredient);
    }
    removeIngredientHandler = (type) => {
        const  oldCount = this.state.ingredient[type];
        if(oldCount <= 0)
        return
        const  updatedCount = oldCount - 1;
        const  updatedIngredient = {
            ...this.state.ingredient
        };
         updatedIngredient[type] = updatedCount;
         const priceDeduction = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalprice;
         const newPrice = oldPrice - priceDeduction ;
         this.setState(
           {  totalprice: newPrice , 
           ingredient: {...updatedIngredient},
           }
         );
         this.updatePurchaseState (updatedIngredient);
    }
  
    render() {
        let disableInfo = {
            ...this.state.ingredient
        };
        for (let key in disableInfo)
        disableInfo[key] = disableInfo[key] <= 0
        return (
            <Auxi>
                <Modal show = {this.state.purchased} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredient = {this.state.ingredient}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.state.totalprice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredient}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemove = {this.removeIngredientHandler} 
                disable = {disableInfo}
                price = {this.state.totalprice}
                purchase = {this.state.purchasable}
                ordered = {this.purchaseHandler}/>
            </Auxi>
        )
    }
};
export default BurgerBuilder;