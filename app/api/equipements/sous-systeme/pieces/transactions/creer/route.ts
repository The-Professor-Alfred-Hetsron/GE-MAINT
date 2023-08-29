import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

export async function POST(req: Request) {
  const json = await req.json();

  if(json.type_transaction !== 'TRANSACTION-AJOUT' && json.type_transaction !== 'TRANSACTION-RETRAIT'){
    return NextResponse.json({ error: "type de transaction inconnue" }, { status: 404 },);
  }
  
  try {
    const piece = await prismadb.piece.findUnique({
      where: {
          id: json.piece_id
      }
    })
    
    if(!piece){
      return NextResponse.json({ error: 'piece introuvable' }, { status: 401 })
    }
    
    const transaction = await prismadb.transaction.create({
      data: {...json},
    });
    
    return NextResponse.json({ transaction: transaction }, { status: 200 },);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'internal server error' }, { status: 500 })
  }
}