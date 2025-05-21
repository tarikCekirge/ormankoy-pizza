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
        <section className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="overflow-y-auto">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </section>
    );
};

export default AppLayout;
