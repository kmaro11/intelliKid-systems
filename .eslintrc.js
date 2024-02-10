module.exports = {
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
			},
		],
		'vue/multi-word-component-names': 0,
	},
};
