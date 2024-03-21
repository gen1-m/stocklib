interface Stocks {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export default function DisplayStocks({params} : {params: {
  stocks: Stocks[]
}}) {
  
  return (
    <div>DisplayStocks</div>
  )
}
