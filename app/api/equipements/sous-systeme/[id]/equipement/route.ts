import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const sousSysteme = await prismadb.sousSysteme.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!sousSysteme){
        return NextResponse.json({ error: "aucun sous systeme trouve" }, { status: 404 });
      }
      const equipement = await prismadb.equipement.findUnique({
        where: {
          id: sousSysteme.equipement_id,
        },
      });

      if (!equipement){
        return NextResponse.json({ error: "aucun equipement trouve" }, { status: 404 });
      }

      return NextResponse.json({ equipement: equipement }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}