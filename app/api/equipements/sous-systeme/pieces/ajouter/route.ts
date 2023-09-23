import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

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
      json.soussysteme_id = Number.parseInt(json.soussysteme_id as string)
      const piece = await prismadb.piece.create({
        data: json,
      });
  
      return NextResponse.json({ piece: piece }, { status: 200 },);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}