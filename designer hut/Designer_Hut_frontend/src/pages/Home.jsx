import React, { useRef } from 'react'
import Content from './Content'
import About from './About'
import Support from './Support'
import DesignGallery from './Section'


const Home = () => {

  return (
    <div>
         
    <DesignGallery/>
    <Content/>
    <div >
      <About/>
    </div>
    
    <Support/>
    
  
    </div>
  )
}

export default Home