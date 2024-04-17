import { redirect } from 'next/navigation';
import { getCharacterById } from '../services/character.service';
import CharacterDetail from './components/CharacterDetail';

interface CharacterDetailPageProps {
  params: { id: string };
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  if (!params.id) return redirect('/characters');
  let character
  
  try {
    if (params.id.match(/\d/)) {
      character = await getCharacterById(params.id);
    }
  } catch (error: any) {
    if ('message' in error && error.message === 'Character not found') {
      redirect('/characters');
    }
  }

  return <CharacterDetail character={character}/>;
}