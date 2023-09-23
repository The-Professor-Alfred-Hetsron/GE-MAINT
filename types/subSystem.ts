export default interface SubSystemType {
    id: number,
    nom: string,
    marque_fabricant: string,
    modele: string,
    numero_serie: string,
    description: string,
    image: string | ArrayBuffer | undefined
}