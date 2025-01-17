import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox({ value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="relative z-10 flex items-center">
      <input
        value={value}
        onChange={onChange}
        type="text"
        className="h-12 sm:h-[64px] w-full px-4 rounded-2xl outline-purple pr-8 bg-slate-200 dark:bg-slate-900"
        placeholder="Search any word..."
      />
      <button className="absolute right-3 text-2xl sm:text-3xl text-purple/70">
        <IoIosSearch />
      </button>
    </form>
  );
}
