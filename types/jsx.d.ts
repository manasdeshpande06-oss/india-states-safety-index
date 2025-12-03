declare namespace JSX {
  interface IntrinsicElements {
    // permit any tag and attributes during development
    [elemName: string]: any;
  }
}
