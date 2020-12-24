import { Field, Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import useAuth from '../contexts/auth'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Container, Button } from '@material-ui/core'



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
            height: '100vh'
        },
        logo: {
            position: 'absolute',
            width: 100,
            top: 100,
        },
        content: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            boxShadow: '2px 3px 12px 1px rgba(0,0,0,0.55)'
        },
        title: {
            fontSize: 23,
            marginBottom: 30
        },
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px"
        },
        fieldWrapper: {
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            width: "100%",
            marginBottom: "20px",
            '& input': {
                width: "80%",
                height: "40px",
                padding: '5px 8px',
                borderRadius: 23,
                outline: 'unset',
                border: '1px solid #3b3939'
            }
        },
        formBtn: {
            marginTop: "20px",
            borderRadius: 23,
            width: "80%"
        }
    })
)

const SignInForm = () => {

    const classes = useStyles()
    const router = useRouter()
    const { signIn }: any = useAuth();

    return (
        <Container maxWidth="sm" className={classes.root}>

            <img className={classes.logo} src={require('../../assets/images/splash.png')} width="100px" />

            <div className={classes.content}>
                <div className={classes.title}>ورود کاربران</div>
                <div style={{ width: "100%" }}>
                    <Formik
                        initialValues={{ password: '', username: '' }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string().min(5, 'پسورد باید 5 کاراکتر یا بیشتر باشد').required('فیلد پسورد مورد نیاز است'),
                            username: Yup.string().required('فیلد نام کاربری مورد نیاز است')
                        })}
                        onSubmit={(values, actions) => {
                            signIn(values).then(() => {
                                actions.setSubmitting(false)
                                actions.resetForm();
                            }).catch(() => {
                                actions.setSubmitting(false)
                            })
                        }}
                    >
                        {({ touched, errors, isSubmitting }: FormikProps<any>) => (
                            <Form className={classes.form}>

                                <div className={classes.fieldWrapper}>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="نام کاربری خود را وارد کنید"
                                    />
                                    {touched.username && errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                                </div>

                                <div className={classes.fieldWrapper}>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="رمز عبور خود را وارد کنید"
                                    />
                                    {touched.password && errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                                </div>

                                <div className={classes.fieldWrapper}>
                                    <Button variant="contained" color="secondary" className={classes.formBtn} type="submit" disabled={isSubmitting}>ورود</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    )
}

export default SignInForm