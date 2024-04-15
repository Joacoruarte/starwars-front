import { redirect } from 'next/navigation';
import { getCharacterById } from '../services/character.service';
import { Character } from '../models/character.t';
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
    if (error.message === 'Character not found') {
      redirect('/characters');
    }
  }

  return <CharacterDetail character={character}/>;
}