import CreateUser from "../features/user/CreateUser"

const Home = () => {
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        En lezzetli pizza.
        <br />
        <span className="text-yellow-500">
          Fırından çıkar çıkmaz kapınızda.
        </span>
      </h1>

      <CreateUser />
    </div>
  )
}

export default Home