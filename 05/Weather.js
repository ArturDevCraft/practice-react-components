import React from 'react';
import { getWeather } from './api';

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

	render() {
		const { lat, lng } = this.props;
		const { weather } = this.state;
		if (weather) {
			return <>{this.renderWeather(lat, lng)}</>;
		}
		return null;
	}

	async componentDidMount() {
		const { lat, lng } = this.props;
		const weather = await getWeather(lat, lng);
		this.setState({
			weather: {
				temperature: weather.temp,
				condition: weather.weather.description,
			},
		});
	}
}

export default Weather;
