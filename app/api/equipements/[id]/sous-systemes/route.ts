import { NextResponse } from 'next/server'
import prismadb from '../../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
      const sousSystemes = await prismadb.sousSysteme.findMany({
        where: {
            equipement_id: Number.parseInt(id),
        },
      });

      return NextResponse.json({ sousSystemes: sousSystemes }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}