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
        const protocol = await prismadb.protocol.findUnique({
            where: {
                id: Number.parseInt(id)
            }
        });
        if (!protocol){
            return NextResponse.json({ message: "Ce Protocole N'existe Pas" }, { status: 200 });
        }
        //supprimer la protocol
        await prismadb.protocol.delete({
            where: {
                id: Number.parseInt(id),
            },
        });
        return NextResponse.json({ message: "Protocol supprimé avec success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}