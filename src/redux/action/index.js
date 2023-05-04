// For Add Item to Cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

// For Delete Item From Cart 
export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

//Remove Item
export const removeCart = (product) => {
    return {
        type: "REMOVEITEM",
        payload: product
    }
}

//Subtotal of all items
export const cartTotal=(product)=>{
    return{
        type:"TOTALAMOUNT",
        payload:product
    }
}