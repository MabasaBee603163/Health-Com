function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

type Props = {
  name: string
}

export function PatientAvatar({ name }: Props) {
  return (
    <span className="patient-avatar" aria-hidden="true">
      {initialsFromName(name)}
    </span>
  )
}
