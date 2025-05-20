import { Outlet } from 'react-router-dom'
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'

const AppLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <CartOverview />
        </>
    )
}

export default AppLayout