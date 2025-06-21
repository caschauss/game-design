interface QuestionDisplayProps {
  question: string;
  author: string;
  context: string;
  date: number;
  source: string;
  showAuthor: boolean;
  showDate: boolean;
  showContext: boolean;
}

export default function QuestionDisplay({
  question,
  author,
  context,
  date,
  source,
  showAuthor,
  showDate,
  showContext,
}: QuestionDisplayProps) {
  return (
    <div className="flex flex-col w-full items-center gap-8 ">
      <h1 className="text-xl">PolitikschMERZen</h1>
      <div className="flex flex-col gap-8 items-end ">
        <a
          className="text-3xl italic font-bold max-w-5xl text-center line-clamp-5"
          href={source}
          target="_blank"
          rel="noopener noreferrer"
        >
          "{question}"
        </a>

        <div className="w-full flex justify-between">
          {showAuthor && (
            <p className="text-xl italic text-green-500 border-2 border-green-600 bg-green-600/15 p-2 rounded-md">
              von {author}
            </p>
          )}
          {showDate && (
            <p className="text-xl italic text-blue-400 border-2 border-blue-600 bg-blue-600/15 p-2 rounded-md">
              im Jahr {date}
            </p>
          )}
        </div>
      </div>
      {showContext && (
        <div className="w-full max-w-5xl border-2 border-indigo-500 bg-indigo-500/15 p-4 rounded-xl">
          <div className="flex gap-4 font-bold text-indigo-300 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <h3 className="text-xl">{context}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
