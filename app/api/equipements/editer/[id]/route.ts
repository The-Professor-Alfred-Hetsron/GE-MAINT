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

      const equipement = await prismadb.equipement.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!equipement){
        return NextResponse.json({ error: "aucun equipement trouve" }, { status: 401 });
      }

      const updated = await prismadb.equipement.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          code: json.code || equipement.code,
          nom: json.nom || equipement.nom,
          marque_fabricant: json.marque_fabricant || equipement.marque_fabricant,
          image: json.image || equipement.image,
          description: json.description || equipement.description,
          localisation: json.localisation || equipement.localisation,
          numero_serie: json.numero_serie || equipement.numero_serie,
          modele: json.modele || equipement.modele,
          etat: json.etat || equipement.etat,
        }
      });

      return NextResponse.json({ equipement: updated }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}