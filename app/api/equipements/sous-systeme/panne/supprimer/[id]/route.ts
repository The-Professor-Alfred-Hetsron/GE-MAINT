import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const panne = await prismadb.panne.findUnique({
            where: {
                id: Number.parseInt(id)
            }
        });
        if (!panne){
            return NextResponse.json({ message: "panne innexistante" }, { status: 200 });
        }
        //supprimer la panne
        await prismadb.panne.delete({
            where: {
                id: Number.parseInt(id),
            },
        });
      return NextResponse.json({ message: "panne supprimee avec success" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}