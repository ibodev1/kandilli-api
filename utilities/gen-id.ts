export function genId(sehir: string, bolge: string, date: string): string {
	return `${getPlaceShortName(sehir, bolge)}-${new Date(date).getTime()}`;
}

function getPlaceShortName(sehir: string, bolge: string): string {
	return sehir.slice(0, 2).concat(bolge.slice(0, 2));
}
