import Link from "next/link";
import Button from "./Button";

export default function Heading({ title, actions = [], extras = [] }) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between mt-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        {extras.length > 0 && (
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {extras.map((extra) => (
              <div
                className="mt-2 flex items-center text-sm text-gray-300"
                key={extra.icon}
              >
                <extra.icon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
                />
                {extra.text}
              </div>
            ))}
          </div>
        )}
      </div>
      {actions.length > 0 && (
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          {actions.map((action) => (
            <span className="sm:ml-3" key={action.icon}>
              <Button url={action.url}>
                <action.icon
                  aria-hidden="true"
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                />
                {action.text}
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
