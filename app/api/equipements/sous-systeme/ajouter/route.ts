import { NextResponse } from 'next/server'
import prismadb from '../../../../../lib/prismadb'

export async function POST(req: Request) {
    try {
      const json = await req.json();
      const isExisted = await prismadb.sousSysteme.findUnique({
        where: {
          numero_serie: json.numero_serie,
        },
      });
      if (isExisted){
        return NextResponse.json({ error: "sous systeme exist" }, { status: 422 },);
      }
      
      const sousSysteme = await prismadb.sousSysteme.create({
        data: json,
      });
  
      return NextResponse.json({ sousSysteme: sousSysteme }, { status: 200 },);
    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}