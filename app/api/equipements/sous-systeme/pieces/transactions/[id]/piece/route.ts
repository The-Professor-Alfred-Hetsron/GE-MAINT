import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const transaction = await prismadb.transaction.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!transaction){
        return NextResponse.json({ error: "aucune transaction trouvee" }, { status: 404 });
      }
      const piece = await prismadb.piece.findUnique({
        where: {
          id: transaction.piece_id,
        },
      });

      if (!piece){
        return NextResponse.json({ error: "aucune piece trouvee" }, { status: 404 });
      }

      return NextResponse.json({ piece: piece }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}