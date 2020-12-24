import React, { useState, useEffect } from 'react'
import { Button, Link, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import axios from 'axios'

import CalanderField from './calendar-field'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
            width: '90%',
            backgroundColor: theme.palette.background.paper,
            '& .MuiListItem-root': {
                cursor: 'auto'
            },
            '& .MuiOutlinedInput-root': {
                borderRadius: 23
            },
            '& .userHighGradeColor': {
                backgroundColor: '#33b76bf2',
                '&:hover': {
                    backgroundColor: '#33b76bf2'
                }
            },
            '& .userWorstGradeColor': {
                backgroundColor: 'red',
                '&:hover': {
                    backgroundColor: 'red'
                }
            },
        },
        title: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: '10px 0px',
            '& a:hover': {
                textDecoration: 'none'
            }
        },
        tableTitle: {
            color: '#979797',
            margin: '30px 0px 0px 0px'
        },
        listTitle: {
            backgroundColor: 'black',
            '&:hover': {
                backgroundColor: 'black'
            }
        },
        listItemTitle: {
            maxWidth: '150px',
            '& > span': {
                color: 'white',
                fontSize: 15
            }
        },
        listItemText: {
            maxWidth: '150px',
            '& > span': {
                fontSize: 13
            }
        },
        backButton: {
            background: "black",
            fontSize: 14,
            color: "white",
            padding: 4,
            borderRadius: 5
        },
        calendar: {
            display: 'flex',
            alignItems: 'center'
        }
    })
);

const RatingStatusReport = () => {

    const [highGradeUsers, setHighGradeUsers] = useState([])
    const [worstGradeUsers, setWorstGradeUsers] = useState([])
    const [start, setStart] = useState()

    const classes = useStyles()

    const handleReport = (end: any) => {

        axios.post('/assessment/best-emp-filter', { startDate: start, endDate: end })
            .then(res => { setHighGradeUsers(res.data) })

        axios.post('/assessment/worst-emp-filter', { startDate: start, endDate: end })
            .then(res => { setWorstGradeUsers(res.data) })
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h2>گزارش وضعیت رتبه کارکنان</h2>
                <Link className={classes.backButton} href={'/users/users-list'}>بازگشت</Link>
            </div>

            <div className={classes.calendar}>
                از &nbsp;<CalanderField onchange={(v: any) => setStart(v)} />&nbsp;
                تا &nbsp;<CalanderField onchange={(v: any) => handleReport(v)} />
            </div>

            {/* userHighGrade */}
            <Typography  className={classes.tableTitle} variant="h6">رتبه های برتر</Typography>
            <List dense>
                <ListItem button className={classes.listTitle}>
                    <ListItemText className={classes.listItemTitle} id='1' primary="ردیف" />
                    <ListItemText className={classes.listItemTitle} id='2' primary="نام و نام خانوادگی" />
                    <ListItemText className={classes.listItemTitle} id='3' primary="کد پرسنلی" />
                    <ListItemText className={classes.listItemTitle} id='4' primary="امتیازها" style={{maxWidth: 300}} />
                </ListItem>
                {highGradeUsers && highGradeUsers.map((value, i) => {
                    return (
                        <ListItem key={i} button className="userHighGradeColor">
                            <ListItemText className={classes.listItemText} id={value.userInfo.id} primary={++i} />
                            <ListItemText className={classes.listItemText} id={value.userInfo.id} primary={value.userInfo.name + ' ' + value.userInfo.lastname} />
                            <ListItemText className={classes.listItemText} id={value.userInfo.id} primary={value.userInfo.code} />

                            <ListItemText key={i} className={classes.listItemText} id='4' style={{maxWidth: '100%'}} primary={value?.grades.map((v, i) =>
                                v.date + ' : ' + v.grade + `${i < value.grades.length - 1 ? ' , ' : ''}`)}
                            />
                            <ListItemSecondaryAction></ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>

            {/* userWorstGrade */}
            <Typography  className={classes.tableTitle} variant="h6">رتبه های پایین</Typography>
            <List dense>
                <ListItem button className={classes.listTitle}>
                    <ListItemText className={classes.listItemTitle} id='1' primary="ردیف" />
                    <ListItemText className={classes.listItemTitle} id='2' primary="نام و نام خانوادگی" />
                    <ListItemText className={classes.listItemTitle} id='3' primary="کد پرسنلی" />
                    <ListItemText className={classes.listItemTitle} id='4' primary="امتیازها" />
                </ListItem>
                {worstGradeUsers && worstGradeUsers.map((value, i) => {
                    return (
                        <ListItem key={i} button className="userWorstGradeColor">
                            <ListItemText className={classes.listItemText} id='1' primary={++i} />
                            <ListItemText className={classes.listItemText} id='2' primary={value.userInfo.name + ' ' + value.userInfo.lastname} />
                            <ListItemText className={classes.listItemText} id='3' primary={value.userInfo.code} />

                            <ListItemText key={i} className={classes.listItemText} id='4' style={{maxWidth: '100%'}} primary={value?.grades.map((v, i) =>
                                v.date + ' : ' + v.grade + `${i < value.grades.length - 1 ? ' , ' : ''}`)}
                            />
                            <ListItemSecondaryAction></ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}

export default RatingStatusReport
