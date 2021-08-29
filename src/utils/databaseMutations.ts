import { User } from "firebase/auth";
import { set, ref } from "firebase/database";
import { Types } from "podcastindexjs";
import { database } from "../config/firebase";
import { Controls } from "../types/footer";
import { replacer } from "./utils";

export function updateControlsDatabase(
  newControls: Controls,
  currentUser: User | null,
) {
  if (currentUser !== null) {
    const controlsRef = ref(database, `users/${currentUser.uid}/controls`);
    set(controlsRef, newControls);
  }
  localStorage.setItem("controls", JSON.stringify(newControls));
}

export function updatePlaybackDatabase(
  newPlaybackStates: Map<number, number>,
  currentUser: User | null,
) {
  if (currentUser !== null) {
    const playbackRef = ref(database, `users/${currentUser.uid}/playback`);

    set(playbackRef, JSON.stringify(newPlaybackStates, replacer));
  }
  localStorage.setItem("playback", JSON.stringify(newPlaybackStates, replacer));
}

export function updateSubscriptionsDatabase(
  newSubscriptions: Types.PIApiPodcast[],
  currentUser: User | null,
) {
  if (currentUser !== null) {
    const subscriptionsRef = ref(
      database,
      `users/${currentUser.uid}/subscriptions`,
    );
    set(subscriptionsRef, newSubscriptions);
  }
  localStorage.setItem("subscriptions", JSON.stringify(newSubscriptions));
}

export function updateActiveEpisodeDatabase(
  newActiveEpisode: Types.PIApiEpisodeInfo,
  currentUser: User | null,
) {
  if (currentUser !== null) {
    const activeEpisodeRef = ref(
      database,
      `users/${currentUser.uid}/activeEpisode`,
    );
    set(activeEpisodeRef, newActiveEpisode);
  }
  localStorage.setItem("activeEpisode", JSON.stringify(newActiveEpisode));
}
