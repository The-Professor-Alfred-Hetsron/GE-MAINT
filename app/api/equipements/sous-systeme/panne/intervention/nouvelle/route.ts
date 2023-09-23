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
      const json = await req.json()
      const intervention = await prismadb.intervention.create({
        data: {
            panne_id:Number.parseInt(json.panne_id),
            executant:"",
            debut_intervention:"",
            fin_intervention:"",
            etat_final:"",
            observation:"",
            ...json
        },
      });
      return NextResponse.json({ intervention: intervention }, { status: 200 },);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}