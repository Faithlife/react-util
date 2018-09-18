import memoize from 'memoize-one';
import deepEqual from 'lodash.isequal';

// NOTE: In Typescript 3.0, the declaration for this would be
// createDerivedValue<TArgs extends any[], TResult>(
// getDependencies: () => TArgs,
// calculateValue: (...args: TArgs): TResult)
// : () => TResult,
// This declaration would result in superior hinting in VS Code.

/**
 * Creates a function that represents a value that is derived from other values.
 * The derived value is only recalculated when one of its dependencies changes.
 * @template TArg The type of the dependencies.
 * @template TResult The type of the derived value.
 * @param {function(): TArg[]} getDependencies
 * A function that gets the dependencies of the derived value.
 * Each of these dependencies should be a JSON-serializable value.
 * Generally, dependencies should come from props or other derived values.
 * Occasional use of state is fine, but the desire to use state often points to a
 * poorly factored component.
 * @param {function(...TArg): TResult} calculateValue
 * A function that, given its dependencies, calculates the derived value.
 * This function should be semi-pure: that is, it should rely exclusively
 * on its inputs, with the possible exception of invariants that might be
 * defined elsewhere (this exception is the "semi" in "semi-pure").
 * @returns {function(): TResult}
 */
export function createDerivedValue(getDependencies, calculateValue) {
	if (process.env.NODE_ENV !== 'production') {
		const dependencies = getDependencies();
		if (!deepEqual(dependencies, JSON.parse(JSON.stringify(dependencies)))) {
			throw new Error('getDependencies must contain values that are JSON serializable.');
		}
	}
	const calculateMemoizedValue = memoize(calculateValue);
	return () => calculateMemoizedValue(...getDependencies());
}
