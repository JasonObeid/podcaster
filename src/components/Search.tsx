import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/SearchRounded";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDebounce } from "@react-hook/debounce";
import { usePodcastIndex } from "../context/PodcastIndexContext";

import { makeStyles } from "@material-ui/styles";
import Podcast from "./Podcast";
import Box from "@material-ui/core/Box";
import { useQuery } from "react-query";
import { searchParams, SearchProps } from "../types/search";

const useStyles = makeStyles({
  search: { paddingRight: "32px" },
});

function Search({
  subscriptions,
  setSubscriptions,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: SearchProps) {
  const classes = useStyles();

  const history = useHistory();
  const params: searchParams = useParams();

  const { client } = usePodcastIndex();
  const [searchQueryText, setSearchQueryText] = useDebounce("", 500);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (params.term !== undefined) {
      if (params.term !== "" && params.term !== searchText) {
        const initialText = params.term;
        setSearchText(initialText);
        setSearchQueryText(initialText);
      }
    }
  }, []);

  const fetchedPodcast = useQuery(
    `search/${searchQueryText}`,
    getSearchResultsFromText,
  );
  const searchResults = fetchedPodcast?.data;

  async function getSearchResultsFromText() {
    if (searchQueryText !== "") {
      history.push(`/search/${searchQueryText}`);
      const searchResults = await client.search(searchQueryText);
      return searchResults.feeds;
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    setSearchQueryText(event.target.value);
  }

  function runQuery() {
    setSearchQueryText(searchText);
  }

  return (
    <>
      <Box
        display="flex"
        flexGrow={1}
        alignItems="center"
        justifyContent="space-between"
        marginBottom="32px"
      >
        <TextField
          id="standard-search"
          label="Search"
          type="search"
          variant="filled"
          fullWidth
          value={searchText}
          onChange={handleChange}
          className={classes.search}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={runQuery}
        >
          Search
        </Button>
      </Box>
      <Grid container spacing={3} direction="column" alignItems="stretch">
        {searchResults !== undefined &&
          searchResults.map((podcast) => (
            <Grid item key={podcast.id}>
              <Podcast
                podcastId={podcast.id}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Podcast>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default Search;
