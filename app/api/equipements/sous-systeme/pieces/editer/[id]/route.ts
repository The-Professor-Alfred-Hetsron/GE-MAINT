import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

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
      const piece = await prismadb.piece.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!piece){
        return NextResponse.json({ error: "aucune piece trouvee" }, { status: 401 });
      }

      const updated = await prismadb.piece.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          nom: json.nom || piece.nom,
          marque_fabricant: json.marque_fabricant || piece.marque_fabricant,
          image: json.image || piece.image,
          description: json.description || piece.description,
          numero_serie: json.numero_serie || piece.numero_serie,
          modele: json.modele || piece.modele,
          soussysteme_id: json.equipement_id || piece.soussysteme_id,
          stock: json.stock || piece?.stock,
          minimum_stock: json.minimum_stock || piece?.minimum_stock
        }
      });

      return NextResponse.json({ piece: updated }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}