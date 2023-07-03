import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
filter_products: [],
all_products: [],
grid_view: true,
sorting_value: "lowest",
filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
}
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


// to clear the filters
const clearFilters = () => {
    dispatch({type: "CLEAR_FILTERS"})
}

// sorting function
const sorting = () => {
dispatch({type: "GET_SORT_VALUE"});
}

const updateFilterValue = (event) => {
let name = event.target.name;
let value = event.target.value;

return dispatch({type: "UPDATE_FILTERS_VALUE",payload: {name,value}});
};

// to sort the product
useEffect(()=>{
    // dispatch({type: "FILTER_PRODUCTS"});
    dispatch({type:"SORTING_PRODUCTS", payload: products});
},[products,state.sorting_value])

useEffect(()=>{
    dispatch({type: "FILTER_PRODUCTS"});
    
},[state.filters])

useEffect(()=>{
dispatch({type: "LOAD_FILTER_PRODUCTS",payload: products});
},[products]);

return <FilterContext.Provider value={{...state, setGridView, setListView, sorting, updateFilterValue, clearFilters,}}>
{children}
</FilterContext.Provider>

}

export const useFilterContext = () => {
    return useContext(FilterContext);
}