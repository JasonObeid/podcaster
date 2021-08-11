import React from "react";
// @ts-ignore
import { PodcastIndexClient } from "../podcast-client/index";

// assumes you have an your key and secret set as environment variables
// @ts-ignore
const a: string = import.meta.env.VITE_API_KEY;
// @ts-ignore
const b: string = import.meta.env.VITE_API_SECRET;
const VITE_API_KEY = "RBE7535YHVY2VFHJPUDJ";
const VITE_API_SECRET = "DZmpt7J^vKzbeNwd4EvQUtGQj7wwd6Eq#vwChUL4";
console.log(a);
console.log(b);
const client = new PodcastIndexClient(VITE_API_KEY, VITE_API_SECRET);

type PodcastIndexProviderProps = { children: React.ReactNode };
const PodcastIndexContext = React.createContext<
  { client: PodcastIndexClient } | undefined
>(undefined);

function PodcastIndexProvider({ children }: PodcastIndexProviderProps) {
  const value = {
    client,
  };
  return (
    <PodcastIndexContext.Provider value={value}>
      {children}
    </PodcastIndexContext.Provider>
  );
}

function usePodcastIndex() {
  const context = React.useContext(PodcastIndexContext);
  if (context === undefined) {
    throw new Error(
      "usePodcastIndex must be used within a PodcastIndexProvider",
    );
  }
  return context;
}
export { PodcastIndexProvider, usePodcastIndex };
