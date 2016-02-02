import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/mixin';
//import history from '../history';

const swipePX = 30;

const ReactResponsiveLink = React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		className: React.PropTypes.string,
		title: React.PropTypes.string,
		tabIndex: React.PropTypes.string,
		rel: React.PropTypes.string,
		target: React.PropTypes.string,
		to: React.PropTypes.string,
		href: React.PropTypes.string,
		onClick: React.PropTypes.func,
		onClickTap: React.PropTypes.func,
		children: React.PropTypes.node,
	},

	mixins: [shouldPureComponentUpdate],

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
	},

	onTouchStart(e) {
		// this is what prevents click events from happening. Doing the same from touchend doesn't work!!!
		e.preventDefault();
		if (e.changedTouches[0] && e.changedTouches[0].clientX) {
			this.touchPos = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
		}
	},

	// keeps the touchstart position to compare it with touchend position so we know if the user swiped or tapped
	touchPos: [],

	render() {
		const props = {
			href: '#',
			className: this.props.className,
			title: this.props.title,
			tabIndex: this.props.tabIndex,
			rel: this.props.rel,
			target: this.props.target,
			onTouchStart: this.onTouchStart,
		};

		if (this.props.to) {
			props.onClick = props.onTouchEnd = this.onAction.bind(this, () => {
				history.pushState(null, this.props.to);
			});
		} else if (this.props.href) {
			props.onClick = props.onTouchEnd = this.onAction.bind(this, () => {
				window.location = this.props.href;
			});
			props.href = this.props.href;
		} else if (this.props.onClickTap) {
			props.onClick = this.props.onClickTap;
			props.onTouchEnd = this.props.onClickTap;
		} else if (this.props.onClick) {
			props.onClick = this.props.onClick;
			props.onTouchEnd = this.props.onClick;
		}

		if (this.props.disabled) {
			props.disabled = true;
			props.onClick = props.onTouchEnd = (e) => {
				e.preventDefault();
			};
		}

		return <a {...props}>{this.props.children}</a>;
	},
});

export default ReactResponsiveLink;
