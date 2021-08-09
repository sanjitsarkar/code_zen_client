export const initialRunCodeState = {
    "data":{},
    "loading":false,
    "errors":{}
}
export const runCodeReducer = (state = initialSaveCodeState,action) => {
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