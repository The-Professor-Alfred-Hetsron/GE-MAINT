import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const tache = await prismadb.tache.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      return NextResponse.json({ tache: tache }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}