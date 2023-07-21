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
      const transactions = await prismadb.transaction.findMany({
        where: {
          piece_id: piece.id,
        },
      });
      
      return NextResponse.json({ transactions: transactions }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}