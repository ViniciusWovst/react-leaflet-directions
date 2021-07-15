import React from 'react';
import { OptionTypeBase } from 'react-select';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../../api/MapBox';

const SelectLocation: React.FC = props => {
  const loadOptions = async (
    inputValue: string,
    callback: (options: OptionTypeBase[]) => void,
  ) => {
    const MAX_LENGTH = 5;
    if (inputValue.length < MAX_LENGTH) return;
    const places: any = [];
    const response = await fetchLocalMapBox(inputValue);
    response.features.map((item: any) => {
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: item.center,
        place: item.place_name,
      });
    });

    callback(places);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      //padding: 20,
    }),

    control: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'red' : 'blue',
    }),

    singleValue: (provided, state) => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };
  return (
    <>
      <AsyncSelect
        loadOptions={loadOptions}
        {...props}
        styles={customStyles}
      />
    </>
  );
};

export default SelectLocation;
