import ContainerEntityCard from '@/components/ContainerEntityCard';
import type { Character } from '../models/character.t';

type CharacterCardProps = Pick<
  Character,
  'id' | 'name' | 'height' | 'mass' | 'gender' | 'species'
>;

export default function CharacterCard({
  id,
  name,
  height,
  mass,
  gender,
  species,
}: CharacterCardProps) {
  return (
    <ContainerEntityCard id={id} entityTitle={name} redirectPath={'characters'}>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Altura:</h4>
        <p className='text-lg text-gray-300'>
          {height === 'unknown' ? '-' : `${height} cm`}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Peso:</h4>
        <p className='text-lg text-gray-300'>
          {mass === 'unknown' ? '-' : `${mass} kg`}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Genero:</h4>
        <p className='text-lg text-gray-300'>{gender}</p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Especie:</h4>
        <p className='text-lg text-gray-300'>{species?.[0] || 'Unknown'}</p>
      </div>
    </ContainerEntityCard>
  );
}
