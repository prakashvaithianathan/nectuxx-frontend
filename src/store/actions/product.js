export const addProduct = (product)=>{
    return {type:"ADD_PRODUCT",product}
}



export const updateProduct = (product)=>{
   
    return {type:"UPDATE_PRODUCT",product}
}

export const sendProduct = (product)=>{
    return {type:"SEND_PRODUCT",product}
}

export const deleteProduct=(product)=>{
    return {type:"DELETE_PRODUCT",product}
}


export const clearAddProduct = (product)=>{
    return {type:'CLEAR_PRODUCT',product}
}

export const searchProducts = (product)=>{
    return {type:'SEARCH_PRODUCT',product}
}