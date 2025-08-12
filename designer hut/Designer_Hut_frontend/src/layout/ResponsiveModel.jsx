import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Dropdown from './Dropdown';



const  ResponsiveModel=({ setIsToggled, aboutRef, supportRef })=> {
  return (
    <motion.ul
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      <li className="font-bold hover:text-gray-300">
        <Dropdown label="Hire Designer" />
      </li>
      <li className="font-bold hover:text-gray-300">
        <Dropdown label="Design" />
      </li>
      <li className="font-bold hover:text-gray-300">
        {" "}
        <Link to={"/"}>
          <div
            className="cursor-pointer"
            onClick={() =>
              aboutRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            About
          </div>
        </Link>
      </li>
      <li className="font-bold hover:text-gray-300">
        <Link to={"/"}>
          <div
            className="cursor-pointer"
            onClick={() =>
              supportRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            suppport
          </div>
        </Link>
      </li>

      <li className="font-bold hover:text-indigo-600">
        <Link to="/register" onClick={() => setIsToggled(false)}>
          Create Account
        </Link>
      </li>
      <li className="font-bold hover:text-indigo-600">
        <Link to="/findjobs" onClick={() => setIsToggled(false)}>
          Find Job
        </Link>
      </li>
    </motion.ul>
  );
}
export default ResponsiveModel