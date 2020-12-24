import PrimaryLayout from '../../../components/layout/primary-layout'
import UsersList from '../../../components/users/users-list'
import PrivateRoute from './../../../components/hocs/private-route';

const Users = () => {
    return (
        <PrimaryLayout>
            <UsersList />
        </PrimaryLayout>
    )

}

export default PrivateRoute(Users)