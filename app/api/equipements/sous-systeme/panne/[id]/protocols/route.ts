import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

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
        const protocols = await prismadb.protocol.findMany({
            where: {
                    panne_id: Number.parseInt(id),
                },
            });

        if (!protocols){
            return NextResponse.json({ error: "aucune Panne trouve" }, { status: 404 });
        }

        return NextResponse.json({ protocols: protocols }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}