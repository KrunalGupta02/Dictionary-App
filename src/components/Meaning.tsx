import { Meaning } from "@/app/type";
import React from "react";

type Props = {};

export default function Meanings({
  partOfSpeech,
  definitions,
  antonyms,
  synonyms,
}: Meaning) {
  return (
    <>
      <div className="flex gap-5 items-center ">
        <p className="text-2xl italic font-bold">{partOfSpeech}</p>
        <div className="w-full h-[2px] bg-gray-200 rounded-full " />
      </div>

      {/* Meaning */}
      <section className="flex flex-col gap-3 ">
        <p className="text-xl">Meaning</p>

        {definitions
          ? definitions.map((d, i) => (
              <ul key={i} className="text-lg">
                {/* 1 data  */}
                <li className="flex gap-2 items-center">
                  <div className="h-1.5 w-1.5 bg-purple rounded-full" />
                  <p>{d.definition}</p>
                </li>
              </ul>
            ))
          : null}
      </section>

      {/* Synonyms */}
      {synonyms.length > 0 && (
        <div className="flex gap-4 items-center">
          <p className="text-xl text-gray-400">Synonymns:-</p>
          <p>{synonyms.map((d) => d).join(", ")}</p>
        </div>
      )}
    </>
  );
}
