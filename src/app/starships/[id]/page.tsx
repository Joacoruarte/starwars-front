import { redirect } from 'next/navigation';
import StarshipDetail from './components/StarshipDetail';
import { getStarshipById } from '../service/starship.service';

interface StarshipDetailPagePageProps {
  params: { id: string };
}

export default async function StarshipDetailPage({ params }: StarshipDetailPagePageProps) {
  if (!params.id) return redirect('/starshipss');
  let starship
  
  try {
    if (params.id.match(/\d/)) {
      starship = await getStarshipById(params.id);
    }
  } catch (error: any) {
    if (error.message === 'Starship not found') {
      redirect('/starships');
    }
  }
  return <StarshipDetail starship={starship} />
}