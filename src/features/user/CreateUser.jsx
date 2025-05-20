import { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Hoş geldiniz! Lütfen önce adınızı girin:</p>

      <input
        type="text"
        placeholder="Adınız ve soyadınız"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <button>Siparişe başla</button>
        </div>
      )}
    </form>
  );

}

export default CreateUser;
