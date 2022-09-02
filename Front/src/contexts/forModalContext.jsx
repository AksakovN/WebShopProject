import React, { useState } from "react";
export const ForModalContext = React.createContext({});

export default function ForModalContextProvider({ children }) {
    const [catalog, setcatalog] = useState(false);
    const [cart, setcart] = useState(false);
    const [userPanel, setuserPanel] = useState(false);

    return (
        <ForModalContext.Provider
            value={{
                catalog, setcatalog,
                cart, setcart,
                userPanel, setuserPanel,
            }}
        >
            {children}
        </ForModalContext.Provider>
    )
}