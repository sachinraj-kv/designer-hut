import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import { api } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { Endpoint } from "@/constants/endpoints";

const Section = () => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [showModel, setShowModel] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef();
  const navigate = useNavigate();
  const designs = useSelector((state) => state?.assetslice?.designData ?? []);

  useEffect(() => {
    if (showModel) {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  }, [showModel]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showModel &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowModel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModel]);

  const handlesubmit = async (data) => {
    const advancedata = data.trim().replace(/\s+/g,"");
    
    const res = await api.post(Endpoint.SEARCH, {
      query: advancedata,
    });

    if (res?.data?.results?.length > 0) {
      navigate("search_result", { state: { result: res.data.results } });
    } else {
      console.log("No result found");
    }
  };

  const carouselItems = [
    {
      title: "UI Design",
      desc: "Clean and modern user interface samples.",
      img: "https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg/",
    },
    {
      title: "Web Projects",
      desc: "Responsive web designs and landing pages.",
      img: "https://images.pexels.com/photos/16023919/pexels-photo-16023919.jpeg",
    },
    {
      title: "Mobile App",
      desc: "Creative mobile app mockups.",
      img: "https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg",
    },
    {
      title: "Branding",
      desc: "Brand identity and logo inspiration.",
      img: "https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-5 gap-4 mt-20">
      <div className="font-extrabold flex flex-col justify-center gap-6 px-4 md:px-10 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Explore the
          <br />
          <span className="text-indigo-600">
            Best Designers Around the Globe
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 font-normal max-w-xl leading-relaxed">
          Discover exceptional work by world-class creatives prepared for your
          next project.
        </p>

        <div className="mt-6 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md w-full max-w-xl">
          <Search className="text-gray-500" />
          <Input
            onClick={() => setShowModel(true)}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search top designers..."
            className="border-none focus:ring-0 focus:outline-none focus-visible:ring-0 placeholder:text-gray-400 text-base"
          />

          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlesubmit(searchText);
            }}
            className="bg-black text-white hover:bg-gray-800 rounded-full px-4 py-2 text-sm font-medium"
          >
            Search
          </Button>
        </div>

        {showModel && (
          <div
            ref={searchRef}
            className="bg-gray-300 shadow-2xs border-2 mt-2 p-2 rounded-3xl"
          >
            <Searchmodel
              searchText={searchText}
              designs={designs}
              handlesubmit={handlesubmit}
              setShowModel={setShowModel}
            />
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="hidden md:flex justify-center items-center h-full">
          <Carousel
            opts={{ align: "start" }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            orientation="vertical"
            className="w-full max-w-[90%] sm:max-w-xs md:max-w-sm lg:max-w-md rounded-2xl shadow-xl p-10"
          >
            <CarouselContent className="-mt-1 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[360px] space-y-2">
              {carouselItems.map((ele, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 pt-1 md:basis-1/2"
                >
                  <div className="p-1">
                    <Card className="rounded-xl shadow-md hover:shadow-lg transition duration-300">
                      <CardContent className="p-0 overflow-hidden rounded-xl">
                        <img
                          src={ele.img}
                          alt={ele.title}
                          className="w-full h-[300px] sm:h-[180px] md:h-[200px] object-cover rounded-t-xl"
                        />
                        <div className="p-4 bg-white">
                          <h3 className="text-lg font-semibold text-indigo-700">
                            {ele.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {ele.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-md mt-10">
              <CircleChevronUp size={24} />
            </CarouselPrevious>
            <CarouselNext className="hidden md:block rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-md" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

const Searchmodel = ({ searchText, designs, handlesubmit, setShowModel }) => {
  const filteredDesigns = designs.filter(
    (design) =>
      design.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      design.category?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 max-h-64 overflow-y-auto">
      {filteredDesigns.length > 0 ? (
        <ul className="space-y-2">
          {filteredDesigns.map((item) => (
            <li
              onClick={(e) => {
                setShowModel(false);
                e.preventDefault();
                handlesubmit(item.category);
              }}
              key={item._id}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="text-sm text-gray-500 ml-2">
                {item.category}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm text-center">
          No matching designs found.
        </p>
      )}
    </div>
  );
};

export default Section;
