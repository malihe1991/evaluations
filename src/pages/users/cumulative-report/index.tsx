import PrimaryLayout from '../../../components/layout/primary-layout'
import PrivateRoute from '../../../components/hocs/private-route';
import CumulativeReport from '../../../components/users/cumulative-report';

const CumulativeReports = () => {
    return (
        <PrimaryLayout>
            <CumulativeReport />
        </PrimaryLayout>
    )

}

export default PrivateRoute(CumulativeReports)