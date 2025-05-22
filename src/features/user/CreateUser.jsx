import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username))
    setUsername('')
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-100 md:text-base font-bold">👋 Hoş geldiniz! Lütfen önce adınızı girin:</p>

      <input
        type="text"
        placeholder="Adınız ve soyadınız"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72 text-stone-200"
      />

      {username !== '' && (
        <div>
          <Button type="primary">Siparişe başla</Button>
        </div>
      )}
    </form>
  );

}

export default CreateUser;
