import { Button } from '@mui/material';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [error, setError] = useState('');

  const accFld = useRef<HTMLInputElement>(null);
  const pwFld = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Uncontrolled inputs

  // Das Gegenteil (controlled inputs) werden über value (checked, selected, ...) und
  // onChange-Handler an einen state gebunden (useState())

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (accFld.current && pwFld.current) {
      const acc = accFld.current.value;
      const pw = pwFld.current.value;

      // Todo: real world password check
      if (pw === 'geheim') {
        // Todo: log user on
        navigate('/');
      } else {
        setError('Account und/oder Passwort falsch');
        pwFld.current.value = '';
      }
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="acc">Account:</label>
          <input required ref={accFld} id="acc"></input>
        </div>
        <div>
          <label htmlFor="password">Passwort:</label>
          <input required ref={pwFld} id="password" type="password" />
        </div>
        <div>
          <Button type="submit" variant="contained">
            Anmelden
          </Button>
        </div>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
