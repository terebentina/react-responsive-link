import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Link from '../src/ReactResponsiveLink.jsx';

test('With onClickTap', (t) => {
	const onClickTap = sinon.spy();
	const component = shallow(<Link className="foo" onClickTap={onClickTap}>Link text</Link>);

	t.equal(component.props().className, 'foo', 'correct className is passed');
	t.equal(component.text(), 'Link text', 'proper text added');

	// meh, we can't simulate clicks/taps here as events are not sent by enzyme yet
	//component.find('a').simulate('click');
	//t.equal(onClickTap.calledOnce, true, 'onClick handler added');
	//component.find('a').simulate('touchEnd');
	//t.equal(onClickTap.calledTwice, true, 'onTouchEnd handler added');

	t.equal(typeof component.props().onClick, 'function', 'onClick handler added');
	t.equal(typeof component.props().onTouchEnd, 'function', 'onTouchEnd handler added');
	t.equal(typeof component.props().onTouchStart, 'function', 'onTouchStart handler added');
	t.end();
});

test('With href', (t) => {
	const component = shallow(<Link className="bar" href="http://5mins.me">Link text</Link>);

	t.equal(component.props().className, 'bar', 'correct className is passed');
	t.equal(component.text(), 'Link text', 'proper text added');

	t.equal(typeof component.props().onClick, 'function', 'onClick handler added');
	t.equal(typeof component.props().onTouchStart, 'function', 'onTouchStart handler added');
	t.equal(typeof component.props().onTouchEnd, 'function', 'onTouchEnd handler added');
	t.end();
});

test('When disabled', (t) => {
	const onClickTap = sinon.spy();
	const component = shallow(<Link className="foo" onClickTap={onClickTap} disabled>Link text</Link>);

	t.equal(component.props().className, 'foo', 'correct className is passed');
	t.equal(component.text(), 'Link text', 'proper text added');

	t.equal(typeof component.props().onClick, 'function', 'onClick handler added');
	t.equal(typeof component.props().onTouchStart, 'function', 'onTouchStart handler added');
	t.equal(typeof component.props().onTouchEnd, 'function', 'onTouchEnd handler added');

	// meh, we can't simulate clicks/taps here as events are not sent by enzyme yet
	//component.find('a').simulate('click');
	//t.equal(onClickTap.callCount, 0, 'onClickTap should not have been called on click');
	//component.find('a').simulate('touchEnd');
	//t.equal(onClickTap.callCount, 0, 'onClickTap should not have been called on tap');

	t.notEqual(component.props().onClick, onClickTap, 'the passed function is not used for onClick');
	t.notEqual(component.props().onTouchEnd, onClickTap, 'the passed function is not used for onTouchEnd');

	t.end();
});
