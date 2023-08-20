
export default interface EquipmentType {
    id: number
    code: string,
    nom: string,
    marque_fabricant: string,
    modele: string,
    numero_serie: string,
    localistation: string,
    etat: string,
    description: string,
    image: string | ArrayBuffer | undefined
  }