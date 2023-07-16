import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

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

      return NextResponse.json({ sousSysteme: sousSysteme }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}