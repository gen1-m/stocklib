"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { getMarketNews } from "../lib/functions";
import Image from "next/image";
import { marked } from "marked";
import { Tooltip, Select, SelectItem } from "@nextui-org/react";

interface Params {
  category?: string;
  data?: any;
}

interface MarketItem {
  id: string;
  image: string;
  headline: string;
  summary: string;
  url: string;
  datetime: number;
  source: string;
}

export default function DisplayNews(params: Params) {
  const categories: string[] = ["general", "forex", "crypto", "merger"];

  const [market, setMarket] = useState<MarketItem[]>(params.data);
  const [category, setCategory] = useState<string>(categories[0]);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await getMarketNews({ category });
        const data: MarketItem[] = JSON.parse(res);
        setMarket(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarket();
  }, [category]);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  function parseMd(string: string): string {
    return marked(string, { async: false })
      .toString()
      .replace(/<[^>]*>/g, "");
  }

  function unixTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  return (
    <main className="w-full">
      <h1 className="text-4xl font-extrabold text-center mt-7">
        Latest <span className="text-orange-800">market</span> news
      </h1>
      <div className="flex flex-wrap md:flex-nowrap justify-end m-10 mx-40 gap-4">
        <Select
          color="warning"
          label="Select a category"
          placeholder="General"
          className="max-w-xs"
          value={category}
          onChange={handleCategory}
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {/* To keep the first character uppercase */}
              {category.slice(0, 1).toUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap justify-center">
        {/* Top market */}
        {market.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center m-3 p-6 border-2 border-orange-700 rounded-xl max-w-sm"
          >
            {item.image ? (
              <Image
                className="mb-4 rounded-sm items-center w-auto h-auto"
                src={item.image}
                width={300}
                height={300}
                alt="Thumbnail"
                priority={true}
              />
            ) : (
              <div className="flex flex-col items-center w-auto h-auto p-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="flex flex-1 mb-4"
                >
                  <path
                    fill="currentColor"
                    d="m20.475 23.3l-2.3-2.3H5q-.825 0-1.413-.588T3 19V5.825L.7 3.5l1.4-1.4l19.8 19.8l-1.425 1.4ZM5 19h11.175l-2-2H6l3-4l2 
                        2.725l.85-1.05L5 7.825V19Zm16-.825l-2-2V5H7.825l-2-2H19q.825 0 1.413.588T21 5v13.175Zm-7.525-7.525ZM10.6 13.425Z"
                  />
                </svg>
                <p>No Image</p>
              </div>
            )}
            <h2 className="text-lg font-semibold">{item.headline}</h2>
            {/* Checking if there is a summary or not */}
            {item.summary ? (
              <p className="flex-1 mt-2 mb-2 text-gray-400 text-ellipsis overflow-hidden">
                {item.summary.length > 250
                  ? `${parseMd(item.summary.substring(0, 250))}...`
                  : parseMd(item.summary)}
              </p>
            ) : (
              <p className="flex-1 mt-2 mb-2 text-gray-400 text-ellipsis overflow-hidden text-center">
                No Summary. Please click the link below.
              </p>
            )}
            <a
              href={item.url}
              className="self-start text-blue-500 hover:text-violet-700"
            >
              Read more..
            </a>
            <Tooltip content={unixTimestampToDate(item.datetime).toString()}>
              <p className="self-end text-gray-500 hover:text-sky-500">
                {item.source}
              </p>
            </Tooltip>
          </div>
        ))}
      </div>
    </main>
  );
}
