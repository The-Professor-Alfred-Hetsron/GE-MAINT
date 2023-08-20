export default interface PieceType {
    id: number;
    nom: string,
    marque_fabricant: string,
    numero_serie: string,
    modele: string,
    localisation: string,
    qteStock: number,
    qteMin: number,
    description: string,
    image: string | ArrayBuffer | undefined
}