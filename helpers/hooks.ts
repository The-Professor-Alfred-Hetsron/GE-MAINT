const englishMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const frenchMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const englishDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
const frenchDays = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export const translateDateTime = (value:string, separator:string) =>{
    if(value == null || value ===""){
        return "Aucune Date"
    }
    const dateArray = value.split(separator)[0].split("/")
    const time = value.split(separator)[1].split('.')[0]
    const d = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`)
    
    const finalDateTime = `${frenchDays[d.getDay()]} ${d.getDate()} ${frenchMonth[d.getMonth()]} ${d.getFullYear()} à ${time}`
    return finalDateTime
}