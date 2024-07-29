import classNames from "@/utils/classNames";

export default function Stats({ data }) {
  const colours = {
    success:
      "text-green-400 bg-green-400/10 ring-green-400/20 border border-green-400",
    warning:
      "text-orange-400 bg-orange-400/10 ring-orange-400/30 border border-orange-400",
    error:
      "text-rose-500 bg-rose-500/10 ring-rose-500/30 border border-rose-400",
  };

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.name}
            className={classNames(
              "overflow-hidden rounded-lg px-4 py-5 shadow sm:p-6",
              item.status ? colours[item.status] : "border border-white",
            )}
          >
            <dt className="truncate text-sm font-medium">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
