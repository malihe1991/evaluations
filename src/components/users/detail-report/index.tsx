import React, { useState, useEffect } from 'react'
import { Link } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import axios from 'axios'

import { row as Parameters } from '../../../assets/data/parameters'
import { Status } from '../../../assets/data/status'

import SelectMonthYear from './filter-option'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
            width: '90%',
            backgroundColor: theme.palette.background.paper,
            '& .MuiListItem-root': {
                cursor: 'auto'
            }
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
        listTitle: {
            backgroundColor: 'black',
            '&:hover': {
                backgroundColor: 'black'
            }
        },
        listItemTitle: {
            '& > span': {
                color: 'white',
                fontSize: 15
            }
        },
        listItemText: {
            '& > span': {
                fontSize: 13
            }
        },
        userHighGradeColor: {
            backgroundColor: '#33b76bf2',
            '&:hover': {
                backgroundColor: '#33b76bf2'
            }
        },
        backButton: {
            background: "black",
            fontSize: 14,
            color: "white",
            padding: 4,
            borderRadius: 5
        }
    }),
);

const DetailReport = () => {

    const [parameterInfo, setParameterInfo] = useState([])
    const [totalGrade, setTotalGrade] = useState([])
    const [users, setUsers] = useState([])

    const classes = useStyles();

    useEffect(() => {
        axios.get("user/get-user-unit").then(res => { setUsers(res.data) })
    }, [])

    const handleReport = (data: any) => {
        console.log(data)
        axios.post('assessment/detailed-report', JSON.stringify(data))
            .then(res => {
                if(res.data.total.length < 1) alert("گزارشی یافت نشد !")
                setParameterInfo(res.data.info)
                setTotalGrade(res.data.total)
            }).catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h2>گزارش تفصیلی کارکنان واحد</h2>
                <Link className={classes.backButton} href={'/users/users-list'}>بازگشت</Link>
            </div>
            <SelectMonthYear users={users} handleReport={(data) => handleReport(data)} />

            {parameterInfo[0]?.months.length > 0 &&
                <List dense>
                    <ListItem button className={classes.listTitle}>
                        <ListItemText className={classes.listItemTitle} id='1' primary="پارامتر ها" style={{maxWidth: 350}} />
                        {parameterInfo && parameterInfo[0].months.map((m, i) => {
                            return (
                                <ListItemText className={classes.listItemTitle} key={i} id={i} primary={m.month} style={{maxWidth: 100}} />
                            )
                        })}
                    </ListItem>
                    {parameterInfo.map((value,i) => {
                        return (
                            <ListItem key={i} button>

                                <ListItemText className={classes.listItemText} id={`${i}`} primary={Parameters[value.id]?.title} style={{maxWidth: 350}} />
                                {value.months.map((val, i) => {
                                    return (
                                        <ListItemText className={classes.listItemText} key={i} id={`${i}`} primary={Status[val.grade]?.title} style={{maxWidth: 100}} />
                                    )
                                })}
                            </ListItem>
                        );
                    })}

                    <ListItem button className={classes.listTitle}>
                        <ListItemText className={classes.listItemTitle} id="2" primary="امتیاز کلی" style={{maxWidth: 350}} />
                        {totalGrade.map((m, i) => {
                            return (
                                <ListItemText className={classes.listItemTitle} key={i}  id={`${i}`} primary={m.grade} style={{maxWidth: 100}} />
                            )
                        })}
                    </ListItem>

                </List>
            }
        </div>
    );
}

export default DetailReport
