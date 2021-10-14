import { Types } from "podcastindexjs";
import { useQueries, UseQueryOptions, UseQueryResult } from "react-query";
import { Controls } from "../types/footer";

// taken from https://blog.johnnyreilly.com/2021/01/03/strongly-typing-react-query-s-usequeries/

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export function useQueriesTyped<TQueries extends readonly UseQueryOptions[]>(
  queries: [...TQueries],
): {
  [ArrayElement in keyof TQueries]: UseQueryResult<
    TQueries[ArrayElement] extends { select: infer TSelect }
      ? TSelect extends (data: any) => any
        ? ReturnType<TSelect>
        : never
      : Awaited<
          ReturnType<
            NonNullable<
              Extract<TQueries[ArrayElement], UseQueryOptions>["queryFn"]
            >
          >
        >
  >;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQueries(
    queries as UseQueryOptions<unknown, unknown, unknown>[],
  ) as any;
}

export function getImage(artworkURI: string, imageURI: string) {
  if (imageURI !== "" && imageURI !== null) {
    return imageURI;
  }
  return artworkURI;
}

export function getPodcastFromId(
  subscriptions: Types.PIApiPodcast[],
  feedId: number,
) {
  const podcast = subscriptions.find(
    (subscription) => subscription.id === feedId,
  );

  if (podcast !== null) {
    return podcast;
  }

  return null;
}

export function convertSecondsToTime(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substr(11, 8);
  if (timeString.substr(0, 2) === "00") {
    return timeString.substr(3);
  }
  return timeString;
}

export function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: [...value],
    };
  } else {
    return value;
  }
}

export function reviver(key: string, value: any): Map<any, any> {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map<any, any>(value.value);
    }
  }
  return value;
}

export function isSubscription(
  data: Types.PIApiPodcast[],
): data is Types.PIApiPodcast[] {
  return (data as Types.PIApiPodcast[]) !== undefined;
}

function isValidMap(data: Map<number, number>): data is Map<number, number> {
  return (data as Map<number, number>) !== null;
}

export function isPlayback(data: string): data is string {
  try {
    const parsed = JSON.parse(data, reviver);
    if (!isValidMap(parsed)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

export function isActiveEpisode(
  data: Types.PIApiEpisodeInfo,
): data is Types.PIApiEpisodeInfo {
  return (data as Types.PIApiEpisodeInfo).id !== undefined;
}

export function isControls(data: Controls): data is Controls {
  return (data as Controls) !== undefined;
}
