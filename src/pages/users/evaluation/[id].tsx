import PrimaryLayout from '../../../components/layout/primary-layout'
import EvaluationForm from '../../../components/users/evaluation'
import PrivateRoute from './../../../components/hocs/private-route';

const evaluation = () => {
    return (
        <PrimaryLayout>
            <EvaluationForm />
        </PrimaryLayout>
    )
}

export default PrivateRoute(evaluation)
