export function isToday(data: number | Date) {
  if (typeof data === "number") {
    const today = new Date().getDate();
    if (data > 31) {
      // NOTE: TimeStamp
      const isDay = new Date(data).getDate();
      return today === isDay;
    }
    // NOTE: Number of Date
    return today === data;
  }
  return new Date().getDate() === data.getDate();
}
