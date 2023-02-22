import React from "react";
import Chat from "../components/Chat";
import FormProd from "../components/FormProd";
import Products from "../components/Products";

const MainContainer = () => {
    return <main>
        <FormProd />
        <Products />
        <Chat />
    </main>
}

export default MainContainer;