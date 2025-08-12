
import { useEffect } from 'react'
import { api } from './api/api'
import { useDispatch } from 'react-redux'
import { designData, jobData } from './redux/designerAssetsSlice'
import AppRouter from './Routes.jsx/APPRoute'
import { Endpoint } from './constants/endpoints'




function App() {
  const dispatch = useDispatch()
   
  useEffect(()=>{

    const fetchdata =async()=>{
     try {
      const data =  await api.get(Endpoint.UPLOAD_VIEW)
      
     dispatch(designData(data.data.uploadView))
     } catch (error) {

      console.log(error.message);
      
     }
    }
    fetchdata()

  },[dispatch])

  useEffect(()=>{
    const fetchjob = async()=>{
      try {
         const job = await api.get(Endpoint.JOB_VIEW)
       
       
      dispatch(jobData(job.data.jobview))
      } catch (error) {
        console.log(error.message);
        
      }
    }
   fetchjob()
  },[])

  return (
  <div>
    <AppRouter/>
  </div>
  )
}

export default App
