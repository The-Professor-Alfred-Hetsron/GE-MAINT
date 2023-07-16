import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

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

      return NextResponse.json({ piece: piece }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}