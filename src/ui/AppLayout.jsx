import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

const AppLayout = () => {
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';
    // const isIdle = navigation.state === 'idle';
    // const isError = navigation.state === 'error';

    if (isLoading) return <Loader />;


    return (
        <section className="layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <CartOverview />
        </section>
    );
};

export default AppLayout;
