import PrimaryLayout from '../../../components/layout/primary-layout'
import PrivateRoute from '../../../components/hocs/private-route';
import RatingStatusReport from '../../../components/users/rating-status-report';

const RatingStatusReports = () => {
    return (
        <PrimaryLayout>
            <RatingStatusReport />
        </PrimaryLayout>
    )

}

export default PrivateRoute(RatingStatusReports)