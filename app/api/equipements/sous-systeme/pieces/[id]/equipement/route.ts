import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const piece = await prismadb.piece.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!piece){
        return NextResponse.json({ error: "aucune piece trouvee" }, { status: 404 });
      }
      const sousSysteme = await prismadb.sousSysteme.findUnique({
        where: {
          id: piece.soussysteme_id,
        },
      });

      if (!sousSysteme){
        return NextResponse.json({ error: "aucun sous systeme trouve" }, { status: 404 });
      }

      const equipement = await prismadb.equipement.findUnique({
        where: {
          id: sousSysteme.equipement_id,
        },
      });

      if (!equipement){
        return NextResponse.json({ error: "aucun equipement trouve" }, { status: 404 });
      }

      return NextResponse.json({ equipement: equipement }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}