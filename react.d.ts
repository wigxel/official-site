/* Allow CSS custom properties (CSS variables) to be used in React style objects and csstype definitions.
   This adds index signatures like `--my-var`: "value" | 1 to the respective interfaces. */
declare module 'react' {
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number | undefined;
  }
}

declare module 'csstype' {
  interface Properties {
    [customProperty: `--${string}`]: string | number | undefined;
  }
  interface PropertiesHyphen {
    [customProperty: `--${string}`]: string | number | undefined;
  }
}
