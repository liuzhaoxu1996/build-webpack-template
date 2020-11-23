module.exports = {
	'extends': './node_modules/@q/sofe-eslint/.eslintrc.js',
	env: {
		node: true,
		es6: true,
		mocha: true,
	},
	parserOptions: {
		ecmaVersion: 8,
	},
	'rules': {
		'no-console': 'off',
	},
};