type Film = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
};

export default async function StronaGlowna() {
  "use cache";

  const klucz = process.env.TMDB_API_KEY;
  const odpowiedz = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pl-PL&api_key=${klucz}`);
  const dane = await odpowiedz.json();
  const filmy: Film[] = dane.results ?? [];

  return (
    <main style={{ padding: 20 }}>
      <h1>Popularne filmy</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
        {filmy.map((film) => (
          <div key={film.id} style={{ width: 160 }}>
            <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt={film.title} width={160} />
            <p>{film.title} ({film.release_date.slice(0, 4)})</p>
          </div>
        ))}
      </div>
    </main>
  );
}