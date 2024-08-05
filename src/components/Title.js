export default function Title({ text, children }) {
  return (
    <div className="border-b border-gray-200 py-5 flex flex-wrap items-center justify-between sm:flex-nowrap">
      <h2 className="text-base font-semibold leading-6">{text}</h2>
      <div className="flex-shrink-0 inline-flex gap-2">{children}</div>
    </div>
  );
}
