import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const ssysteme = await prismadb.sousSysteme.findUnique({
        where: {
          id: Number.parseInt(id)
        }
      })
      if (!ssysteme){
        return NextResponse.json({ error: 'sous systeme introuvable' }, { status: 401 },);
      }

      const json = await req.json()
      const panne = await prismadb.panne.create({
        data: {...json, soussysteme_id: Number.parseInt(id), statut: 'NON RESOLU'},
      });

      if (!panne){
        return NextResponse.json({ error: 'impossible de signaler une panne reessayez plus tard' }, { status: 501 },);
      }
      return NextResponse.json({ panne: panne }, { status: 200 },);

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const ssysteme = await prismadb.sousSysteme.findUnique({
      where: {
        id: Number.parseInt(id)
      }
    })
    if (!ssysteme){
      return NextResponse.json({ error: 'sous systeme introuvable' }, { status: 401 },);
    }

    const pannes = await prismadb.panne.findMany({
      where: {
        soussysteme_id: ssysteme.id
      },
    });

    if (!pannes){
      return NextResponse.json({ error: 'impossible de trouver des pannes pour ce sous systeme' }, { status: 501 },);
    }
    return NextResponse.json({ pannes: pannes }, { status: 200 },);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'internal server error' }, { status: 500 })
  }
}