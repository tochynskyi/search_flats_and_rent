import React, { FC, useEffect, useState } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  InputAdornment,
  Theme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createStyles, makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import QueryString from 'qs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'fixed',
      zIndex: 10000,
      width: 580,
      height: 55,
      marginTop: 28,
      backgroundColor: theme.palette.common.white,
    },
  }),
);
const SearchPanel: FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentQuery, setCurrentQuery] = useState<
    string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]
  >('');
  const classes = useStyles();
  const history = useHistory();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    history.push({
      search: inputValue ? `?city=${inputValue}` : '',
    });
  }, [history, inputValue]);

  useEffect(() => {
    const { city } = QueryString.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });
    if (city) {
      setCurrentQuery(city);
    }
  }, [history]);

  useEffect(() => {
    if (inputValue) {
      (async () => {
        try {
          await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=(cities)&key=AIzaSyAbylMWc9yP2jG17YDm7E9JleucnAp0Lbg`,
          )
            .then((response: Response) => {
              return response.json();
            })
            .then(({ predictions }) => {
              const citiesApi = predictions.map(
                (city: { description: string }) => city.description,
              );
              setCities(citiesApi);
            });
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      })();
    }
  }, [inputValue]);
  return (
    <Box className={classes.wrapper}>
      <Autocomplete
        freeSolo
        options={cities}
        onChange={(event, value) => value && setInputValue(value.split(',')[0])}
        renderInput={(params) => (
          <TextField
            variant="filled"
            placeholder="Type somethings"
            value={currentQuery}
            onChange={handleInput}
            {...params}
            label="City"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchPanel;
