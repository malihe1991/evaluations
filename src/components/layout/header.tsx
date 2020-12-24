import classes from "*.module.css";
import { Link } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            padding: "10px 20px",
            backgroundColor: theme.palette.secondary.main,
            color: 'white',
            '& h1': {
                fontWeight: 500,
                fontSize: 20,
                margin: 10
            }
        },
        right: {
            display: 'flex',
            '& img': {
                objectFit: 'contain'
            },
            '& span': {
                display: 'flex',
                alignItems: 'center',
                fontSize: 10
            }
        },
        logout: {
            fontSize: "20px",
            '& > a': {
                color: 'white'
            }
        }
    }))
const Header = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.right}>
                <img src={require("../../assets/images/logo.png")} width="50px" height="50px" />
                <h1>سامانه ارزیابی کارکنان</h1>
                <span>رادار فرتک هوشمند</span>
            </div>

            <div className={classes.logout}>
                <Link href="/auth/sign-out"><ExitToAppIcon fontSize="large" /></Link>
            </div>
        </div>
    );

};

export default Header;