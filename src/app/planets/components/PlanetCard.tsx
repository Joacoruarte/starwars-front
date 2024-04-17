import ContainerEntityCard from '@/components/ContainerEntityCard';
import { Planet } from '../models/planet.t';

export default function PlanetCard({
  id,
  name,
  climate,
  population,
  terrain,
}: Pick<Planet, 'id' | 'name' | 'population' | 'climate' | 'terrain'>) {
  return (
    <ContainerEntityCard id={id} entityTitle={name} redirectPath={'planets'}>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Clima:</h4>
        <p className='text-lg text-gray-300 line-clamp-4 text-ellipsis'>
          {climate}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Poblacion:</h4>
        <p className='text-lg text-gray-300'>{population}</p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Terreno:</h4>
        <p className='text-lg text-gray-300'>{terrain}</p>
      </div>
    </ContainerEntityCard>
  );
}
