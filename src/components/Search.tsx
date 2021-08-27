import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Types } from "podcastindexjs";
import { usePodcastIndex } from "../context/PodcastIndexContext";

import { makeStyles } from "@material-ui/styles";
import Podcast from "./Podcast";
import Box from "@material-ui/core/Box";
import { useQuery } from "react-query";

type SearchProps = {
  // playbackStates: Map<number, number>;
  // activeEpisode: PIApiEpisodeInfo | undefined;
  subscriptions: Types.PIApiPodcast[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Types.PIApiPodcast[]>>;
};

const useStyles = makeStyles({
  search: { width: "75%" },
});

function Search({ subscriptions, setSubscriptions }: SearchProps) {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

  const { client } = usePodcastIndex();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log(params);
    if (params.hasOwnProperty("term")) {
      //@ts-ignore
      if (params.term !== "" && params.term !== searchText) {
        //@ts-ignore
        const initialText = params.term;
        setSearchText(initialText);
      }
    }
  }, []);

  const fetchedPodcast = useQuery(
    `search/${searchText}`,
    getSearchResultsFromText,
  );
  const searchResults = fetchedPodcast?.data;

  async function getSearchResultsFromText() {
    if (searchText !== "") {
      history.push(`/search/${searchText}`);
      const searchResults = await client.search(searchText);
      return searchResults.feeds;
    }
  }

  //Types.PIApiFeed[]
  async function fetchData() {}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <React.Fragment>
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
          value={searchText}
          onChange={handleChange}
          className={classes.search}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => fetchData()}
        >
          Search
        </Button>
      </Box>
      <Grid container spacing={3} direction="column" alignItems="stretch">
        {searchResults !== undefined &&
          searchResults.map((podcast) => (
            <Grid item key={podcast.id} component="article">
              <Podcast
                podcastId={podcast.id}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                // playbackStates={playbackStates}
                // activeEpisode={activeEpisode}
              ></Podcast>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(Search);
