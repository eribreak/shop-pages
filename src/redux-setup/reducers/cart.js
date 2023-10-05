import { ADD_TO_CART } from "../../shared/constants/action-type";

const initState = {
    items: [],
};

const addToCart = (state, payload) => {
    const items = state.items;
    let isProductExist = false;
    items.map((item) => {
        if (item._id === payload._id) {
            item.qty += payload.qty;
            isProductExist = true;
        }
        return item;
    });

    const newItems = isProductExist ? items: [...items,payload];
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    return {...state, items: newItems}
};

export default (state = initState, action) => {
    switch(action.type){
        case ADD_TO_CART: return addToCart(state, action.payload);
        default: return state;
    }
}