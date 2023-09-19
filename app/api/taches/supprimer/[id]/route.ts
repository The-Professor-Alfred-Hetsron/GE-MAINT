import { NextResponse } from 'next/server'
import prismadb from '../../../../../lib/prismadb'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        console.log(id)
        if(!id) {
            return NextResponse.json({ error: 'not permited server error' }, { status: 403 })
        }

        const tache = await prismadb.tache.findUnique({
            where: {
                id: Number.parseInt(id)
            }
        })
        if(!tache){
            return NextResponse.json({ error: 'not found server error' }, { status: 404 })
        }

        await prismadb.tache.delete({
            where: {
            id: tache.id,
            },
        });

        return NextResponse.json({ message: "Tache deleted successfully" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}