"use client";
import { fontAtom } from "@/app/atom";
import { useAtom } from "jotai";
import React, { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

type Props = {};

export default function SelectFont({}: Props) {
  const fonts = ["sans serif", "serif", "mono"];
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [font, setFont] = useAtom(fontAtom);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div className="relative z-20 ">
      <div className="cursor-pointer" onClick={togglePopup}>
        Serif
      </div>
      {isOpen && (
        <div
          ref={ref}
          className="absolute  rounded-md w-[150px] flex flex-col items-start gap-3 shadow-lg px-6 py-3 top-10 right-[-40px] bg-white dark:bg-slate-800 capitalize"
        >
          {fonts.map((d, i) => (
            <button onClick={() => setFont(d)} key={i}>
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
