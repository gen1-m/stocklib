"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { getMarketNews, getMarketStatus } from "../lib/functions";
import { 
  Pagination, 
  Select, 
  SelectItem,
  Button 
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
  const [popup, setPopup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;


  useEffect(() => {
    const fetchData = async () => {
      try {
        // awaiting for response
        const resNews = await getMarketNews({ category });
        const resStatus = await getMarketStatus();
        
        // parsing the response
        const data: NewsItem[] = JSON.parse(resNews);
        const status: MarketStatus = JSON.parse(resStatus);
        
        // updating the state
        setNews(data);
        setMarketStatus(status);
      } catch (error) {
        setLoading(true);
        console.error(error);
      }
    };

    fetchData();
  }, [category]);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length/newsPerPage);

  return (
    <main className="w-full">
      <div className="flex fixed p-3 mt-2 right-8">
        {popup && 
          <div className="bg-slate-700 rounded-xl text-slate-300 flex p-3">
            Market is    
              <span className="px-1">
                {marketStatus.isOpen ? <span className=" text-green-400">open</span> : <span className="text-red-600">closed</span>}
              </span>
              <button onClick={() => setPopup(false)}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24">
                    <path 
                      fill="currentColor" 
                        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 
                        15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 
                        3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 
                        1.35-3.175 2.138T12 22"
                    />
                </svg>
              </button>
          </div> 
        }
      </div>
      <div className="flex font-extrabold mt-7 justify-center">
        <h1 className="text-4xl self-center">
          Latest <span className="text-orange-800">market</span> news
        </h1>
      </div>
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
      <DisplayNews news={currentNews} loading={loading}/>
      <div className="flex flex-row py-7 justify-center gap-4 items-center my-auto">
        <Button
          size="md"
          variant="flat"
          color="warning"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Pagination 
          total={totalPages} 
          initialPage={indexOfFirstNews + 1} 
          color="warning" 
          page={currentPage} 
          onChange={setCurrentPage}
        />
        <Button
          size="md"
          variant="flat"
          color="warning"
          onPress={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
