export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get("category");
  const searchValue = searchParams.get("searchValue");
  const exchange = searchParams.get("exchange");

  let apiUrl = `https://finnhub.io/api/v1/`;

  // Constructing the URL based on the existence of parameters
  if (category) {
    apiUrl += `news?category=${category}&`;
  }

  if (searchValue) {
    apiUrl += `search?q=${searchValue}&`;
  }
  
  if (exchange) {
    apiUrl += `stock/market-status?exchange=${exchange}&`;
  }

  apiUrl += `token=${process.env.FINNHUB_API_KEY}`;

  // console.log(apiUrl);

  const options = {
    method: "GET",
    json: true,
    headers: {
      "User-Agent": "request",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.text();
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
