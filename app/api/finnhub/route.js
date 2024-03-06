export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const searchValue = searchParams.get("searchValue"); // Assuming the parameter name is "searchValue"

  let apiUrl = `https://finnhub.io/api/v1/`;

  // Constructing the URL based on the existence of parameters
  if (category) {
    apiUrl += `news?category=${category}&`;
  }

  if (searchValue) {
    apiUrl += `search?q=${searchValue}&`;
  }

  apiUrl += `token=${process.env.FINNHUB_API_KEY}`;

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
