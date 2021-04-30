export const isValidISBN = (isbn) => {
	let result = false;

	isbn = isbn.replace(/-/g, "");
	isbn = isbn.replace(/ /g, "");

	if (isbn.length === 10) {
		result = isValidISBN10(isbn)
	} else if (isbn.length === 13) {
		result = isValidISBN13(isbn)
	}
	return result;
}

function isValidISBN10(isbn) {

	let result = false;
	const regex = new RegExp(/^\d{9}(\d|X){1}$/);

	if (regex.test(isbn)) {

		let sum = 0;

		for (let i = 0; i < 9; i++) {

			sum += isbn[i] * (i + 1);
		}
		sum += isbn[9] === 'X' ? 10 : isbn[9] * 10;

		result = sum % 11 === 0;
	}

	return result;
}

function isValidISBN13(isbn) {

	let result = false;

	if (!isNaN(isbn)) {

		let index = 0;
		let sum = 0;

		for (let i = 0; i < isbn.length; i++) {

			sum += isbn[i] * (index++ % 2 !== 0 ? 3 : 1);
		}

		result = sum % 10 === 0;
	}

	return result;
}
