import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
	state = {
		comments: [],
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { content } = this.state;
		if (content) {
			this.addComment(content);
			this.setState({ content: '' });
		}
	};

	fieldChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	addComment(content) {
		this.setState({ comments: [content, ...this.state.comments] });
	}

	renderComentsList() {
		const { comments } = this.state;

		return comments.map((comment) => <li>{comment}</li>);
	}

	render() {
		const { title, body } = this.props;
		return (
			<article>
				<h1>{title}</h1>
				<p>{body}</p>
				<section>
					<form onSubmit={this.submitHandler}>
						<div>
							<label>
								<textarea
									style={{ minWidth: '300px', minHeight: '120px' }}
									name="content"
									value={this.state.content}
									onChange={this.fieldChange}
								/>
							</label>
						</div>
						<div>
							<input type="submit" value="dodaj komentarz" />
						</div>
					</form>
					<ul>
						{/* tutaj komentarze jako <li/>, ps. tak wygląda komentarz do kodu w JSX */}
						{this.renderComentsList()}
					</ul>
				</section>
			</article>
		);
	}
}

root.render(
	<Article
		title="Programowanie jest super!"
		body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam..."
	/>
);
