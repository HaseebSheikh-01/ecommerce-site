import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import reducer from '../reducer/productReducer';
const appContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
};

const AppProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts =async (url) => {
        dispatch({type: "SET_LOADING"});
try {
    const res = await axios.get(url);
    const products = await res.data;
    dispatch({type: "SET_API_DATA",payload: products});
    // console.log("hehe",res);
} catch (error) {
    dispatch({type: "API_ERROR"});
}
    };  

    const getSingleProduct = async (url) => {
         dispatch({type: "SET_SINGLE_LOADING"});
        try {
            const res = await axios.get(url);
    const singleProduct = await res.data;
dispatch({type: "SET_SINGLE_PRODUCT",payload: singleProduct});        
} catch (error) {
             dispatch({type: "SET_SINGLE_ERROR"});
        }
    };

    useEffect (() =>{
        getProducts(API);
    },[]);

return <appContext.Provider value={{...state, getSingleProduct}}>{children}</appContext.Provider>
};
const useProductContext = () =>{
return useContext(appContext);
};

export {AppProvider, appContext, useProductContext};