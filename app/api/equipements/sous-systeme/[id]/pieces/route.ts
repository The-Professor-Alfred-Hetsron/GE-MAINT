import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const sousSysteme = await prismadb.sousSysteme.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!sousSysteme){
        return NextResponse.json({ error: "aucun sous systeme trouvee" }, { status: 404 });
      }
      const pieces = await prismadb.piece.findMany({
        where: {
          soussysteme_id: sousSysteme.id,
        },
      });
      
      return NextResponse.json({ pieces: pieces }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}