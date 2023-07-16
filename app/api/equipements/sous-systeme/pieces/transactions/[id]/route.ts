import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

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

      return NextResponse.json({ transaction: transaction }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}