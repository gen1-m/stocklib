import Search from "@/components/Search";
import { searchStocks } from "../lib/functions";

interface Params {
  searchInput: string;
}

export default async function StockList(params: Params) {
  const randomSymbol: string = "test";
  const data = await searchStocks({ searchValue: randomSymbol });
  const parsedData = JSON.parse(data);
  
  return (
    <div className="flex flex-col justify-center items-center w-full p-10">
      <h1 className="text-3xl">
        StockList
      </h1>
      <div className="flex mt-3 self-start">
        <Search value={parsedData.result} />
      </div>
    </div>
  )
}
