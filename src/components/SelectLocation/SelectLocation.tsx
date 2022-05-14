import { useTheme } from '@material-ui/core';
import React from 'react';
import { OptionTypeBase } from 'react-select';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox, TPlace } from '../../api/MapBox';

export type TLocation = {
  label: string;
  value: string;
  coords: number[];
  place: string;
};
type SelectLocationProps = {
  onLocationSelected: (location: TLocation) => void;
};

const SelectLocation: React.FC<SelectLocationProps> = props => {
  const loadOptions = async (
    inputValue: string,
    callback: (options: OptionTypeBase[]) => void,
  ) => {
    const MAX_LENGTH = 5;
    if (inputValue.length < MAX_LENGTH) return;
    const places: TLocation[] = [];
    const response = await fetchLocalMapBox(inputValue);
    response.map((item: TPlace) => {
      const coords = [];
      coords[0] = item.center[1];
      coords[1] = item.center[0];
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: coords,
        place: item.place_name,
      });
    });

    callback(places);
  };
  const theme = useTheme();

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid',
      borderColor: theme.palette.primary.main,
      color: state.isSelected
        ? theme.palette.text.primary
        : 'black',
      backgroundColor: state.isSelected
        ? theme.palette.primary.dark
        : 'white',
    }),

    indicatorSeparator: styles => {
      return {
        ...styles,
        display: 'none',
      };
    },
    dropdownIndicator: styles => {
      return {
        ...styles,
        display: 'none',
      };
    },
    control: styles => {
      return {
        ...styles,
        '&:hover': { borderColor: theme.palette.primary.main }, // border style on hover
        border: '1px solid lightgray', // default border color
        boxShadow: 'none',
      };
    },
  };

  return (
    <>
      <AsyncSelect
        isClearable={true}
        onChange={props.onLocationSelected}
        loadOptions={loadOptions}
        styles={customStyles}
        {...props}
      />
    </>
  );
};

export default SelectLocation;
