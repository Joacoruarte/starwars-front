import { redirect } from 'next/navigation';
import React from 'react';
import PlanetDetail from './components/PlanetDetail';
import { getPlanetById } from '../services/planet.service';

interface PlanetDetailPagePageProps {
  params: { id: string };
}

export default async function PlanetDetailPage({
  params,
}: PlanetDetailPagePageProps) {
  if (!params.id) return redirect('/planets');
  let planet;

  try {
    if (params.id.match(/\d/)) {
      planet = await getPlanetById(params.id);
    }
  } catch (error: any) {
    if (error.message === 'Planet not found') {
      redirect('/planets');
    }
  }
  return <PlanetDetail planet={planet} />;
}
