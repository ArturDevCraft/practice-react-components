export async function getWeather(latitude, longitude) {
	const units = 'I';
	const lang = 'pl';
	const urlParams = `?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}`;
	try {
		const data = await query('GET', urlParams);
		return data;
	} catch (err) {
		throw new Error(err);
	}
}

async function query(method, params) {
	const API_KEY = 'e0bd7c2870b74690827f5e7aff5e82b4';
	const urlParams = `${params}&key=${API_KEY}`;
	const options = { method };
	const URL = 'https://api.weatherbit.io/v2.0/current' + urlParams;
	try {
		const response = await fetch(URL, options);
		if (!response.ok) {
			throw new Error('Something went wrong!!!');
		}
		const weather = await response.json();

		return weather.data[0];
	} catch (err) {
		throw new Error('Connection problem');
	}
}
