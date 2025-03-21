import { marked } from "marked";

interface Params {
  category?: string;
  searchValue?: string;
  exchange?: string;
}

async function getMarketNews( params: Params ): Promise<any> {
  const host = process.env.NEXT_PUBLIC_BASE_URL_HOST;
  const category = params.category;
  try {
    const res = await fetch(`${host}/api/finnhub?category=${category}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

async function getMarketStatus() : Promise<any> {
  const host = process.env.NEXT_PUBLIC_BASE_URL_HOST;
  const exchange = "US";
  try {
    const res = await fetch(`${host}/api/finnhub?exchange=${exchange}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return Response.error();
  }

}

async function searchStocks({ params }: { params: Params }): Promise<any> {
  const host = process.env.NEXT_PUBLIC_BASE_URL_HOST;
  const searchValue = params.searchValue;

  try {
    let url = `${host}/api/finnhub?searchValue=${searchValue}`;
    const res = await fetch(url, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

function parseMd(string: string): string {
  return marked(string, { async: false })
    .toString()
    .replace(/<[^>]*>/g, "");
}

function unixTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export { getMarketNews, getMarketStatus, searchStocks, parseMd, unixTimestampToDate };
