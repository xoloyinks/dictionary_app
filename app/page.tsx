"use client"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from 'next/image'
import backgrounImage from "./images/24973054-seamless-pattern-design-with-hebrew-letters-and-judaic-icons.jpg";

import {MdDarkMode,MdLightMode} from "react-icons/md"
import {GiBookCover} from 'react-icons/gi'
import {AiOutlineStar} from 'react-icons/ai'
import {FiSearch} from "react-icons/fi"
import {RxSpeakerLoud} from "react-icons/rx"

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }
  return (
    <button
      className={`w-fit absolute right-5 top-4 sm:top-2 p-2 rounded-md sm:text-4xl text-xl hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933] z-50`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MdDarkMode/> : <MdLightMode />}
    </button>
  );
};

const Meaning = ({partOfSpeech, definition}) => {
  return(
  <>
      <div>
        <span className="font-semibold text-yellow-600 dark:text-yellow-500"><i>{partOfSpeech}</i></span>
          <p className="text-[12px] tracking-wide">
          {definition.map((datum, key) => {return ( <><span className="flex items-center"><p key={key} className="my-2">{datum.definition}</p></span></>)})}
          </p>
      </div>
  </>)
}

export default function Home() {
  const [search, setsearch] = useState("boy");
  const [word, setword] = useState("");
  const [phonetic, setphonetic] = useState("");
  const [meanings, setmeanings] = useState([]);
  const [synonyms, setSynonyms] = useState([]);

  const handleSearch = async(e) => {
    e.preventDefault();

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);
    const data = await response.json();
    if(response.status === 200){
      setword(data[0].word);
      setphonetic(data[0].phonetic);
      setmeanings(data[0].meanings);
      setSynonyms(data[0].meanings[0].synonyms);
    }
    
  }
  
  return (
    <>
      <section className='relative w-screen h-screen'>
        <div className='absolute z-20 w-full h-full dark:bg-black/80 bg-white/25 backdrop-blur-xl'></div>
        <Image src={backgrounImage} width={0} height={0} alt='Background image' className='absolute z-0 w-full h-full ' />
        {/* Toggle button */}
        <div className="absolute z-30 flex items-center justify-center w-full h-full">
            <ThemeSwitcher />

            {/* DICTIONARY BODY */}
            <div className="sm:w-5/12 w-full h-full relative sm:rounded-xl sm:h-[85%] bg-gray-300/60 dark:bg-black/25 backdrop-blur-sm check shadow-xl shadow-black/25 dark:shadow-gray-600/25 px-5 py-3 overflow-hidden">
              {/* LOGO */}
              <div className="sm:flex sm:justify-between">
                <span className="flex items-center text-3xl text-black dark:text-white">
                  <GiBookCover/>
                  <span className="text-2xl font-bold logo"> x-find</span>
                </span>

                <form onSubmit={handleSearch} action="" className="flex justify-between mt-8 border-b-2 sm:mt-auto sm:w-6/12 border-black/25 dark:border-white/25 ">
                    <input onChange={(e) => setsearch(e.target.value)} type="search" placeholder="Search word"
                    name="search" value={search} id="search" className="text-sm bg-transparent focus:outline-0 w-[90%]" />
                    <button><FiSearch/></button>
                </form>
              </div>

              <br />

              {/* WORD */}
              <div className="flex items-center justify-between text-4xl font-bold">
               <span>{word}</span>
               <span className="text-2xl font-semibold cursor-pointer"><RxSpeakerLoud /></span>
              </div>
              <div className="flex items-center justify-between py-3 my-3 border-y-2 border-black/25 dark:border-white/25">
                <span className="font-semibold "> <i>pronounced:</i> {phonetic} </span>
                <button className="text-2xl"><AiOutlineStar/></button>
              </div>
             <div className="text-[12px] font-bold dark:font-semibold mb-3" >
              <span><i>synonyms: </i></span>
                {
                  synonyms.map((datum, key) => <span key={key}>{datum}, </span>)
                }
             </div>
              <div className="h-[70%] overflow-y-scroll py-3">
              {
                meanings.map((datum, key) => <Meaning key={key} partOfSpeech={datum.partOfSpeech} definition={datum.definitions} />)
              }

            
              </div>
            </div>
        </div>
      </section>
    </>
  )
}