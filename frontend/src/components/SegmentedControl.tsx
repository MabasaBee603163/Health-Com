type Option<T extends string> = {
  value: T
  label: string
}

type Props<T extends string> = {
  label: string
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: Props<T>) {
  const labelId = `${label.toLowerCase().replace(/\s+/g, "-")}-seg-label`

  return (
    <div className="field-block">
      <span id={labelId}>{label}</span>
      <div className="segmented" role="group" aria-labelledby={labelId}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className="segmented-btn"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
