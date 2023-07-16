import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../../lib/prismadb'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      //supprimer la transaction
      await prismadb.transaction.delete({
        where: {
          id: Number.parseInt(id),
        },
      });
      console.log(`transaction ${id} supprimee`)
      return NextResponse.json({ user: "transaction supprimee" }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}