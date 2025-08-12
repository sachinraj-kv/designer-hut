import React from 'react';
import Content from './Content';
import DesignGallery from '../static/Section';
import About from '@/static/About';
import Support from './Support';

const Home = ({ aboutRef ,supportRef}) => {
  return (
    <div>
      <DesignGallery />
      <Content />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={supportRef}>
    <Support />
      </div>   
      
    </div>
  );
};

export default Home;
