import ContainerEntityCard from '@/components/ContainerEntityCard';
import { Starship } from '../models/starship.t';

export default function StarshipCard({
  id,
  name,
  model,
  cargo_capacity,
  cost_in_credits,
}: Pick<
  Starship,
  'id' | 'name' | 'model' | 'cargo_capacity' | 'cost_in_credits'
>) {
  return (
    <ContainerEntityCard id={id} entityTitle={name} redirectPath={'starships'}>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Model:</h4>
        <p className='text-lg text-gray-300'>
          {model}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>
          Capacidad de carga:
        </h4>
        <p className='text-lg text-gray-300'>{cargo_capacity}</p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Costo en creditos:</h4>
        <p className='text-lg text-gray-300'>{cost_in_credits}</p>
      </div>
    </ContainerEntityCard>
  );
}
