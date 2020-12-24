import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',

            '& button': {
                color: 'white',
                boxShadow: 'unset',
            }
        },
        deleteButton: {
            backgroundColor: 'red',
            minWidth: 70,
            '&:hover': {
                backgroundColor: 'red'
            },
        },
        cancellButton: {
            backgroundColor: '#979797d6',
            minWidth: 70,
            '&:hover': {
                backgroundColor: '#979797d6'
            },
        }
    }),
);

interface AlertDialogSlideProps {
    onClose?: Function
    openDialog?: any
    setOpenDialog?: any
}

export default function DeleteUser({ onClose, openDialog, setOpenDialog }: AlertDialogSlideProps) {

    const classes = useStyles()

    const handleSend = () => {
        setOpenDialog(false)
        onClose()
    }

    return (
        <div className={classes.root}>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={null}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{`تایید عملیات حذف`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        با حذف کاربر تمامی گزارشات آن نیز حذف میشود
                        <br />
                        آیا مطمئن هستید؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions  className={classes.root}>
                    <Button className={classes.cancellButton} variant="outlined" onClick={()=> setOpenDialog(false)}>انصراف</Button>
                    <Button className={classes.deleteButton} variant="outlined" onClick={handleSend}>تایید</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
});
