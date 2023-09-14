import { NextResponse } from "next/server"
import prismadb from '../../../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

//fake to change
export async function GET(req: Request) {
    try {
      const sousSystemes = await prismadb.sousSysteme.findMany();

      return NextResponse.json({ sousSystemes: sousSystemes }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}