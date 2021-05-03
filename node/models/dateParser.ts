export function unixToString(unix: number): string{
    let date = new Date(unix * 1000);
    return date.toISOString().split('T')[0];
}

export function stringToUnix(dateString: string): number{
    return Date.parse(dateString) / 1000;
}