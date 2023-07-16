import { NextResponse } from 'next/server'
import prismadb from '../../../../../lib/prismadb'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      //rechercher tous ses sous systemes
      const res = await fetch(`http://localhost:3000/api/equipements/${id}/sous-systemes`)
      const data = await res.json()
      if(!data.sousSystemes){
        return NextResponse.json(data, { status: 200 });
      }
      let ready = false
      let i = 0
      let length = data.sousSystemes.length - 1
      while (i <= length) {
        const pieces = await prismadb.piece.findMany({
          where: {
             soussysteme_id: data.sousSystemes[i].id
          }
        })
        for(let j = 0, c = pieces.length; j < c; j++) {
          const transactions = await prismadb.transaction.findMany({
            where: {
              piece_id: pieces[j].id,
            }
          })
          for(let k = 0, v = transactions.length; k < v; k++) {
            await prismadb.transaction.delete({
              where: {
                id: transactions[k].id
              }
            })
          }
          await prismadb.piece.delete({
            where: {
              id: pieces[j].id
            }
          })
        }
        await prismadb.sousSysteme.delete({
          where: {
            id: data.sousSystemes[i].id
          }
        })
        if (i === length) {
          ready = true
        }
        i += 1
      }
      //supprimer l'equipement'
      console.log(ready)
      if(ready){
        await prismadb.equipement.delete({
          where: {
            id: Number.parseInt(id),
          },
        });
      }

      return NextResponse.json({ user: "deleted successfully" }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}