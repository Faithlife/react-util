import React, { PureComponent, Component, forwardRef } from 'react';

/** Binds event handlers onto functional components.
 *  Any methods specified as arguments to this function
 *  will override handlers declared on the component props.
 *  Does not extend PureComponent unless specified.
 *  Usage: withEventHandlers({ onClick: id => this.handleClick(id) }, ComponentToWrap, { isPure: (false|true)})
 */
export function withEventHandlers(eventHandlers, WrappedComponent, options = {}) {
	const ComponentToExtend = options.isPure ? PureComponent : Component;

	class WithEventHandlers extends ComponentToExtend {
		static displayName = `WithEventHandlers(${WrappedComponent.displayName ||
			WrappedComponent.name ||
			'Unnamed Component'})`;

		constructor(props) {
			super(props);

			this.eventHandlers = Object.entries(eventHandlers)
				.map(([key, value]) => ({
					[key]: (...args) => value(this.props, ...args),
				}))
				.reduce((a, b) => Object.assign(a, b), {});
		}

		render() {
			const { forwardedRef, ...props } = this.props;
			return <WrappedComponent {...props} {...this.eventHandlers} ref={forwardedRef} />;
		}
	}

	return forwardRef((props, ref) => <WithEventHandlers {...props} forwardedRef={ref} />);
}
