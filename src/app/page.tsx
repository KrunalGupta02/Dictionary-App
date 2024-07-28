"use client";

import DarkLightModeBtn from "@/components/DarkLightModeBtn";
import SearchBox from "@/components/SearchBox";
import SelectFont from "@/components/SelectFont";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import { RiBookLine } from "react-icons/ri";
import WordData, { ErrorResponse } from "./type";
import Meanings from "@/components/Meaning";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("hello"); // initial value
  const [errorMessage, setErrorMessage] = useState("");

  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;
  // here we have used the array in the wordData bcz data is coming in array
  const {
    isPending,
    error,
    refetch, // its like a useEffect hook
    data: wordData,
    // 1st one is for data and 2nd is for error
  } = useQuery<WordData[], ErrorResponse>({
    queryKey: ["wordData"],
    queryFn: () => fetch(api).then((res) => res.json()),
  });

  const data: WordData | null = wordData ? wordData[0] : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim() === "") {
      setErrorMessage("Input cannot be empty");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    refetch();
  };

  console.log("data", data);

  if (isPending)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  // Speech to text code
  const msg = new SpeechSynthesisUtterance();
  const speechHandler = (msg: SpeechSynthesisUtterance) => {
    msg.text = data?.word ?? "";
    window.speechSynthesis.speak(msg);
  };

  return (
    <div>
      <main className="max-w-[689px] flex flex-col gap-10 mx-auto pt-10 px-4">
        {/* Header */}
        <div className="w-full flex justify-between">
          <RiBookLine className="text-4xl text-gray-400" />

          <div className="flex items-center gap-4">
            <SelectFont />
            <div className="h-[50px] w-[1px] bg-gray-400"></div>
            <DarkLightModeBtn />
          </div>
        </div>
        {/* Search Bar */}
        <SearchBox
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={(e) => handleSubmit(e)}
        />
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}

        {/* Main */}
        {!data ? (
          <div className="flex flex-col gap-5 text-center">
            <p className="text-7xl ">😓</p>
            <h2 className="text-xl font-bold">No definition found</h2>
            <p className="text-lg">{`We coundn't find the definition for the work you are looking for...`}</p>
          </div>
        ) : (
          <section className="flex flex-col gap-8">
            {/* Search Item */}
            <section className="flex flex-col gap-1">
              <div className="flex justify-between w-full">
                <h1 className="text-[50px] font-bold text-3xl sm:text-[64px]">
                  {data?.word ?? ""}
                </h1>
                {/* play btn */}
                <button
                  onClick={() => speechHandler(msg)}
                  className="group h-16 w-16 rounded-full bg-purple/20 hover:bg-purple flex items-center justify-center text-4xl transition-all"
                >
                  <IoIosPlay className="text-purple group-hover:text-white transition-all" />
                </button>
              </div>
              <p className="text-2xl text-purple">{data?.phonetic}</p>
            </section>
            {/* noun */}
            {data?.meanings.map((d, i) => (
              <Meanings
                key={i}
                antonyms={d.antonyms}
                definitions={d.definitions}
                partOfSpeech={d.partOfSpeech}
                synonyms={d.synonyms}
              />
            ))}

            {/* Verb */}
            {/* <Meanings /> */}
            <hr />

            {/* Source */}
            {data?.sourceUrls && data.sourceUrls.length > 0 ? (
              <div className="mb-12">
                <p>Source</p>
                <Link
                  className="flex items-center gap-2"
                  href={data.sourceUrls[0]}
                  target="_blank"
                >
                  <span>{data?.sourceUrls}</span>
                  <FaExternalLinkAlt className="text-sm text-gray-400" />
                </Link>
              </div>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}
