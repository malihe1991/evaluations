
import { Formik, FormikProps, Field, Form } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px"
        },
        fieldWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            marginBottom: "20px",
            '& input': {
                width: "90%",
                height: "40px",
                padding: 5,
                borderRadius: 23,
                border: '1px solid #5b5353',
                outline: 'unset'
            }
        },
        formBtn: {
            width: '90%',
            margin: 20,
            borderRadius: 23
        }
    })
)

export const AddUserForm = ({ handleClose, setRow }) => {

    const classes = useStyles()

    return (
        <Formik
            initialValues={{ name: '', lastname: '', code: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('فیلد نام مورد نیاز است'),
                lastname: Yup.string().required('فیلد نام خانوادی مورد نیاز است'),
                code: Yup.string().required('فیلد کد پرسنلی مورد نیاز است')

            })}
            onSubmit={(values, actions) => {
                axios.post('user/save', JSON.stringify(values))
                    .then(res => {
                        actions.setSubmitting(false)
                        actions.resetForm();
                        alert("ثبت با موفقیت انجام شد !")

                        axios.get("user/get-user-unit").then(res => { setRow(res.data) })

                        handleClose()
                    }).catch(err => {
                        console.log(err)
                        actions.setSubmitting(false)
                        alert("ثبت با شکست مواجه شد !")
                    })
            }}
        >
            {({ isSubmitting, touched, errors }: FormikProps<any>) => (
                <Form className={classes.form}>
                    <div className={classes.fieldWrapper}>
                        <Field
                            type="text"
                            name="name"
                            placeholder="نام کاربر را وارد کنید"
                        />
                        {touched.name && errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    </div>

                    <div className={classes.fieldWrapper}>
                        <Field
                            type="text"
                            name="lastname"
                            placeholder="  نام خانوادگی کاربر را وارد کنید"
                        />
                        {touched.lastname && errors.lastname && <p style={{ color: "red" }}>{errors.lastname}</p>}
                    </div>

                    <div className={classes.fieldWrapper}>
                        <Field
                            type="text"
                            name="code"
                            placeholder="کد پرسنلی کاربر را وارد کنید"
                        />
                        {touched.code && errors.code && <p style={{ color: "red" }}>{errors.code}</p>}
                    </div>

                    <div className={classes.fieldWrapper}>
                        <Button variant="contained" color="primary" className={classes.formBtn} type="submit" disabled={isSubmitting}>ثبت</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
