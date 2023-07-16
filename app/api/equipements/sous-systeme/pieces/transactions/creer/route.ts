import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

export async function POST(req: Request) {
    try {
      const json = await req.json();
      
      const piece = await prismadb.piece.findUnique({
        where: {
            id: json.piece_id
        }
      })
      let update_quantity: number = 0
      if(json.type_transaction === 'TRANSACTION-AJOUT' || json.type_transaction === 'TRANSACTION-RETRAIT'){
        if (piece?.stock !== undefined){
          if(json.quantite > 0 || json.quantite < 0){
            update_quantity = piece?.stock + json.quantite
          }
          else{
            update_quantity= piece?.stock
          }
          
        }
      }
      else{
        return NextResponse.json({ error: "type de transaction inconnue" }, { status: 404 },);
      }
      if (piece?.minimum_stock !== undefined && piece?.minimum_stock > update_quantity){
        return NextResponse.json({ error: "action impossible" }, { status: 404 });
      }

      if (update_quantity === piece?.stock) {
        return NextResponse.json({ error: "transaction sans effet" }, { status: 200 },);
      }

      const transaction = await prismadb.transaction.create({
        data: json,
      });
      await prismadb.piece.update({
        where: {
            id: piece?.id
        },
        data: {
            stock: update_quantity
        }
      })
      
      return NextResponse.json({ transaction: transaction }, { status: 200 },);
    } catch (error) {
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}