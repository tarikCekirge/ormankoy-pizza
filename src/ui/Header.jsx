import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/user/UserName'

const Header = () => {
    return (
        <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
            <Link to="/" className="tracking-wide font-bold">
                Ormanköy Pizza <span className='text-red-800'>&</span> Fastfood
            </Link>
            <SearchOrder />
            <UserName />
        </header>
    )
}

export default Header