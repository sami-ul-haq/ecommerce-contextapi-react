import { createContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, filterReducer } from "./Reducer";

export const CartContext = createContext();

faker.seed(100);

const CartContextProvider = ({children}) => {

    const products = [...Array(20)].map(()=>({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.random.arrayElement([0,3,5,6,7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1,2,3,4,5])
    }));

    const initialState = {
        products:products,
        cart: []
    }

    const [state , dispatch] = useReducer(cartReducer , initialState);

    const [filterState, filterDispatch] = useReducer(filterReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      });

    return(
        <CartContext.Provider value={{state , dispatch, filterState , filterDispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;