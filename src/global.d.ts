declare const __BROWSER__: boolean;
declare const __SERVER__: boolean;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "testing";
  }
}

interface Window {
  browserHistory: any;
}
