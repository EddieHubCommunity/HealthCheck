import { useFormStatus } from "react-dom";

export default function Checkbox({
  id,
  name,
  text,
  description,
  value,
  disabled,
  defaultChecked,
}) {
  const { pending } = useFormStatus();

  if (!name) {
    name = id;
  }

  if (!text) {
    text = name;
  }

  return (
    <div className="relative flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          value={value}
          className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-600 disabled:bg-gray-400"
          disabled={disabled || pending}
          defaultChecked={defaultChecked}
        />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor="comments" className="font-medium">
          {text}
        </label>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
