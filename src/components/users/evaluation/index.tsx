import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import axios from 'axios';

import EvaluationRow from './evoluation-row'
import { row } from '../../../assets/data/parameters'

interface StateProps {
    name: string;
    lastname: string;
    unitName: string;
    code: string;
}
const useStyles = makeStyles({
    title: {
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding: '10px auto',
        '& a:hover': {
            textDecoration: 'none'
        } 
    },
    userInfo: {
        display: "flex",
        justifyContent: "space-between",
        '& h4': {
            fontWeight: 100
        }
    },
    table: {
        minWidth: 650,
        '& th': {
            color: 'white',
            fontSize: 15
        },
        '& td': {
            fontSize: 13
        }
    },
    TableHead: {
        backgroundColor: "black"
    },
    backButton: {
        background: "black",
        fontSize: 14,
        color: "white",
        padding: 4,
        borderRadius: 5
    }
});

export default function EvaluationForm() {

    const classes = useStyles()
    const router = useRouter()

    const [userInfo, setUserInfo] = React.useState([])
    const [sumPoint, setSumPoint] = React.useState(0)
    const [user, setUser] = React.useState<StateProps>()

    React.useEffect(() => {
        axios.post(`user/get-user-by-id`, {
            userId: router.query.id
        }).then(res => {
            setUser(res.data)
        }).catch(err => { console.log(err) })
    }, [router.query.id])

    const handleClick = () => {

        axios.post('assessment/save', JSON.stringify({
            user_id: (router.query.id).toString(),
            user_info: userInfo
        }))
        .then(_ => {
            router.push('/users/users-list')
        }).catch(err => {
            alert("خطا در عملیات !")
            console.log(err)
        })
    }

    return (
        <div style={{ width: '80%', margin: "10px auto 10px auto" }}>
            <div className={classes.title}>
                <h2>فرم ارزیابی کاربر</h2>
                <Link className={classes.backButton} href={'/users/users-list'}>بازگشت</Link>

            </div>

            <div className={classes.userInfo}>
                <h4>
                    نام : {user?.name}
                </h4>
                <h4>
                    نام خانوادگی : {user?.lastname}
                </h4>
                <h4>
                    واحد: {user?.unitName}
                </h4>
                <h4>
                    کد پرسنلی : {user?.code}
                </h4>

            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.TableHead}>
                        <TableRow>
                            <TableCell align="left">ردیف</TableCell>
                            <TableCell align="left">نوع عملکرد</TableCell>
                            <TableCell align="left">امتیاز</TableCell>
                            <TableCell align="center">امتیاز انتخابی</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row,i) => (
                            <React.Fragment key={i} >
                                <EvaluationRow row={row} setUserInfo={setUserInfo} userInfo={userInfo} setSumPoint={setSumPoint} />
                            </React.Fragment>
                        ))}
                        <TableRow className={classes.TableHead}>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left" style={{color: 'white'}}>جمع کل</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="center" style={{color: 'white'}}>{sumPoint}</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
            <div style={{ width: "20%", margin: "20px auto 20px auto" }}>
                <Button onClick={handleClick} disabled={userInfo.length > 24 ? false : true} variant="contained" color="primary">ثبت ارزیابی</Button>
            </div>
        </div>

    );
}
