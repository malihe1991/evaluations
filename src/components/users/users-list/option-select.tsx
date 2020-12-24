import React, { useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listbox: {
      width: 210,
      maxHeight: 70,
      margin: 0,
      padding: 5,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      border: '1px solid rgba(0,0,0,.25)',
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
    },
  }),
);

export default function OptionSelect({ reportAccess, handleChange }: any) {
  const classes = useStyles();
  const [value, setValue] = useState(0)

  const values = [
    {
        value: -1,
        title: 'گزارشات',
        link: ''
    },
    {
        value: reportAccess ? 0 : -1,
        title: 'گزارش تجمیعی کارکنان سازمان',
        link: '/users/cumulative-report'
    },
    {
      value: reportAccess ? 1 : -1,
      title: 'گزارش وضعیت رتبه کارکنان',
      link: '/users/rating-status-report'
  },
    {
        value: 2,
        title: 'گزارش تفصیلی کارکنان واحد',
        link: '/users/detail-report'
    }
  ]
  
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'provinces-autocomplete',
    options: values,
    getOptionLabel: (option) => option.title,
    onChange: (e, v): any => {
      handleChange(v?.link)
    }
  });

  return (
    <div style={{margin: '0px 5px'}}>
      <div {...getRootProps()}>
        <Button
          {...getInputProps()}
          variant="contained"
          color="secondary"
          startIcon={<ArrowDropDownIcon />}
        >
          {values[value].title}
        </Button>
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            option.value !== -1 &&  <li {...getOptionProps({ option, index })}>{option.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

