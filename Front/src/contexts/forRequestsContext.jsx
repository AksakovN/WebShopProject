import React, { useState } from "react";
export const ForRequestsContext = React.createContext({});

export default function ForRequestsContextProvider({ children }) {
    const [products, setproducts] = useState([]);
    const [productsPage, setproductsPage] = useState([]);
    const [getCatalog, setgetCatalog] = useState([]);
    const [getSubcategory, setgetSubcategory] = useState([]);
    const [prodInfo, setprodInfo] = useState([]);
    return (
        <ForRequestsContext.Provider
            value={{
                products, setproducts,
                productsPage, setproductsPage,
                getCatalog, setgetCatalog,
                getSubcategory, setgetSubcategory,
                prodInfo, setprodInfo,
            }}
        >
            {children}
        </ForRequestsContext.Provider>
    )
}