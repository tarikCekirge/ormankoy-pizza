import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError()
  console.error(error);
  return (
    <div>
      <h1>Bir şeyler ters gitti 😢</h1>
      <p>{error.status && `${error.status} |`} {error.message || error.statusText}</p>
      <button onClick={() => navigate(-1)}>&larr; Geri dön</button>
    </div>
  );

}

export default Error;
