"use client";

import React from "react";
import { Input } from "./ui/input";

interface BaseSearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export const BaseSearch = ({ query, setQuery }: BaseSearchProps) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="relative w-full max-w-xs">
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
        className="w-full pl-10"
        autoFocus
        autoComplete="off"
      />
    </form>
  );
};
