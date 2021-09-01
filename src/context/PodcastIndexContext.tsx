import React from "react";
import { PodcastIndexClient } from "podcastindexjs";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_SECRET = import.meta.env.VITE_API_SECRET;

if (typeof VITE_API_KEY !== "string" || typeof VITE_API_SECRET !== "string")
  throw new Error("Error with PodcastIndex Secrets");

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
