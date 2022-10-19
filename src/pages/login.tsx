import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function LoginPage() {
  const [error, setError] = useState('');

  const accFld = useRef<HTMLInputElement>(null);
  const pwFld = useRef<HTMLInputElement>(null);

  const { signIn } = useAuth();

  const navigate = useNavigate();

  // Uncontrolled inputs

  // Das Gegenteil (controlled inputs) werden über value (checked, selected, ...) und
  // onChange-Handler an einen state gebunden (useState())

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (accFld.current && pwFld.current) {
      const acc = accFld.current.value;
      const pw = pwFld.current.value;

      const success = await signIn(acc, pw);
      if (success) {
        navigate('/');
      } else {
        setError('Account und/oder Passwort falsch');
        pwFld.current.value = '';
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ mt: 4, mx: 'auto', pb: 2, maxWidth: 480 }}>
        <CardContent>
          <h2>Login</h2>
          <div>
            <TextField
              size="small"
              inputRef={accFld}
              id="acc"
              label="Account"
              required
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <TextField
              size="small"
              type="password"
              inputRef={pwFld}
              id="pw"
              label="Passwort"
              required
            />
          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button type="submit" variant="contained">
            Anmelden
          </Button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </CardActions>
      </Card>
    </form>
  );
}
