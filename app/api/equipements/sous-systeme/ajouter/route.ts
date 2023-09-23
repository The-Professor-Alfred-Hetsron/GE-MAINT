import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5



export async function POST(req: Request) {
    try {
      //const json = await req.json();
      const json = await req.json()
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
      console.log(error)
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}