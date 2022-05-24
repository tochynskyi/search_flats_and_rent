import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import QueryString from 'qs';
import { TextField, Autocomplete, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../Unknown/UIContext';
import useStyles from './style';

const SearchPanel: FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const { setAlert } = useContext(UIContext);
  const classes = useStyles();
  const history = useHistory();
  const query = QueryString.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  const queryCity = query.city?.toString();
  const setCityQuery = useCallback(
    (city: string) => {
      history.push({
        pathname: '/flats',
        search: city ? `?city=${city.split(',')[0]}` : '',
      });
    },
    [history],
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleAutocomplete = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ): void => {
    if (value) {
      setCityQuery(value);
      setInputValue(value);
    }
  };

  const handleSearch = () => {
    setCityQuery(inputValue);
  };

  useEffect(() => {
    if (queryCity) {
      setInputValue(queryCity);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (inputValue) {
      (async () => {
        try {
          const response: Response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=(cities)&key=AIzaSyAWQzaokWX9P8xGf81X0H4yLcTuHx6D0mw`,
          );

          const { predictions } = await response.json();

          const citiesApi = predictions.map(
            (city: { description: string }) => city.description,
          );

          setCities(citiesApi);
        } catch (error) {
          if (error instanceof Error) {
            setAlert({
              show: true,
              severity: 'error',
              message: error.message,
            });
          } else {
            setAlert({
              show: true,
              severity: 'error',
              message: 'Something wrong!',
            });
          }
        }
      })();
    }
  }, [inputValue, setAlert]);

  return (
    <Box className={classes.wrapper}>
      <Autocomplete
        freeSolo
        options={cities}
        value={inputValue}
        onChange={handleAutocomplete}
        renderInput={(params) => (
          <TextField
            variant="filled"
            placeholder="Type somethings"
            onChange={handleInput}
            {...params}
            label="City"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={handleSearch}
                    className={classes.searchIcon}
                  />
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
