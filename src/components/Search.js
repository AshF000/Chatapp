import React from "react";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";

const Search = () => {
  return (
    <div className="xl:w-[427px] relative ">
      <input
        type="search"
        placeholder="Search"
        className=" shadow-[0px_5px_4px_rgba(0,0,0,0.15)] rounded-[20px] py-[18px] pl-[78px] pr-[30px] active:outline-0 w-full placeholder:text-[16px]"
      />
      <BiSearch className="absolute top-[37%] left-[5%] text-[19px] " />
      <BiDotsVerticalRounded className="absolute top-[34%] right-[5%] text-primary text-[24px]" />
    </div>
  );
};

export default Search;
