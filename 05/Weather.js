import React from 'react';

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = { weather: null };
	}
	renderWeather(lat, lng) {
		const { weather } = this.state;
		return (
			<section>
				<p>
					Pogodę w obecnej chwili w miejscu o szerokości geograficznej:{' '}
					<strong>{lat}</strong> i długości geograficznej:{' '}
					<strong>{lng}</strong> można określić jako:{' '}
					<strong>{weather.condition}</strong>, gdzie temperatura wynosi:{' '}
					<strong>{weather.temperature}</strong>&#8457;
				</p>
			</section>
		);
	}

	async getWeather(latitude, longitude) {
		const API_KEY = 'e0bd7c2870b74690827f5e7aff5e82b4';
		const units = 'I';
		const lang = 'pl';
		const urlParams = `?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&key=${API_KEY}`;
		const URL = 'https://api.weatherbit.io/v2.0/current' + urlParams;
		try {
			const response = await fetch(URL);
			if (!response.ok) {
				throw new Error('Something went wrong!!!');
			}
			const weather = await response.json();
			this.setState({
				weather: {
					temperature: weather.data[0].temp,
					condition: weather.data[0].weather.description,
				},
			});
			return weather.data[0];
		} catch (err) {
			throw new Error('Connection problem');
		}
	}

	render() {
		const { lat, lng } = this.props;
		const { weather } = this.state;
		if (weather) {
			return <>{this.renderWeather(lat, lng)}</>;
		}
		return null;
	}

	componentDidMount() {
		const { lat, lng } = this.props;
		this.getWeather(lat, lng);
	}
}

export default Weather;
