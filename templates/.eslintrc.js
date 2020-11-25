module.exports = {
	'extends': [
		'./node_modules/@q/sofe-eslint/.eslintrc.js',
	],
	env: {
		node: true,
		es6: true,
		mocha: true,
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		// eslint-disable-next-line no-negated-condition
		'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
		'no-useless-escape': 0,
		'no-empty': 0,
	},
};
