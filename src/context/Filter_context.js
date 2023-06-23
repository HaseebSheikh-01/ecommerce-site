import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
filter_products: [],
all_products: [],
grid_view: true,
sorting_value: "lowest",
}

export const FilterContextProvider =({children}) => {
const {products} = useProductContext();
// console.log("FilterContextProvider",products);

const [state, dispatch] = useReducer(reducer, initialState);

const setGridView = () => {
    return dispatch({type: "SET_GRIDVIEW"})
}

const setListView = () => {
    return dispatch({type: "SET_LISTVIEW"})
}

// sorting function
const sorting = () => {
dispatch({type: "GET_SORT_VALUE"});
}


// to sort the product
useEffect(()=>{
    dispatch({type:"SORTING_PRODUCTS", payload: products})
},[state.sorting_value])

useEffect(()=>{
dispatch({type: "LOAD_FILTER_PRODUCTS",payload: products});
},[products]);

return <FilterContext.Provider value={{...state, setGridView, setListView, sorting}}>
{children}
</FilterContext.Provider>

}

export const useFilterContext = () => {
    return useContext(FilterContext);
}