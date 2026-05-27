import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  name,
}) => {
  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 block text-xs font-medium border
        focus:outline-none focus:ring-2
        ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:ring-purple-400"
        }`}
      />

      {/* Error */}
      {error && (
        <p className="text-[11px] text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;