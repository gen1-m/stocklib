export async function getMarketNews( params: { category?: string} ): Promise<any> {
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

export async function getMarketStatus() : Promise<any> {
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

export async function searchStocks( params: { searchValue?: string } ): Promise<any> {
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

