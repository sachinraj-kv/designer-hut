import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user : null,
    isauteticate : false,
    token : null,
    designData : [],
    refreshToggle: false,
    jobData :[]
}



const designerAssetsSlice = createSlice({
    name : "designerAssetsSlice",   
    initialState,
    reducers:{
        loginData : (state , action)=>{
            state.user = action.payload.user
            state.isauteticate = action.isauthenticated
            state.token = action.token
        },
        designData:(state , action)=>{
            state.designData = action.payload
            
        },
         triggerRefresh: (state) => {
        state.refreshToggle = !state.refreshToggle
        },
        jobData : (state , action)=>{
            state.jobData = action.payload
        }
        
        
    }

})




export const {designData ,refreshToggle ,jobData ,loginData} = designerAssetsSlice.actions
export default designerAssetsSlice.reducer 