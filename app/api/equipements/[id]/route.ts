import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const equipement = await prismadb.equipement.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      return NextResponse.json({ equipement: equipement }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}