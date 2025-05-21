import { useState } from 'react';
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base font-bold">👋 Hoş geldiniz! Lütfen önce adınızı girin:</p>

      <input
        type="text"
        placeholder="Adınız ve soyadınız"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
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
