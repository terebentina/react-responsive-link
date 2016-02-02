import React from 'react';
import ReactDOM from 'react-dom';
import Link from '../lib/ReactResponsiveLink';

class App extends React.Component {

	onClickTap(e) {
		e.preventDefault();
		this.refs.write.textContent = 'Link was clicked/tapped';
	}

	onClick(e) {
		e.preventDefault();
		this.refs.write.textContent = 'The A tag was clicked';
	}

	render() {
		return (
			<div>
				<div>
					<Link onClickTap={this.onClickTap}>Click to see the responsive link in action</Link>
				</div>
				<div>
					<a onClick={this.onClick}>Click to see the regular a tag in action</a>
				</div>
				<div ref="write"></div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react'));
