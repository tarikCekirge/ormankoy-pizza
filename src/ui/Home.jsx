import CreateUser from "../features/user/CreateUser"
import { useSelector } from "react-redux"
import Button from "./Button"

const Home = () => {


  const userName = useSelector((state) => state.user.userName)
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        En lezzetli pizza.
        <br />
        <span className="text-yellow-500">
          Fırından çıkar çıkmaz kapınızda.
        </span>
      </h1>

      {userName === '' ? <CreateUser /> : <Button type="primary" to="/menu">Siparişe Başla</Button>}
    </div>
  )
}

export default Home