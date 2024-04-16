import { redirect } from "next/navigation";
import { getFilmById } from "../services/film.service";
import FilmDetail from "./components/FilmDetail";

interface FilmDetailPagePageProps {
  params: { id: string };
}

export default async function FilmDetailPage({ params }: FilmDetailPagePageProps) {
  if (!params.id) return redirect('/films');
  let film
  
  try {
    if (params.id.match(/\d/)) {
      film = await getFilmById(params.id);
    }
  } catch (error: any) {
    if (error.message === 'Film not found') {
      redirect('/films');
    }
  }
  return <FilmDetail film={film} />
}
