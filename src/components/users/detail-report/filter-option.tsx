import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { FormGroup, InputLabel, TextField } from '@material-ui/core'

import { Months } from '../../../assets/data/months'
import { row as Parameters } from '../../../assets/data/parameters'
import AutoCompeleteField from './auto-compelete-field'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginBottom: '50px',
            '& .MuiFormControl-root': {
                flexDirection: 'row'
            },
            '& input:-webkit-autofill': {
                backgroundColor: 'red !important'
            }
        },
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        }
    }),
);

export default function FilterOption({ users, handleReport }: any) {
    const classes = useStyles()
    const [data, setData] = useState<any>({
        months: [],
        year: '',
        user: '',
        parameters: []
    })
    const [openUser, setOpenUser] = useState(false)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value

        setData({ ...data, [name]: Number(value) })
    }

    const handleClick = (e) => {
        e.preventDefault()
        handleReport(data)
    }

    const handleSetData = (field, value) => {
        const val = value.map(function (obj) {
          return obj.value;
        })
        setData({ ...data, [field]: val })
    }

    return (
        <div style={{}} className={classes.root}>
            <form onSubmit={handleClick} style={{ display: 'flex' }}>

                <FormControl>
                    <TextField name="year" id="standard-basic" label="سال" onChange={handleChange} />
                </FormControl>

                <AutoCompeleteField data={[{ title: 'همه', value: -1 }, ...Months]} label="ماه" onchange={(v) => handleSetData("months", v)} />

                <FormControl style={{ flexDirection: 'row', marginRight: '15px', marginLeft: '15px' }}>
                    <InputLabel>کاربر</InputLabel>
                    <Select
                        labelId="user"
                        id="user"
                        name="user"
                        open={openUser}
                        onClose={() => setOpenUser(false)}
                        onOpen={() => setOpenUser(true)}
                        value={data.user}
                        onChange={handleChange}
                    >
                        {users && users.map((v, i) => {
                            return (
                                <MenuItem key={i} value={v.id}>{v.name + ' ' + v.lastname}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <AutoCompeleteField data={[{ title: 'همه', value: -1 }, ...Parameters]} width={400} label="پارامتر" onchange={(v) => handleSetData("parameters", v)} />

                <Button type="submit" className={classes.button} style={{ margin: 'auto' }} variant="contained" color="secondary">
                    گزارش
                </Button>
            </form>
        </div>
    );
}
