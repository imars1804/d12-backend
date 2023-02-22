import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsTest from "../components/ProductsTest";
import MainContainer from "../containers/MainContainer";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Ups, parece que hubo un error</h1>,
        children: [
            {
                path: "/",
                element: <MainContainer />
            },
            {
                path: "/productos-test",
                element: <ProductsTest />
            }
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />
};

export default Router;