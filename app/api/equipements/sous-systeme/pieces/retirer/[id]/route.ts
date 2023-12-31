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

      //rechercher toutes les transaction
      const res = await fetch(`http://localhost:3000/api/equipements/sous-systeme/pieces/${id}/transactions`)
      const data = await res.json()
      let ready = false
      let i = 0
      let length = data.transactions.length - 1 > 0 ? data.transactions.length - 1 : 0
      console.log('to delete')
      if (length === 0){
        await prismadb.piece.delete({
          where: {
            id: Number.parseInt(id),
          },
        });
        return NextResponse.json({ message: "piece supprimee" }, { status: 200 });
      }

      while (i <= length){
        prismadb.transaction.delete({
          where: {
            id: data.transactions[i].id
          }
        })
        if(i === length){
          ready = true
        }
        i += 1
      }
      //supprimer la piece
      console.log(ready)
      if(ready){
        await prismadb.piece.delete({
          where: {
            id: Number.parseInt(id),
          },
        });
      }

      return NextResponse.json({ message: "deleted successfully" }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}