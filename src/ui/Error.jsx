import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './Button';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError()
  console.error(error);
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-screen text-center'>
      <h1 className=" text-xl font-semibold md:text-3xl">Bir şeyler ters gitti 😢</h1>
      <p className="text-yellow-500 font-bold">{error.status && `${error.status} |`} {error.message || error.statusText}</p>
      <Button type={'secondary'} onClick={() => navigate(-1)}>&larr; Geri dön</Button>
    </div>
  );

}

export default Error;
