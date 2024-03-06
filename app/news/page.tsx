
import { getMarketNews } from "../lib/functions";
import DisplayNews from "./display-news";

export default async function News() {
  const res = await getMarketNews({ category: "general" }); 
  const data = JSON.parse(res);

  return (
    <DisplayNews data={data} />
  )
}
