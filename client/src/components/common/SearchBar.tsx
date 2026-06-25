interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

export default function SearchBar({
  value = "",
  onChange,
  onFocus,
}: SearchBarProps) {
  return (
    <div className="px-4">
      <input
        type="text"
        placeholder="Search food items..."
        value={value}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        onFocus={onFocus}
        className="
          w-full
          bg-white
          rounded-2xl
          px-4
          py-3
          shadow-sm
          outline-none
        "
      />
    </div>
  );
}