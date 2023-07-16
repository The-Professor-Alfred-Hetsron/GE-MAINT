import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export async function POST(req: Request) {
    try {
      const json = await req.json();
      const isExisted = await prismadb.piece.findUnique({
        where: {
          numero_serie: json.numero_serie,
        },
      });
      if (isExisted){
        return NextResponse.json({ error: "piece existante" }, { status: 422 },);
      }
      
      const piece = await prismadb.piece.create({
        data: json,
      });
  
      return NextResponse.json({ piece: piece }, { status: 200 },);
    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}