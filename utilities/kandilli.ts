import jsdom from 'jsdom';
import {type Earthquake} from '../types/kandilli.js';
import {genId} from './gen-id.js';

const {JSDOM} = jsdom;

const bolgeNameParser = (name: string) => {
	name = name.replaceAll('-', '/');
	return name.trim();
};

const replaceTurkishCharacter = (string_: string): string => {
	try {
		return string_
			.replaceAll('Ý', 'İ')
			.replaceAll('ð', 'ğ')
			.replaceAll('þ', 'ş')
			.replaceAll('ý', 'ı');
	} catch (error: any) {
		throw new Error(error);
	}
};

const parseLine = (lineArray: string[]): Earthquake => {
	const tarih = lineArray.slice(0, 10);
	const saat = lineArray.slice(11, 19);
	const enlem = lineArray.slice(21, 28);
	const boylam = lineArray.slice(31, 38);
	const derinlik = lineArray.slice(41, 51);
	const md = lineArray.slice(55, 58);
	const ml = lineArray.slice(59, 64);
	const mw = lineArray.slice(65, 68);
	const fullYer: string | undefined = combineString(lineArray.slice(70, 120));
	const [, bolge, sehir]: any = /^(.*?)(?:\((.*)\))?$/.exec(fullYer);
	const nitelik = lineArray.slice(121);
	const dataLine: Earthquake = {
		id: genId(
			String(sehir).trim().toLowerCase(),
			String(bolge).trim().toLowerCase(),
	  		`${combineString(tarih)} ${combineString(saat)}`,
		),
		tarih: combineString(tarih),
		saat: combineString(saat),
		enlem: combineString(enlem),
		boylam: combineString(boylam),
		derinlik: combineString(derinlik),
		md: combineString(md),
		ml: combineString(ml),
		mw: combineString(mw),
		yer: fullYer ?? undefined,
		sehir: sehir?.trim(),
		bolge: bolge && bolgeNameParser(bolge),
		nitelik: combineString(nitelik),
	};
	return dataLine;
};

const combineString = (stringArray: string[]) => stringArray.join('').trim();

const getEarthquakeList = async (): Promise<Earthquake[] | undefined> => {
	try {
		const fetchHeaders = new Headers();
		fetchHeaders.append('Content-Type', 'text/html; charset=UTF-8');
		const response = await fetch(
			'http://www.koeri.boun.edu.tr/scripts/lst1.asp',
			// @ts-expect-error
			fetchHeaders,
		);
		const htmlBuffer = await response.arrayBuffer();
		const htmlDecoder = new TextDecoder('iso-8859-1');
		const htmlString = replaceTurkishCharacter(htmlDecoder.decode(htmlBuffer));
		const dom = new JSDOM(htmlString, {
			contentType: 'text/html',
		});
		const preTagContent: string
      = dom.window.document.querySelector('pre')?.textContent ?? '';
		const earthquakeLines: string[] = preTagContent
			.split('\n')
			.slice(6)
			.slice(0, -2);
		const earthquakeList: Earthquake[] = earthquakeLines.map((line: string) =>
			parseLine(Array.from(line)),
		);
		return earthquakeList;
	} catch (error) {
		console.log(error);
	}
};

export default getEarthquakeList;
