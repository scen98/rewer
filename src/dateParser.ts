export function parseDateHun(date: Date): string{
    return `${date.getFullYear()}. ${monthNames[date.getMonth()]} ${date.getDate()}. ${parseDatehhdd(date)}`;
}

export function parseDateYYYYMMDD(date: Date):string{
    return `${date.getFullYear()}. ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

export function parseDatehhdd(date: Date):string{
    if(date.getMinutes() < 10){
        return `${date.getHours()}:0${date.getMinutes()}`;
    } else {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
}

export function getYear(date: string){
    return new Date(date).getFullYear();
}

export function getMonth(date: string){
    return monthNames[new Date(date).getMonth()]; 
}

export function getDay(date: string){
    return new Date(date).getDate();
}

export function normalFormat(date: string): string{
    let d = new Date(date);
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

export function parseForInput(date: Date): string{
    let month: string;
    let day: string;
    if(date.getMonth() < 9){
        month = `0${date.getMonth()+1}`;
    } else {
        month = (date.getMonth()+1).toString();
    }
    if(date.getDate() < 10){
        day = `0${date.getDate()}`;
    } else {
        day = date.getDate().toString();
    }

    return `${date.getFullYear()}-${month}-${day}`;
}

export let monthNames = ["Janury", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
