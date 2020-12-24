import React, { createContext, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

import UsersListItem from './users-list-item'
import { Button, Modal } from '@material-ui/core';
import { Formik, Form, Field, FormikProps } from 'formik';
import { AddUserForm } from './add-user';
import { useRouter } from 'next/router';
import OptionSelect from './option-select';
import DeleteUser from './delete-user';

const useStyles = makeStyles((theme) => ({
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: '10px 0px'
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
    paper: {
        position: 'absolute',
        width: "500px",
        top: "20%",
        left: "40%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'unset'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
        padding: '10px 5px',
        '& > div': {
            width: "100%",
            fontSize: 20
        }
    },
    userController: {
        display: 'flex'
    }
}))

export default function UsersList() {

    const classes = useStyles()
    const router = useRouter()

    const [row, setRow] = React.useState([])
    const [userId, setUserId] = React.useState()
    const [reportAccess, setReportAccess] = React.useState(false)

    const [openAddUser, setOpenAddUser] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)

    useEffect(() => {
        axios.get("user/get-user-unit")
            .then(res => { setRow(res.data) })
            .catch(error => { console.log('error:', error) })

        axios.get("user/report-access")
            .then(res => { setReportAccess(res.data) })
            .catch(error => { console.log('error:', error) })
    }, [])

    const handleDelete = () => {
        axios.post('/user/delete-user',{ userId }).then(_ => {
            axios.get("user/get-user-unit").then(res => { setRow(res.data) })
        })
    }

    const handleReports = (link: any) => {
        router.push(link)
    }

    const body = (
        <div className={classes.paper} >
            <div className={classes.header}>
                <div>افزودن کاربر</div>
                <button type='button' onClick={()=> setOpenAddUser(false)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><CloseIcon /></button>
            </div>
            <AddUserForm handleClose={()=> setOpenAddUser(false)} setRow={setRow} />
        </div>
    );

    return (
        <div style={{ width: '80%', margin: "10px auto 10px auto" }}>
            <Modal
                open={openAddUser}
                onClose={()=> setOpenAddUser(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>

            <div className={classes.title}>
                <h2>لیست کاربران</h2>
                <div className={classes.userController}>
                    <OptionSelect reportAccess={reportAccess} handleChange={(link) => handleReports(link)} />
                    <Button onClick={()=> setOpenAddUser(true)} variant="contained" color="primary">افزودن کاربر</Button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.TableHead}>
                        <TableRow>
                            <TableCell align="left">ردیف</TableCell>
                            <TableCell align="left">نام</TableCell>
                            <TableCell align="left">نام خانوادگی</TableCell>
                            <TableCell align="left">کد پرسنلی</TableCell>
                            <TableCell align="left">ارزیابی</TableCell>
                            <TableCell align="left">حذف</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row) => (
                            <React.Fragment key={row.id} >
                                <UsersListItem row={row} setUserId={setUserId} setOpenDialog={setOpenDialog} />
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openDialog && <DeleteUser openDialog={openDialog} setOpenDialog={setOpenDialog} onClose={() => handleDelete()} /> }
        </div>
    );
}
