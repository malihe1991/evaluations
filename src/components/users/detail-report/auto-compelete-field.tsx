/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      paddingRight: '0px !important',
      margin: '0px 8px'
    }
  }),
);

export default function AutoCompeleteField({ data, label, width = 120, multiple = true, onchange }: any) {

  const [value, setValue] = React.useState<any>([])
  const classes = useStyles()
  
  useEffect(()=> {
    onchange(value)
  },[value])

  return (
    <Autocomplete
      multiple={multiple}
      id="fixed-tags-demo"
      classes={{ inputRoot: classes.inputRoot }}
      value={value}
      onChange={(event, newValue) => {

        if (newValue.some(el => el.value === -1)) {

          setValue([
            ...data.filter(el => el.value !== -1)
          ]);
        }
        else setValue(newValue)

      }}
      options={data ? data : []}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) => null}
      style={{ width }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
        />
      )}
    />
  )
}