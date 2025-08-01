
import { configureStore } from '@reduxjs/toolkit';
import designerAssetsSlice from './designerAssetsSlice'


const store = configureStore({
    reducer :{
        assetslice : designerAssetsSlice
    }
})

export default store;