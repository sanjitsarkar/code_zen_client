export const initialCodeState = {
    "data":{},
    "loading":true,
    "errors":{}
}

export const codeReducer = (state = initialCodeState,action) => {
   switch (action.type) {
       case "LOADING":
           return {
               ...state,
               loading:true
           }
       case "SUCCESS":
           return {
               ...state,
               loading:false,
               data:action.payload
           }
       case "FAILURE":
           return {
            ...state,
            loading:false,
            errors:action.payload
           }
           
   
       default:
        state
   }
}

