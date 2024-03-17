"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { getMarketNews, getMarketStatus } from "../lib/functions";
import { 
  Pagination, 
  Select, 
  SelectItem,
} from "@nextui-org/react";
import DisplayNews from "./display-news";

interface Params {
  data?: any;
}

interface NewsItem {
  id: string;
  image: string;
  headline: string;
  summary: string;
  url: string;
  datetime: number;
  source: string;
}

interface MarketStatus {
  exchange: string;
  holiday: string | null;
  isOpen: boolean;
  session: string;
  timezone: string;
  t: number;
}

export default function News(params: Params) {
  const categories: string[] = [
    "general", 
    "forex", 
    "crypto", 
    "merger"
  ];

  const [news, setNews] = useState<NewsItem[]>(params.data.news);
  const [category, setCategory] = useState<string>(categories[0]);
  const [marketStatus, setMarketStatus] = useState<MarketStatus>(params.data.status);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;


  useEffect(() => {
    setLoading(true);
    const updateData = async () => {
      try {
        // awaiting for response
        const resNews = await getMarketNews({ category });
        const resStatus = await getMarketStatus();
        
        // parsing the response
        const data: NewsItem[] = JSON.parse(resNews);
        const status: MarketStatus = JSON.parse(resStatus);
        
        // updating the state
        setCurrentPage(1);
        setNews(data);
        setMarketStatus(status);
      } catch (error) {
        console.error(error);
      }
    };
    
    updateData();
    setLoading(false);
  }, [category]);
  

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length/newsPerPage);

  return (
    <main className="w-full">
      <div className="flex flex-col font-extrabold mt-7 justify-center items-center my-auto">
        <h1 className="text-4xl self-center">
          Latest <span className="text-orange-800">market</span> news
        </h1>        
      </div>
      <div className="flex flex-row text-zinc-600 mt-1 px-6">
        Market is    
          <span className="px-1">
            {marketStatus.isOpen ? <span className=" text-green-400">open</span> : <span className="text-red-400">closed</span>}
          </span>      
      </div> 
      <div className="flex flex-wrap md:flex-nowrap justify-end m-10 mx-40 gap-4">
        <Select
          color="warning"
          label="Select a category"
          placeholder="General"
          className="max-w-xs"
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
          >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {/* To keep the first character uppercase */}
              {category.slice(0, 1).toUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </Select>
      </div>
      <DisplayNews news={currentNews} loading={loading}/>
      <div className="flex flex-row py-7 justify-center gap-4 items-center my-auto">
        <Pagination 
          loop
          showControls
          total={totalPages} 
          initialPage={indexOfFirstNews} 
          color="warning" 
          page={currentPage} 
          onChange={setCurrentPage}
        />
      </div>
    </main>
  );
}
