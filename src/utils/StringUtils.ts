import { QueryParams } from "@/common";
import { camelCase, isNil, upperFirst } from "lodash";

export function toCamelCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
}

export function toPascalCase(str: string): string {
	return upperFirst(camelCase(str));
}

export function toUpperCaseAll(text: string) {
	return text
		.replace(/[^a-zA-Z0-9]/g, "")
		.replace(/\b\w/g, (char) => char.toUpperCase())
		.toUpperCase();
}

export function getFileExtension(filename = "") {
	return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

const shift = 3;
export function encryptString(str: string) {
	return str
		.split("")
		.map((char) => {
			const charCode = char.charCodeAt(0);
			if (charCode >= 65 && charCode <= 90) {
				return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
			} else if (charCode >= 97 && charCode <= 122) {
				return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
			} else if (charCode >= 48 && charCode <= 57) {
				return String.fromCharCode(((charCode - 48 + shift) % 10) + 48);
			} else {
				return char;
			}
		})
		.join("");
}

export function decryptString(str: string) {
	return str
		.split("")
		.map((char) => {
			const charCode = char.charCodeAt(0);
			if (charCode >= 65 && charCode <= 90) {
				return String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
			} else if (charCode >= 97 && charCode <= 122) {
				return String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
			} else if (charCode >= 48 && charCode <= 57) {
				return String.fromCharCode(((charCode - 48 - shift + 10) % 10) + 48);
			} else {
				return char;
			}
		})
		.join("");
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
