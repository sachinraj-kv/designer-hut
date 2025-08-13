import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Equal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import MegaMenuSection from "@/layout/MegaMenuSection";
import SecondaryMenu from "@/layout/SecondaryMenu";
import DialogDemo from "@/layout/DialogDemo";
import { useSelector } from "react-redux";
import { Endpoint } from "@/constants/endpoints";
import { RoutesURL } from "@/constants/route";



const Navigation = ({ aboutRef, supportRef }) => {

const state_Token = useSelector((state)=> state?.assetslice?.token?? "")

const [cookietoken , setcookietoken] = useState("")
  useEffect(()=>{
      const token = Cookies.get("token");
       if (token && token.length > 0) {
      setcookietoken(token);
    }
  },[state_Token])

  const [isToggled, setIsToggled] = useState(false);

  const menuRef = useRef();

  const [token, setToken] = useState("");
  const [loginuser , setloginuser] = useState("")
  const [auth , setauth] = useState("")
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("designerhut_user") || "{}");
    setauth(local?.isauthenticated?? "")
    setloginuser(local?.user?.role ?? "")
    setToken(local?.token ?? "");
  }, [cookietoken]);

  console.log("loginuser",auth);
  


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isToggled &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsToggled(false);
      }
    };
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
        setIsToggled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isToggled]);

  const handlerllogout = async () => {
    try {
      const response = await api.post(Endpoint.LOGOUT, {}, { withCredentials: true });

      if (response.data.success) {
        localStorage.removeItem("designerhut_user");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleroot = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  handleroot();

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-md rounded-b-2xl px-6 py-4 mx-4 md:mx-6 mt-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/">
              <div onClick={handleroot}>
                <img
                  src="https://i.pinimg.com/736x/00/5d/0e/005d0e8541a54d345338efe6aa36aa2c.jpg"
                  alt="logo"
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
            </Link>

            <div className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">

             {auth ? (
  loginuser === "user" ? (
    <Dropdown label="Hire Designer" />
  ) : (
    <Dropdown label="Design" />
  )
) : (
  <div className="invisible"></div>
)}
            
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
                  support
                </div>
              </Link>
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
              {cookietoken ? (
                <div className="invisible"></div>
              ):(
                 <Link
                to="/register"
                className="hover:text-indigo-600 transition-colors"
              >
                Create Account
              </Link>
              )}
             {loginuser !== "user" ? (  <Link
                to="/findjobs"
                className="hover:text-indigo-600 transition-colors"
              >
                Find Job
              </Link>):(<div className="invisible"></div>)}
            
              <Link to={RoutesURL.MYAPPLICATION}>
               <div>My Applications</div>
              </Link>
             
            </div>
          </div>

          <div className="flex items-center gap-0 md:gap-4 text-sm font-medium text-gray-700">
            {cookietoken ? (
              <Button
                onClick={handlerllogout}
                className="bg-gray-950 hover:bg-red-600 text-white fon rounded-4xl"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-gray-800 text-white hover:bg-green-600 rounded-4xl">
                  Login
                </Button>
              </Link>
            )}

            {cookietoken ? (
              <DialogDemo />
            ) : (
              <Link to={"/login"}>
                <Button>
                  <img
                    src="https://tse1.explicit.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="flag"
                    className="h-7 w-7 rounded-full border"
                  />
                </Button>
              </Link>
            )}
            <button
              onClick={() => setIsToggled(!isToggled)}
              className="md:hidden p-2 rounded-full transition"
            >
              {isToggled ? <X /> : <Equal />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isToggled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-30 left-0 right-0 z-40 px-4 md:hidden"
          >
            <div
              ref={menuRef}
              className="w-full max-w-[90vw] sm:max-w-[500px] mx-auto bg-cover bg-center bg-no-repeat rounded-2xl p-6 shadow-lg"
              style={{
                backgroundImage:
                  "url('https://wallpapercave.com/wp/wp12537711.jpg')",
              }}
            >
              <div className="rounded-xl p-4 shadow-md ">
                <ResponsiveModel setIsToggled={setIsToggled} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Navigation;

function Dropdown({ label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const dropdownRef = useRef();
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    if (isMobile) setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => setIsOpen(true), 150);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => setIsOpen(false), 200);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="hover:text-gray-300 flex items-center gap-1"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown size={19} className="mt-1" />
      </button>

      <div
        className={`mt-2 rounded-lg w-[200px] z-50 text-black 
          ${
            isMobile ? (isOpen ? "flex" : "hidden") : isOpen ? "flex" : "hidden"
          } 
          md:absolute md:top-full md:left-0`}
      >
        {label === "Hire Designer" ? <MegaMenuSection /> : <SecondaryMenu />}
      </div>
    </div>
  );
}

function ResponsiveModel({ setIsToggled, aboutRef, supportRef, auth, loginuser, cookietoken }) {
  return (
    <motion.ul
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {/* Conditional Dropdown */}
      {auth ? (
        loginuser === "user" ? (
          <li className="font-bold hover:text-gray-300">
            <Dropdown label="Hire Designer" />
          </li>
        ) : (
          <li className="font-bold hover:text-gray-300">
            <Dropdown label="Design" />
          </li>
        )
      ) : (
        <div className="invisible"></div>
      )}

      {/* Support */}
      <li className="font-bold hover:text-gray-300">
        <Link to={"/"} onClick={() => setIsToggled(false)}>
          <div
            className="cursor-pointer"
            onClick={() =>
              supportRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Support
          </div>
        </Link>
      </li>

      {/* About */}
      <li className="font-bold hover:text-gray-300">
        <Link to={"/"} onClick={() => setIsToggled(false)}>
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

      {/* Create Account */}
      {!cookietoken && (
        <li className="font-bold hover:text-indigo-600">
          <Link to="/register" onClick={() => setIsToggled(false)}>
            Create Account
          </Link>
        </li>
      )}

      {/* Find Job */}
      {loginuser !== "user" ? (
        <li className="font-bold hover:text-indigo-600">
          <Link to="/findjobs" onClick={() => setIsToggled(false)}>
            Find Job
          </Link>
        </li>
      ) : (
        <div className="invisible"></div>
      )}

      {/* My Applications */}
      <li className="font-bold hover:text-indigo-600">
        <Link to={RoutesURL.MYAPPLICATION} onClick={() => setIsToggled(false)}>
          My Applications
        </Link>
      </li>
    </motion.ul>
  );
}




