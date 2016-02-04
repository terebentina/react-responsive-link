import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

const swipePX = 30;

class ReactResponsiveLink extends React.Component {
	static propTypes = {
		disabled: React.PropTypes.bool,
		href: React.PropTypes.string,
		onClick: React.PropTypes.func,
		onClickTap: React.PropTypes.func,
		onTouchStart: React.PropTypes.func,
		children: React.PropTypes.node,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onAction(cb, e) {
		if (e.cancelable) {
			e.preventDefault();
		}
		let doAction = true;
		if (e.type == 'touchend') {
			if (this.touchPos.length && e.changedTouches[0] && e.changedTouches[0].clientX) {
				if (Math.abs(this.touchPos[0] - e.changedTouches[0].clientX) > swipePX || Math.abs(this.touchPos[1] - e.changedTouches[0].clientY) > swipePX) {
					// this is a swipe, don't do anything
					doAction = false;
				}
			}
			this.touchPos = [];
		}
		if (doAction) {
			cb(e);
		}
	}

	onTouchStart(e) {
		// this is what prevents click events from happening. Doing the same from touchend doesn't work!!!
		//e.preventDefault();
		if (e.changedTouches[0] && e.changedTouches[0].clientX) {
			this.touchPos = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
		}
	}

	// keeps the touchstart position to compare it with touchend position so we know if the user swiped or tapped
	touchPos = [];

	render() {
		const { onClickTap, href, onClick, disabled, onTouchStart, ...props } = this.props;

		if (disabled) {
			props.disabled = true;
			props.onClick = props.onTouchEnd = (e) => {
				e.preventDefault();
			};
			props.href = href || '#';
		} else if (onClickTap) {
			props.onClick = props.onTouchEnd = this.onAction.bind(this, onClickTap);
			props.href = '#';
		} else if (href) {
			props.onClick = props.onTouchEnd = this.onAction.bind(this, () => {
				window.location = href;
			});
			props.href = href;
		} else if (onClick) {
			props.onTouchEnd = this.onAction.bind(this, onClick);
			props.href = '#';
		}

		if (onTouchStart) {
			props.onTouchStart = (e) => {
				this.onTouchStart.call(this, e);
				onTouchStart(e);
			};
		} else {
			props.onTouchStart = this.onTouchStart.bind(this);
		}

		return <a {...props}>{this.props.children}</a>;
	}
}

export default ReactResponsiveLink;
