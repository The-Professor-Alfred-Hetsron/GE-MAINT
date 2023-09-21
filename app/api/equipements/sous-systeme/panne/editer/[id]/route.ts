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
      console.log(json);
      const panne = await prismadb.panne.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!panne){
        return NextResponse.json({ error: "aucune panne trouvee" }, { status: 401 });
      }

      const updated = await prismadb.panne.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          nom: json.nom || panne.nom,
          description: json.description || panne.description,
          soussysteme_id: json.equipement_id || panne.soussysteme_id,
          garvite: json.garvite || panne.garvite
        }
      });

      return NextResponse.json({ panne: updated }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}