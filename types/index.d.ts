declare module "*.module.scss" {
  const value: Record<string, string>;
  export default value;
}

declare module "*.hbs" {
  type props = {
    [key: string]: string | number | Array<T> | Record<string, string>;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hbs = (p: props) => string;
  export default hbs;
}
