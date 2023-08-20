import { NextResponse } from 'next/server'
import prismadb from '../../../../../../lib/prismadb'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      //rechercher toutes les pieces
      const res = await fetch(`http://localhost:3000/api/equipements/sous-systeme/${id}/pieces`)
      const data = await res.json()
      if(!data.pieces){
        return NextResponse.json(data, { status: 200 });
      }
      let ready = false
      let i = 0
      const length = data.pieces.length > 0 ? data.pieces.length - 1 : 0
      if (length === 0){
        await prismadb.sousSysteme.delete({
          where: {
            id: Number.parseInt(id),
          },
        });
        return NextResponse.json({ message: "sous systeme supprime" }, { status: 200 });
      }

      while(i <= length){
        const transactions = await prismadb.transaction.findMany({
          where: {
             piece_id: data.pieces[i].id
          }
        })
        for(let j = 0, c = transactions.length; j < c; j++){
          await prismadb.transaction.delete({
            where: {
              id: transactions[j].id
            }
          })
        }
        await prismadb.piece.delete({
          where: {
            id: data.pieces[i].id
          }
        })
        if (i ===  length) {
          ready = true
        }
        i += 1
      }
      //supprimer le sous systeme
      console.log(ready)
      if(ready){
        await prismadb.sousSysteme.delete({
          where: {
            id: Number.parseInt(id),
          },
        });
      }
      return NextResponse.json({ message: "sous systeme supprime" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}