/* globals describe, it */
import { withEventHandlers } from '..';
import React from 'react';
import assert from 'assert';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('withEventHandlers', () => {
	it('wraps a component', () => {
		const Button = () => (
			<div>
				<button />
			</div>
		);

		let calledWithArgs = null;
		const handlers = {
			onClick: ({ rowId }, { anotherId }) => (calledWithArgs = { rowId, anotherId }),
		};
		const onMouseOver = () => {};

		// Because we're not using an inline arrow function directly in props,
		// shallow comparisons will succeed and the component won't need to re-render
		const WrappedButton = withEventHandlers(handlers, Button);

		const mountedComponent = shallow(
			<WrappedButton onClick={() => {}} onMouseOver={onMouseOver} rowId={10} />,
		);

		// Verify other handlers were not changed
		assert.equal(onMouseOver, mountedComponent.props().onMouseOver);

		mountedComponent.props().onClick({ anotherId: 11 });
		assert.equal(10, calledWithArgs.rowId);
		assert.equal(11, calledWithArgs.anotherId);
	});
});
