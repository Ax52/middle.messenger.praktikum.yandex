// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parse(data: any) {
  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}
