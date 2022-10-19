import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useResource } from '../hooks/use-resource';
import { Article } from '../model/article';

export default function ArticlePage() {
  const { control, handleSubmit, reset } = useForm<Article>({
    defaultValues: { current: true, artNr: 'P', name: '', price: 0.0 },
  });

  function saveArticle(article: Article) {
    article.price = Number(article.price);

    toast.promise(
      /*
      fetch('https://rube-servidor.netlify.app/api/public/articles', {
        method: 'POST',
        body: JSON.stringify(article),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      */
      axios
        .post<Article>(
          'https://rube-servidor.netlify.app/api/public/articles',
          article
        )
        .then(() => {
          invalidate();
          // setArticles([...articles, response.data]);
          reset({ current: true, artNr: 'P', name: '', price: 0.0 });
        }),
      {
        loading: 'Artikel wird gespeichert',
        success: `${article.name} hinzugefügt`,
        error: 'Da lief etwas schief',
      }
    );
  }

  console.log('Rendering');

  const {
    data: articles,
    isLoading,
    invalidate,
  } = useResource<Article>('articles');

  /*
  const { data: articles, error } = useSWR<Article[]>('articles', (key) =>
    axios
      .get(`https://rube-servidor.netlify.app/api/public/${key}`)
      .then((res) => res.data)
  );

  const isLoading = !error && !articles;

  */

  /*
  const [articles, setArticles] = useState<Article[]>([]);

  const [isLoading, setLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    const loadedData = await axios
      .get<Article[]>('https://rube-servidor.netlify.app/api/public/articles')
      .then((response) => response.data);
    setArticles(loadedData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  */

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
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        articles &&
        articles.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Art-Nr</th>
                <th>Name</th>
                <th>Aktuell</th>
                <th>Preis</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id}>
                  <td>{a.artNr}</td>
                  <td>{a.name}</td>
                  <td>{a.current}</td>
                  <td>{a.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}
