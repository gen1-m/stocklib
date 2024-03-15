import { getMarketNews, getMarketStatus } from "../lib/functions";
import News from "./news";

interface DataResponse {
  news?: Array<object>,
  status?: object,
}

export default async function NewsPage() {
  const resNews = await getMarketNews({ category: "general" });
  const resStatus = await getMarketStatus();
  const data: DataResponse = {
    news: JSON.parse(resNews),
    status: JSON.parse(resStatus),
  }
  return (
    <News data={data} />
  );
}
