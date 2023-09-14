import { NextResponse } from 'next/server'
import prismadb from '../../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

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

      return NextResponse.json({ sousSysteme: sousSysteme }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}