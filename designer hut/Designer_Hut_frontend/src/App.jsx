import { BrowserRouter as Router , Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Navigation from './pages/NavigationMenu'
import Footer from './pages/Footer'
import RegisterPage from './pages/RegisterPage'

import FindJob from './pages/Find.Job'
import UploadDesign from './pages/UploadDesign'
import DesignView from './pages/DesignView'
import PostJob from './pages/PostJob'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import { api } from './api/api'
import { useDispatch, useSelector } from 'react-redux'
import { designData, jobData } from './redux/designerAssetsSlice'
import DesignDetails from './pages/DesignDetails'


function App() {
  const dispatch = useDispatch()
  
  const refreshToggle = useSelector((state) => state.assetslice.refreshToggle)
  useEffect(()=>{

    const fetchdata =async()=>{
     const data =  await api.get('/view/upload')
     dispatch(designData(data.data.uploadView))
    }
    fetchdata()

  },[dispatch,refreshToggle])

  useEffect(()=>{
    const fetchjob = async()=>{
       const job = await api.get('/view/postjob')
       console.log("job",job);
       
      dispatch(jobData(job.data.jobview))
    }
   fetchjob()
  },[])


  return (
    <>
   <div >
    <>
      
      
     <Router>
      <Navigation/>
   <Routes>
    <Route path='/' element={< Home/>}/>
    <Route  path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/jobpost' element={<PostJob/>}/>
    <Route path='/findjobs' element={< FindJob/>}/>
    <Route path='/UploadDesign' element={<UploadDesign/>}/>
    <Route path='/designview' element={<DesignView/>}/>
    <Route path='/DesignDetails/:id' element={<DesignDetails/>}/>
   </Routes>
     <Footer/>
   </Router>
   <Toaster richColors position="top-right" />
    </>
   </div>
       
    </>
  )
}

export default App
