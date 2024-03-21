"use client";

import { useState } from "react";
import { searchStocks } from "@/app/lib/functions";
import { Input } from "@nextui-org/react";
import type { Stock } from "@/types/globals";

export default function Search(params: { value: any }) {
  // search input
  const [input, setInput] = useState<string>("");
  const [stocks, setStocks] = useState<Stock[]>(params.value);

  async function updateStocks() {
      try {
        const data = await searchStocks({ searchValue: input });
        const stocks = JSON.parse(data);
        console.log(stocks);
        setStocks(stocks.result);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <>
        <Input 
          isClearable
          label="Stock"
          placeholder="Search stocks..."
          value={input}
          onValueChange={setInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateStocks()
            }
          }}
        />
      {
        input !== "" 
        &&
        <div>
          <ul className=" flex flex-col w-full max-h-48 overflow-y-auto bg-black border border-gray-300 rounded-md shadow-md">
            {stocks.map((stock: Stock) => (
              <li key={stock.symbol} className="flex px-4 py-2 cursor-pointer hover:bg-slate-700">
                <span className="mr-2">{stock.description}</span>
                <span className="font-semibold">{stock.symbol}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  )
}
