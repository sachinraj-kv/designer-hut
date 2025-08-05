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
import { useEffect, useRef } from 'react'
import { api } from './api/api'
import { useDispatch, useSelector } from 'react-redux'
import { designData, jobData } from './redux/designerAssetsSlice'
import DesignDetails from './pages/DesignDetails'
import JobDetails from './pages/JobDetails'
import SearchData from './pages/SearchData'
import UserJobView from './pages/UserJobView'


function App() {
  const dispatch = useDispatch()
    const aboutRef = useRef(null); 
    const supportRef = useRef(null);

  useEffect(()=>{

    const fetchdata =async()=>{
     try {
      const data =  await api.get('/view/upload')
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
         const job = await api.get('/view/postjob')
       console.log("job",job);
       
      dispatch(jobData(job.data.jobview))
      } catch (error) {
        console.log(error.message);
        
      }
    }
   fetchjob()
  },[])


  return (
    <>
   <div >
    <>
      
      
     <Router>
      <Navigation aboutRef={aboutRef} supportRef={supportRef}  />
   <Routes>
    <Route path='/' element={< Home aboutRef={aboutRef}  supportRef={supportRef} />}/>
    <Route  path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/jobpost' element={<PostJob/>}/>
    <Route path='/findjobs' element={< FindJob/>}/>
    <Route path='/UploadDesign' element={<UploadDesign/>}/>
    <Route path='/designview' element={<DesignView/>}/>
    <Route path='/DesignDetails/:id' element={<DesignDetails/>}/>
    <Route path='/JobDetail/:id' element={<JobDetails/>}/> 
    <Route path='/search_result' element={<SearchData/>}/>
    <Route path='/jobview' element={<UserJobView/>}/>
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
