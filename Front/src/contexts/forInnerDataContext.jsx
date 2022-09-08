import React, { useState } from "react";
export const ForInnerDataContext = React.createContext({});

export default function ForInnerDataContextProvider({ children }) {
    const [totalPrice, settotalPrice] = useState(0);
    const [prodId, setprodId] = useState(null);
    const [loginInfo, setloginInfo] = useState(false);
    const [favInfo, setfavInfo] = useState(0);
    

    return (
        <ForInnerDataContext.Provider
            value={{
                totalPrice, settotalPrice,
                prodId, setprodId,
                loginInfo, setloginInfo,
                favInfo, setfavInfo,
            }}
        >
            {children}
        </ForInnerDataContext.Provider>
    )
}