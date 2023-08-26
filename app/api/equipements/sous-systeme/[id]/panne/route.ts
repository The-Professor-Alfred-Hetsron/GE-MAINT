import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const json = await req.json()
      const panne = await prismadb.panne.create({
        data: {...json, soussysteme_id: Number.parseInt(id)},
      });
      return NextResponse.json({ panne: panne }, { status: 200 },);

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}