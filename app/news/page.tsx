
import { getMarketNews } from "../lib/functions";
import DisplayNews from "./display-news";

export default async function News() {
  const category: string = "general";
  const res = await getMarketNews({ category }); 


  return (
    <DisplayNews data={res} />
  )
}
