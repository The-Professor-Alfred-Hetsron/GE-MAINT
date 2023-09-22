import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const json = await req.json();

      const intervention = await prismadb.intervention.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!intervention){
        return NextResponse.json({ error: "Aucune Intervention trouvée" }, { status: 401 });
      }

      const updated = await prismadb.intervention.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          panne_id:intervention.panne_id,
          etat_initial:intervention.etat_initial,
          demander_par:intervention.demander_par,
          statut:json.statut,
          executant:json.executant,
          debut_intervention:json.debut_intervention,
          fin_intervention:json.fin_intervention,
          etat_final:json.etat_final,
          observation:json.observation,
        }
      });

      return NextResponse.json({ intervention: updated }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}