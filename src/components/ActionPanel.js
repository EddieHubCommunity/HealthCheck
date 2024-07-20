export default function ActionPanel({ title, children }) {
  return (
    <div className="bg-gray-800/40 shadow sm:rounded-lg my-6 border border-gray-800">
      <div className="px-4 py-5 sm:p-6">
        {title && (
          <h3 className="text-base font-semibold leading-6 text-white">
            {title}
          </h3>
        )}
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="text-sm text-white grow">{children}</div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            {/* <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Change plan
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
