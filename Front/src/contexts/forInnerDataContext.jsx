import React, { useState } from "react";
export const ForInnerDataContext = React.createContext({});

export default function ForInnerDataContextProvider({ children }) {
    const [totalPrice, settotalPrice] = useState(0);
    const [prodId, setprodId] = useState(null);
    const [loginInfo, setloginInfo] = useState(false);
    

    return (
        <ForInnerDataContext.Provider
            value={{
                totalPrice, settotalPrice,
                prodId, setprodId,
                loginInfo, setloginInfo,
            }}
        >
            {children}
        </ForInnerDataContext.Provider>
    )
}