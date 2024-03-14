import { getMarketNews, getMarketStatus } from "../lib/functions";
import DisplayNews from "./display-news";

interface DataResponse {
  news?: Array<object>,
  status?: object,
}

export default async function News() {
  const resNews = await getMarketNews({ category: "general" });
  const resStatus = await getMarketStatus();
  const data: DataResponse = {
    news: JSON.parse(resNews),
    status: JSON.parse(resStatus),
  }
  return (
    <DisplayNews data={data} />
  );
}
