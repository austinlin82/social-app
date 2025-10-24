import app from './src/app';

const PORT = process.env.PORT || 4000;

app.listen(Number(PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});
