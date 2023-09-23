import { NextResponse } from 'next/server'
import prismadb from '../../../../../lib/prismadb'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    console.log('patch')
    try {
      const json = await req.json();
      const isExistingTache = await prismadb.tache.findUnique({
        where: {
          id: Number.parseInt(params.id),
        },
      });
  
      if (!isExistingTache) {
        return NextResponse.json({ error: 'Not existing tache' }, { status: 422 });
      }
  
      const tache = await prismadb.tache.update({
        where: {
            id: Number.parseInt(params.id)
        },
        data: json,
      });
  
      return NextResponse.json({ tache: tache }, { status: 500 },);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}