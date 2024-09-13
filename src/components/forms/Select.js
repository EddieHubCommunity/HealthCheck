import classNames from "@/utils/classNames";
import { useFormStatus } from "react-dom";

export default function Select({
  id,
  name,
  text,
  options,
  value,
  disabled,
  defaultValue,
  classNameSelect,
}) {
  const { pending } = useFormStatus();

  if (!name) {
    name = id;
  }

  if (!text) {
    text = name;
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6">
        {text}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={classNames(
          "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-600",
          classNameSelect,
        )}
      >
        {options?.map((option) => (
          <option
            value={option.value}
            key={option.value}
            selected={option.value === value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
