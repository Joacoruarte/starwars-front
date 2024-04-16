import ContainerStarships from "./components/ContainerStarships";
import { getStarships } from "./service/starship.service";

export default async function StarshipsPage() {
  const starships = await getStarships({});
  
  return (
    <ContainerStarships starships={starships}/>
  )
}
