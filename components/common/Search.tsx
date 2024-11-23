"use client";

import { useStore } from "@/store/store";
import { LuSearch } from "react-icons/lu";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const { searchQuery, setSearchQuery } = useStore();
  return (
    <div className="  relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 px-2 pr-10 border bg-white/50 border-gray-400 rounded-lg outline-none focus-within:border-primary/75 placeholder:text-xs"
      />
      <LuSearch size={20} className="absolute right-2 top-3  text-gray-500 " />
    </div>
  );
};

export default Search;
