import Image from "next/image";
import { Tooltip } from '@nextui-org/react';
import { parseMd, unixTimestampToDate } from "../lib/functions";
import he from 'he';

interface Params {
  news?: any;
  loading?: any;
}

export default function DisplayNews(params: Params) {

  const loading = params.loading;
  const news = params.news;

  if (loading) {
    return (
      <h1 className="flex justify-center items-center my-auto text-xl">
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
                className="mb-4 rounded-sm items-center min-w-full h-2/5 max-h-unit-5xl"
                src={news.image}
                // for hd images ;) 
                width={1920}
                height={1080}
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
            <h2 className="text-lg font-semibold">{news.headline.length > 65 ? `${he.decode(parseMd(news.headline.substring(0, 65)))}...` : he.decode(news.headline) }</h2>
            {/* Checking if there is a summary or not */}
            {news.summary ? (
              <p className="flex-1 mt-2 mb-2 text-gray-400 text-ellipsis overflow-hidden self-start">
                {news.summary.length > 170
                  ? `${he.decode(parseMd(news.summary.substring(0, 170)))}...`
                  : he.decode(parseMd(news.summary))}
              </p>
            ) : (
              <p className="flex-1 mt-2 mb-2 text-red-300 text-ellipsis overflow-hidden self-center">
                Unfornately, there is no summary available. Please click the link below.
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
