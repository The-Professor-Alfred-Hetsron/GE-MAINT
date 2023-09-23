import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

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
      const isExisted = await prismadb.equipement.findUnique({
        where: {
          code: json.code,
        },
      });
      if (isExisted){
        return NextResponse.json({ error: "equipement exist" }, { status: 422 },);
      }
      
      const equipement = await prismadb.equipement.create({
        data: json,
      });
  
      return NextResponse.json({ equipement: equipement }, { status: 200 },);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}