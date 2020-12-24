import React, { useState, useEffect } from 'react'
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import moment from 'jalali-moment'
import { TextField } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  datepickerInput: {
    border: '1px solid #00000047', 
    borderRadius: '23px',
  }
}))

interface CalanderFieldProps {
  onchange: Function
  disable?: boolean
}

const CalanderField = ({ disable = false, onchange }: CalanderFieldProps) => {

  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState<DayValue>(null)

  useEffect(() => {
    setLoading(true)
  }, [])

  const handleChange = (e: any) => {
    const date = moment.from(`${e?.year}/${e?.month}/${e?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')
    setSelectedDay(e)
    onchange(date)
  }

  const renderCustomInput = ({ ref }: any) => (

    <TextField
      ref={ref}
      fullWidth
      disabled={ disable ? true : false }
      size="small"
      variant="outlined"
      className={classes.datepickerInput}
      value={selectedDay ? `${selectedDay?.year}/${selectedDay?.month}/${selectedDay?.day}` : 'انتخاب تاریخ'}
    />
  )

  return (
    loading
    ? <DatePicker
        value={selectedDay}
        onChange={handleChange}
        renderInput={renderCustomInput}
        locale="fa"
        shouldHighlightWeekends
    />
    : null
  )
}

export default CalanderField