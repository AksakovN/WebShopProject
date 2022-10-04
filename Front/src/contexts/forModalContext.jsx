import React, { useState } from "react";
export const ForModalContext = React.createContext({});

export default function ForModalContextProvider({ children }) {
    const [catalog, setcatalog] = useState(false);
    const [cart, setcart] = useState(false);
    const [userPanel, setuserPanel] = useState(false);
    const [pagination_detail, setpagination_detail] = useState(false);

    return (
        <ForModalContext.Provider
            value={{
                catalog, setcatalog,
                cart, setcart,
                userPanel, setuserPanel,
                pagination_detail, setpagination_detail,
            }}
        >
            {children}
        </ForModalContext.Provider>
    )
}