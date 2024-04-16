import { getPlanets } from './services/planet.service';
import ContainerPlanets from './components/ContainerPlanets';

export default async function PlanetsPage() {
  const planets = await getPlanets({});
  
  return <ContainerPlanets planets={planets} />;
}
