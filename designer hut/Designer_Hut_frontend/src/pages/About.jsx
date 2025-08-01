import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 mt-6">
     
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          About
        </h2>
        <div className="mt-3 h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
      </div>

     
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center  rounded-3xl shadow-xl p-8 lg:p-14">
       
        <div className="hidden md:block w-full h-full">
          <img
            src="https://cdn.mos.cms.futurecdn.net/CT9xCjqrhnPD4ivB6B8Hqe.jpg"
            alt="About Designer Hut"
            className=" w-full h-full object-cover shadow-md p-10 rounded-2xl"
          />
        </div>

        
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 text-balance">
            Welcome to <span className="text-indigo-600">Designer Hut</span> — a creative hub to empower, inspire, and connect talent.
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Whether you're a freelance designer, a creative enthusiast, or a brand seeking bold innovation — Designer Hut is your home.
            Explore the latest in branding, web design, UI/UX, illustration, and product design.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Showcase your finest work, gain exposure, and engage with a growing community that values aesthetics, originality, and connection.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We spotlight creative voices through simplicity, visibility, and a shared commitment to great design.
          </p>

          <div className="text-indigo-700 text-xl font-semibold space-y-1">
            <p> Upload. Inspire. Connect.</p>
            <p> Welcome to your creative playground.</p>
            <p> Welcome to Designer Hut.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
