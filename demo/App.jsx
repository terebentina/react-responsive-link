import React from 'react';
import ReactDOM from 'react-dom';
import Link from '../src/ReactResponsiveLink.jsx';

class App extends React.Component {

	onEventStart() {
		this.start = Date.now();
	}

	onClickTap(e) {
		e.preventDefault();
		this.refs.write.textContent = `Link was ${e.type == 'touchend' ? 'tapped' : 'clicked'} with a response time of ${Date.now() - this.start}ms`;
	}

	onClick(e) {
		e.preventDefault();
		this.refs.write.textContent = `The A tag was clicked with a response time of ${Date.now() - this.start}ms`;
	}

	start = 0;

	render() {
		return (
			<div>
				<Link onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClickTap={::this.onClickTap}>Click to see the responsive link in action</Link>
				<br />
				<br />
				<br />
				<div ref="write"></div>
				<br />
				<br />
				<a href="#" onMouseDown={::this.onEventStart} onClick={::this.onClick}>Click to see the regular a tag in action</a>

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react'));
