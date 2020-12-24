import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'


const ITEM_HEIGHT = 48;

export default function EvaluationRow({ row, setUserInfo, userInfo, setSumPoint }) {

    const menuItemValue = useRef([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSelect = (newPoint, title) => {

        menuItemValue.current[row.value].innerHtml = title
        let result = userInfo.find(o => o.id === row.value)

        if (result) {
            setUserInfo(prev => prev.map(el => {
                if (el.id === row.value) {
                    el.point = newPoint
                }
                return el
            }))
        }
        else {
            setUserInfo([...userInfo, {
                id: row.value,
                point: newPoint
            }])
        }
        setAnchorEl(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    useEffect(() => {
        let result = 0

        if (userInfo) {
            userInfo.map(el => {
                result = Number(el.point) + result
            })
            setSumPoint(result)
        }

    }, [userInfo])


    return (
        <TableRow>
            <TableCell align="left">{row.value}</TableCell>
            <TableCell align="left">{row.title}</TableCell>
            <TableCell align="left">
                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleSelect('4', 'عالی')}>عالی</MenuItem>
                        <MenuItem onClick={() => handleSelect('3', 'خوب')}>خوب</MenuItem>
                        <MenuItem onClick={() => handleSelect('2', 'متوسط')}>متوسط</MenuItem>
                        <MenuItem onClick={() => handleSelect('1', 'ضعیف')}>ضعیف</MenuItem>
                        <MenuItem onClick={() => handleSelect('0', 'نظری ندارم')}>نظری ندارم</MenuItem>
                    </Menu>
                </div>
            </TableCell>
            <TableCell ref={el => menuItemValue.current[row.value] = el} align="center">{menuItemValue.current[row.value]?.innerHtml}</TableCell>
        </TableRow>
    )
}