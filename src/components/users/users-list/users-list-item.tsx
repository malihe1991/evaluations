import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

const useStyles = makeStyles((theme) => ({
    delete: {
        color: 'red',
        cursor: 'pointer'
    },
    btnEvaluation: {
        backgroundColor: 'transparent',
        border: '1px solid rgba(0, 0, 0, 0.87)',
        borderRadius: 4
    }
}))

export default function UserListsItem(props) {

    const classes = useStyles()
    const { row, setUserId, setOpenDialog } = props
    const router = useRouter()

    const handleEvaluation = () => {
        router.push(`/users/evaluation/${row.id}`)
    }

    const handleClickDialog = (id) => {
        setUserId(id)
        setOpenDialog(true)
    }

    return (
        <TableRow>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.lastname}</TableCell>
            <TableCell align="left">{row.code}</TableCell>
            <TableCell align="left">
                <button type="button" className={classes.btnEvaluation} style={{ cursor: row.evaluated ? 'default' : 'pointer' }} onClick={handleEvaluation} disabled={row.evaluated ? true : false}>ارزیابی</button>
            </TableCell>
            <TableCell align="left" className={classes.delete}><div onClick={()=> handleClickDialog(row.id)}><DeleteOutlinedIcon /></div></TableCell>
        </TableRow>
    )
}