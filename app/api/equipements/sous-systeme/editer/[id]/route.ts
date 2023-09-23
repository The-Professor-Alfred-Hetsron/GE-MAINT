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

      const sousSysteme = await prismadb.sousSysteme.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!sousSysteme){
        return NextResponse.json({ error: "aucun sous systeme trouve" }, { status: 401 });
      }

      const updated = await prismadb.sousSysteme.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          nom: json.nom || sousSysteme.nom,
          marque_fabricant: json.marque_fabricant || sousSysteme.marque_fabricant,
          image: json.image || sousSysteme.image,
          description: json.description || sousSysteme.description,
          numero_serie: json.numero_serie || sousSysteme.numero_serie,
          modele: json.modele || sousSysteme.modele,
          equipement_id: json.equipement_id || sousSysteme.equipement_id
        }
      });

      return NextResponse.json({ sousSysteme: updated }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}