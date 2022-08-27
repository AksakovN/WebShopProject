import React, { useState } from "react";
export const ForInnerDataContext = React.createContext({});

export default function ForInnerDataContextProvider({ children }) {
    const [cartItem, setcartItem] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [prodId, setprodId] = useState(null);
    

    return (
        <ForInnerDataContext.Provider
            value={{
                cartItem, setcartItem,
                totalPrice, settotalPrice,
                prodId, setprodId,
            }}
        >
            {children}
        </ForInnerDataContext.Provider>
    )
}