export const storage = {
  get(key: string) {
    const val = localStorage.getItem(key);
    if (!val) return undefined;
    let result;
    try {
      result = JSON.parse(val);
    } catch {
      result = val;
    }
    return result;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(key: string, value: any) {
    let valToStore = value;
    if (typeof value === "object") {
      try {
        valToStore = JSON.stringify(value);
      } catch (err) {
        console.warn("Failed to stringify value:\n", value, "\n", err);
      }
    }
    if (this.get(key) !== valToStore) {
      localStorage.setItem(key, valToStore);
    }
  },
};
