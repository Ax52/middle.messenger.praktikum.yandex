export const TFormats = {
  short: "hh:mm",
  med: "hh:mm:ss",
  long: "dd/mmm/yyyy hh:mm",
} as const;

type TimeType = typeof TFormats[keyof typeof TFormats];

function addZero(str: number) {
  if (str < 10) {
    return `0${str}`;
  }
  return str;
}

export function formatTime(date: Date, type: TimeType) {
  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());

  switch (type) {
    case "dd/mmm/yyyy hh:mm":
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case "hh:mm:ss":
      return `${hours}:${minutes}:${seconds}`;
    case "hh:mm":
    default:
      return `${hours}:${minutes}`;
  }
}
