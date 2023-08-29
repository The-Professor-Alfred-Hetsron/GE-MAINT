import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const panne = await prismadb.panne.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!panne){
        return NextResponse.json({ error: "aucune panne trouvee" }, { status: 404 });
      }

      return NextResponse.json({ panne: panne }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}