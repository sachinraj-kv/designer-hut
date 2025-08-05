import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user : null,
    authenticate  : false,
    token : null,
    designData : [],
    jobData :[]
}



const designerAssetsSlice = createSlice({
    name : "designerAssetsSlice",   
    initialState,
    reducers:{
        loginData : (state , action)=>{
            state.user = action.payload.user 
            state.authenticate  = action.payload.authenticate 
            state.token = action.payload.token

         
            
        },
        designData:(state , action)=>{
            state.designData = action.payload
        },
        jobData : (state , action)=>{
            state.jobData = action.payload
        }
        
        
    }

})




export const {designData  ,jobData ,loginData} = designerAssetsSlice.actions
export default designerAssetsSlice.reducer 