import React from 'react'
import axios from 'axios'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { FormGroup, InputLabel, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            flexDirection: 'row',
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

export default function SelectMonthYear({setHighGradeUsers}: any) {
    const classes = useStyles();
    const [age, setAge] = React.useState<string | number>('')
    const [open, setOpen] = React.useState(false)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as number);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClick = (e) => {
        e.preventDefault()
        const month = e.target.month.value
        const year = e.target.year.value

        axios.post('assessment/general-report-monthly',JSON.stringify({ month, year }))
            .then(res => {
                if(res.data.length < 1) alert("گزارشی یافت نشد !")
                setHighGradeUsers(res.data)
            })
            .catch(err => { 
                alert("گزارشی یافت نشد !")
                console.log('error', err) 
            })

    }

    return (
        <div style={{ display: 'flex', marginBottom: '50px' }}>
            <form onSubmit={handleClick} style={{ display: 'flex' }}>
                <FormControl className={classes.formControl}>

                    <FormGroup style={{ flexDirection: 'row', marginRight: '15px', marginLeft: '15px' }}>
                        <InputLabel>ماه</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            name="month"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>فروردین</MenuItem>
                            <MenuItem value={1}>اردیبهشت</MenuItem>
                            <MenuItem value={2}>خرداد</MenuItem>

                            <MenuItem value={3}>تیر</MenuItem>
                            <MenuItem value={4}>مرداد</MenuItem>
                            <MenuItem value={5}>شهریور</MenuItem>

                            <MenuItem value={6}>مهر</MenuItem>
                            <MenuItem value={7}>آبان</MenuItem>
                            <MenuItem value={8}>آذر</MenuItem>

                            <MenuItem value={9}>دی</MenuItem>
                            <MenuItem value={10}>بهمن</MenuItem>
                            <MenuItem value={11}>اسفند</MenuItem>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <TextField name="year" id="standard-basic" label="سال" />
                    </FormGroup>

                </FormControl>


                <Button type="submit" className={classes.button} style={{ margin: 'auto' }} variant="contained" color="secondary">
                    گزارش
                </Button>
            </form>
        </div>
    );
}
