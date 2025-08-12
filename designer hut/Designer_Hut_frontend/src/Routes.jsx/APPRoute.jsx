import LoginPage from '@/auth/LoginPage'
import PostJob from '@/auth/PostJob'
import RegisterPage from '@/auth/RegisterPage'
import UploadDesign from '@/auth/UploadDesign'
import DesignDetails from '@/pages/DesignDetails'
import DesignView from '@/pages/DesignView'
import FindJob from '@/pages/Find.Job'
import Footer from '@/pages/Footer'
import Home from '@/pages/Home'
import JobDetails from '@/pages/JobDetails'

import Navigation from '@/pages/NavigationMenu'


import SearchData from '@/pages/SearchData'

import UserJobView from '@/pages/UserJobView'
import React, { useRef } from 'react'
import { BrowserRouter as Router , Route ,Routes} from 'react-router-dom'
import { Toaster } from 'sonner'
import { RoutesURL } from '@/constants/route' 

const AppRouter = () => {
    const aboutRef = useRef(null);
  const supportRef = useRef(null);
  return (
      
    
   <div >
    <>
     <Router>
      <Navigation aboutRef={aboutRef} supportRef={supportRef}  />
   <Routes>
    <Route path={RoutesURL.HOME} element={< Home aboutRef={aboutRef}  supportRef={supportRef} />}/>
    <Route path={RoutesURL.LOGIN} element={<LoginPage/>}/>
    <Route path={RoutesURL.REGISTER} element={<RegisterPage/>}/>
    <Route path={RoutesURL.JOBPOST} element={<PostJob/>}/>
    <Route path={RoutesURL.FINDJOB} element={< FindJob/>}/>
    <Route path={RoutesURL.UPLOADS} element={<UploadDesign/>}/>
    <Route path={RoutesURL.UPLOAD_VIEW} element={<DesignView/>}/>
    <Route path={RoutesURL.UPLOAD_DETAILS()} element={<DesignDetails/>}/>
    <Route path={RoutesURL.JOB_DETAILS()} element={<JobDetails/>}/> 
    <Route path={RoutesURL.SEARCH_RESULT} element={<SearchData/>}/>
    <Route path={RoutesURL.JOB_VIEW} element={<UserJobView/>}/>
    </Routes>
     <Footer/>
   </Router>
   <Toaster richColors position="top-right" />
    </>
   </div>
       
  
  )
}

export default AppRouter