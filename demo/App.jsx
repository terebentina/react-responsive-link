import React from 'react';
import ReactDOM from 'react-dom';
import Link from '../src/ReactResponsiveLink.jsx';

class App extends React.Component {

	onEventStart(e) {
		if (e.type == 'touchstart') {
			this.startTap = Date.now();
		} else {
			this.startClick = Date.now();
		}
		this.startClick2 = Date.now();
	}

	onClickTap(e) {
		e.preventDefault();
		if (e.type == 'touchend') {
			this.refs.write.textContent = `Link was tapped with a response time of ${Date.now() - this.startTap}ms`;
		} else {
			this.refs.write.textContent = `Link was clicked with a response time of ${Date.now() - this.startClick}ms`;
		}
		this.refs.main.style.backgroundColor = '#f00';
		setTimeout(() => this.refs.main.style.backgroundColor = '#fff', 100);
	}

	onClick(e) {
		e.preventDefault();
		this.refs.write.textContent = `The A tag was clicked with a response time of ${Date.now() - this.startClick2}ms`;
		this.refs.main.style.backgroundColor = '#f00';
		setTimeout(() => this.refs.main.style.backgroundColor = '#fff', 100);
	}

	startTap = 0;
	startClick = 0;
	startClick2 = 0;

	render() {
		return (
			<div style={{ position: 'relative' }} ref="main">
				<div ref="write" style={{ position: 'fixed', top: '30px', left: '320px' }}></div>
				<div style={{ height: '300px', width: '300px', overflowY: 'scroll', border: '1px solid #888' }}>
					<div style={{ height: '1000px' }}>
						<Link onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClickTap={::this.onClickTap}>Click to see the responsive link in action</Link>
						<br />
						<br />
						<a style={{ marginLeft: '20px' }} href="#" onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClick={::this.onClick}>Click to see the regular a tag in action</a>
						<br />
						<br />
						<Link onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClickTap={::this.onClickTap}>Swipe to see the responsive link in action</Link>
						<br />
						<br />
						<a style={{ marginLeft: '20px' }} href="#" onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClick={::this.onClick}>Swipe to see the regular a tag in action</a>
						<br />
						<br />
						<Link onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClickTap={::this.onClickTap}>Swipe to see the responsive link in action</Link>
						<br />
						<br />
						<a style={{ marginLeft: '20px' }} href="#" onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClick={::this.onClick}>Swipe to see the regular a tag in action</a>
						<br />
						<br />
						<Link onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClickTap={::this.onClickTap}>Swipe to see the responsive link in action</Link>
						<br />
						<br />
						<a style={{ marginLeft: '20px' }} href="#" onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClick={::this.onClick}>Swipe to see the regular a tag in action</a>
						<br />
						<br />
						<Link onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClickTap={::this.onClickTap}>Swipe to see the responsive link in action</Link>
						<br />
						<br />
						<a style={{ marginLeft: '20px' }} href="#" onTouchStart={::this.onEventStart} onMouseDown={::this.onEventStart} onClick={::this.onClick}>Swipe to see the regular a tag in action</a>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react'));
