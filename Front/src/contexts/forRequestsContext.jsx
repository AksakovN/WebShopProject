import React, { useState } from "react";
export const ForRequestsContext = React.createContext({});

export default function ForRequestsContextProvider({ children }) {
    const [products, setproducts] = useState([]);
    const [getCatalog, setgetCatalog] = useState([]);
    const [getSubcategory, setgetSubcategory] = useState([]);
    return (
        <ForRequestsContext.Provider
            value={{
                products, setproducts,
                getCatalog, setgetCatalog,
                getSubcategory, setgetSubcategory,
            }}
        >
            {children}
        </ForRequestsContext.Provider>
    )
}