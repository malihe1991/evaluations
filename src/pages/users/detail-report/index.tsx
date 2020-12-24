import PrimaryLayout from '../../../components/layout/primary-layout'
import PrivateRoute from './../../../components/hocs/private-route'
import DetailReport from './../../../components/users/detail-report/index'

const DetailsReport = () => {
    return (
        <PrimaryLayout>
            <DetailReport />
        </PrimaryLayout>
    )
}

export default PrivateRoute(DetailsReport)