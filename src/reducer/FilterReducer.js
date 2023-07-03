const filterReducer = (state, action) => {

    switch(action.type){
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem) => curElem.price);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",
        priceArr
      );
            let maxPrice = Math.max(...priceArr);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",
        maxPrice
      );
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice },
            };

            
        
        case "SET_GRIDVIEW":
            return {
                ...state,
                grid_view: true
            }
            
        case "SET_LISTVIEW":
            return {
                ...state,
                grid_view: false
            }    

        case "GET_SORT_VALUE":
            let userSortValue = document.getElementById("sort");    
            let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
       console.log(sort_value);
            return {
                ...state,
                sorting_value: sort_value,
            } 
            
            case "SORTING_PRODUCTS":
            let newSortData;
            let tempSortProduct = [...action.payload];
            
            if(state.sorting_value === "lowest"){
                const sortingProducts = (a,b) => {
                        return a.price - b.price;
                };
                newSortData = tempSortProduct.sort(sortingProducts);
            }

            if(state.sorting_value === "highest"){
                const sortingProducts = (a,b) => {
                        return b.price - a.price;
                };
                newSortData = tempSortProduct.sort(sortingProducts);
            }

            if(state.sorting_value === "a-z"){
                newSortData = tempSortProduct.sort((a,b)=>{
                   return a.name.localeCompare(b.name);                    

                })
            }

            if(state.sorting_value === "z-a"){
                newSortData = tempSortProduct.sort((a,b)=>{
                   return b.name.localeCompare(a.name);                    

                })
            }
            return {
                ...state,
                filter_products: newSortData,
            } 

            case "UPDATE_FILTERS_VALUE":
                const {name,value}= action.payload;
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                         [name] : value,
                    }
                }
            
                case "FILTER_PRODUCTS":
                let {all_products} = state;
                let tempFilterProduct = [...all_products];

                const {text,category,company,color,price} = state.filters;
                
                if(text){
                    tempFilterProduct = tempFilterProduct.filter((curElem) => {
                        return curElem.name.toLowerCase().includes(text);
                    });
                }
                if(category !== "all"){
                    tempFilterProduct = tempFilterProduct.filter(
                        (curElem)=>curElem.category === category
                    );
                }

                if(company !== "all"){
                    tempFilterProduct = tempFilterProduct.filter(
                        (curElem)=>curElem.company.toLowerCase() === company.toLowerCase()
                    );
                }
                
                if(color !== "all"){
                    tempFilterProduct = tempFilterProduct.filter(
                    (curElem)=>  curElem.colors.includes(color)   
                    );
                }

                

                if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price == price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }
      return {
        ...state,
        filter_products: tempFilterProduct,
      };

        case "CLEAR_FILTERS":
            return{
                ...state,
                filters:{
                    ...state.filters,
                    text: "",
                    category: "all",
                    company: "all",
                    color: "all",
                    maxPrice: 0,
                    price: state.filters.maxPrice,
                    minPrice: state.filters.maxPrice,
                }
            }

        default:
             return state
    }

};

export default filterReducer;