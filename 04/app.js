import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
	state = {
		firstName: '',
		lastName: '',
		searchQuery: '',
		error: '',
		users: ['Jan Kowalski', 'Michał Nowak'],
	};

	renderUsersList() {
		const { users, searchQuery } = this.state;
		let filtredUsers = [...users];
		if (searchQuery) {
			filtredUsers = users.filter((name) => name.includes(searchQuery));
		}
		return filtredUsers.map((name) => {
			return <li onClick={this.clickHandler}>{name}</li>;
		});
	}

	renderErrorBox() {
		const { error } = this.state;
		if (!error) {
			return null;
		}
		return <div style={{ color: 'red' }}>{error}</div>;
	}

	clickHandler = (e) => {
		const { innerText: userName } = e.target;
		this.removeUser(userName);
	};

	inputChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const { firstName, lastName, searchQuery } = this.state;
		return (
			<section onSubmit={this.submitHandler}>
				{this.renderErrorBox()}
				<form>
					<input
						name="firstName"
						value={firstName}
						onChange={this.inputChange}
					/>
					<input name="lastName" value={lastName} onChange={this.inputChange} />
					<input type="submit" />
				</form>
				<input
					name="searchQuery"
					value={searchQuery}
					onChange={this.inputChange}
				/>
				<ul>{this.renderUsersList()}</ul>
			</section>
		);
	}

	submitHandler = (e) => {
		e.preventDefault();

		const { firstName, lastName } = this.state;
		if (firstName && lastName) {
			this.addUser(`${firstName} ${lastName}`);
			this.setState({
				firstName: '',
				lastName: '',
				error: '',
			});
		} else {
			this.setState({ error: 'Należy podać imię i nazwisko' });
		}
	};

	addUser(name) {
		this.setState({
			users: [...this.state.users, name],
		});
	}

	removeUser(name) {
		const currUsers = this.state.users.filter((user) => user != name);

		this.setState({
			users: currUsers,
		});
	}
}

root.render(<App />);
