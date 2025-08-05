import React from 'react';
import Content from './Content';
import About from './About';
import Support from './Support';
import DesignGallery from './Section';

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
