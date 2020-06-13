import { NormalizedCacheObject } from "apollo-cache-inmemory";

declare const __BROWSER__: boolean;
declare const __SERVER__: boolean;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "testing";
  }
}

declare global {
  const __BROWSER__: boolean;
  const __SERVER__: boolean;
  interface Window {
    browserHistory: any;
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}
