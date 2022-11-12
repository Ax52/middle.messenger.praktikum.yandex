declare module "*.module.scss" {
  const value: Record<string, string>;
  export default value;
}

declare module "*.hbs" {
  type props = {
    [key: string]: string | number | Array<T> | Record<string, string>;
  };
  const hbs = (props: props) => string;
  export default hbs;
}
