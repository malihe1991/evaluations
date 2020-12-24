import React from 'react';
import { Button, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SelectMonthYear from './selectMonthYear';

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
            maxWidth: '250px',
            '& > span':{
                color: 'white',
                fontSize: 15
            }
        },
        listItemText: {
            maxWidth: '250px',
            '& > span':{
                fontSize: 13
            }
        },
        userHighGradeColor: {
            backgroundColor: '#33b76bf2',
            '&:hover': {
                backgroundColor: '#33b76bf2'
            }
        },
        userWorstGradeColor: {
            backgroundColor: 'red',
            '&:hover': {
                backgroundColor: 'red'
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

const CumulativeReport = () => {

    const [highGradeUsers, setHighGradeUsers] = React.useState([])

    const classes = useStyles();
    let i = 0
    let check = 0
    let prevValue

    React.useEffect(()=>{
        if(highGradeUsers) prevValue = highGradeUsers[0]?.grade
    },[highGradeUsers])

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h2>گزارش تجمیعی کارکنان سازمان</h2>
                <Link className={classes.backButton} href={'/users/users-list'}>بازگشت</Link>
            </div>
            <SelectMonthYear setHighGradeUsers={setHighGradeUsers} />

            <List dense>
                <ListItem button className={classes.listTitle}>
                    <ListItemText className={classes.listItemTitle} id='1' primary="ردیف" />
                    <ListItemText className={classes.listItemTitle} id='2' primary="نام و نام خانوادگی" />
                    <ListItemText className={classes.listItemTitle} id='3' primary="کد پرسنلی" />
                    <ListItemText className={classes.listItemTitle} id='4' primary="امتیاز" />
                </ListItem>
                {highGradeUsers && highGradeUsers.map((value) => {
                    if(prevValue !== value.grade) check = check + 1
                    prevValue = value.grade
                    return (
                        <ListItem key={value.id} button className={value.rank === 2 
                            ? classes.userHighGradeColor 
                            :  value.rank === 0 ? classes.userWorstGradeColor : ''}
                            >

                            <ListItemText className={classes.listItemText} id={value.id} primary={++i} />
                            <ListItemText className={classes.listItemText} id={value.id} primary={value.name + ' ' + value.lastname} />
                            <ListItemText className={classes.listItemText} id={value.id} primary={value.code} />
                            <ListItemText className={classes.listItemText} id={value.id} primary={value.grade} />

                            <ListItemSecondaryAction></ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export default CumulativeReport
