import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

export async function POST(req: Request) {
    try {
      const json = await req.json();
  
      const tache = await prismadb.tache.create({
        data: json,
      });
  
      return NextResponse.json({ tache: tache }, { status: 500 },);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}