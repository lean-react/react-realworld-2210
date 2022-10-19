import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Article } from '../model/article';

export default function ArticlePage() {
  const { control, handleSubmit } = useForm<Article>({
    defaultValues: { current: true, artNr: 'P', price: 0.0 },
  });

  function saveArticle(article: Article) {
    article.price = Number(article.price);
    console.log(article);
  }

  return (
    <div>
      <h2>Artikel</h2>
      <form noValidate onSubmit={handleSubmit(saveArticle)}>
        <div>
          <Controller
            control={control}
            name="artNr"
            rules={{
              required: true,
              pattern: {
                value: /^P\d{4}$/,
                message: 'Artikelnummern haben das Format P1234',
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <TextField
                error={error !== undefined}
                helperText={error?.message}
                required
                label="Artikel-Nr"
                inputRef={ref}
                {...props}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: 'Drei Zeichen sollten es schon sein.',
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <TextField
                error={error !== undefined}
                helperText={error?.message}
                required
                label="Bezeichnung"
                inputRef={ref}
                {...props}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="current"
            render={({ field: { ref, ...props } }) => (
              <FormControlLabel
                control={<Checkbox inputRef={ref} {...props} />}
                label="Aktuell"
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="price"
            rules={{
              required: true,
              min: {
                value: 0,
                message: 'Ungültiger Preis',
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <TextField
                error={error !== undefined}
                helperText={error?.message}
                required
                label="Preis"
                inputRef={ref}
                {...props}
              />
            )}
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Speichern
          </Button>
        </div>
      </form>
    </div>
  );
}
