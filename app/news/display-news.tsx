import Image from "next/image";
import { marked } from "marked";
import { Tooltip } from '@nextui-org/react';

interface Params {
  news?: any;
  loading?: any;
}

export default function DisplayNews(params: Params) {

  const loading = params.loading;
  const news = params.news;

  function parseMd(string: string): string {
    return marked(string, { async: false })
      .toString()
      .replace(/<[^>]*>/g, "");
  }

  function unixTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  if (loading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
        {/* Top market */}
        {news.map((news: any) => (
          <div
          key={news.id}
          className="flex flex-col justify-center items-center m-3 p-6 border-2 border-orange-700 rounded-xl max-w-sm min-h-unit-8xl max-h-unit-8xl"
          >
            {news.image ? (
              <Image
                className="mb-4 rounded-sm items-center w-auto h-auto"
                src={news.image}
                width={300}
                height={300}
                alt="Thumbnail"
                priority={true}
              />
            ) : (
              <div className="flex flex-col items-center w-auto h-auto p-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="flex flex-1 mb-4"
                >
                  <path
                    fill="currentColor"
                    d="m20.475 23.3l-2.3-2.3H5q-.825 0-1.413-.588T3 19V5.825L.7 3.5l1.4-1.4l19.8 19.8l-1.425 1.4ZM5 19h11.175l-2-2H6l3-4l2 
                        2.725l.85-1.05L5 7.825V19Zm16-.825l-2-2V5H7.825l-2-2H19q.825 0 1.413.588T21 5v13.175Zm-7.525-7.525ZM10.6 13.425Z"
                  />
                </svg>
                <p>No Image</p>
              </div>
            )}
            <h2 className="text-lg font-semibold">{news.headline}</h2>
            {/* Checking if there is a summary or not */}
            {news.summary ? (
              <p className="flex-1 mt-2 mb-2 text-gray-400 text-ellipsis overflow-hidden">
                {news.summary.length > 250
                  ? `${parseMd(news.summary.substring(0, 250))}...`
                  : parseMd(news.summary)}
              </p>
            ) : (
              <p className="flex-1 mt-2 mb-2 text-gray-400 text-ellipsis overflow-hidden text-center">
                No Summary. Please click the link below.
              </p>
            )}
            <a
              href={news.url}
              className="self-start text-blue-500 hover:text-violet-700"
              >
              Read more..
            </a>
            <Tooltip content={unixTimestampToDate(news.datetime).toString()}>
              <p className="self-end text-gray-500 hover:text-sky-500">
                {news.source}
              </p>
            </Tooltip>
          </div>
        ))}
      </div>
  )
}
