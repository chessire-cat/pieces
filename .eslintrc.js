"use strict";
module.exports = {
	env: {
		browser: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		sourceType: "module",
	},
	plugins: [
		"@typescript-eslint",
		"import",
		"only-warn",
		"react-hooks",
		"react",
		"unicorn",
	],
	settings: {
		"import/ignore": ["node_modules"],
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"plugin:unicorn/recommended",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "array-simple",
			},
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
			},
		],
		"@typescript-eslint/member-delimiter-style": [
			"off",
			{
				multiline: {
					delimiter: "none",
					requireLast: true,
				},
				singleline: {
					delimiter: "semi",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/member-ordering": [
			"error",
			{
				default: {
					memberTypes: [
						// Fields
						"public-static-field",
						"protected-static-field",
						"private-static-field",
						"public-decorated-field",
						"protected-decorated-field",
						"private-decorated-field",
						"public-instance-field",
						"protected-instance-field",
						"private-instance-field",
						"public-abstract-field",
						"protected-abstract-field",
						"private-abstract-field",

						// Constructors
						"public-constructor",
						"protected-constructor",
						"private-constructor",

						// Methods
						"public-static-method",
						"protected-static-method",
						"private-static-method",
						"public-decorated-method",
						"protected-decorated-method",
						"private-decorated-method",
						"public-instance-method",
						"protected-instance-method",
						"private-instance-method",
						"public-abstract-method",
						"protected-abstract-method",
						"private-abstract-method",

						// Index signature
						"signature",
					],
				},
			},
		],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-parameter-properties": "error",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "error",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"@typescript-eslint/promise-function-async": "error",
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/semi": ["off", null],
		"@typescript-eslint/space-within-parens": ["off", "never"],
		"@typescript-eslint/unified-signatures": "error",
		"arrow-body-style": "error",
		camelcase: "error",
		complexity: "error",
		"constructor-super": "error",
		curly: "error",
		"default-case": "error",
		"dot-notation": "error",
		"guard-for-in": "error",
		"id-match": "error",

		"import/named": "off",
		"import/namespace": "off",
		"import/default": "off",
		"import/export": "off",
		"import/no-named-as-default": "off",
		"import/no-named-as-default-member": "off",

		"import/no-duplicates": "error",
		"import/no-extraneous-dependencies": "error",
		"import/order": [
			"error",
			{
				alphabetize: {
					order: "asc",
				},
				"newlines-between": "never",
			},
		],
		"max-classes-per-file": ["error", 10],
		"max-lines": "error",
		"no-bitwise": "error",
		"no-console": [
			"error",
			{
				allow: [
					"warn",
					"dir",
					"timeLog",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupEnd",
					"table",
					"dirxml",
					"groupCollapsed",
					"Console",
					"profile",
					"profileEnd",
					"timeStamp",
					"context",
				],
			},
		],
		"no-duplicate-imports": "error",
		"no-invalid-this": "error",
		"no-mixed-spaces-and-tabs": "off",
		"no-param-reassign": "error",
		"no-redeclare": "off",
		"no-restricted-globals": [
			"error",
			"length",
			"history",
			"location",
			"name",
			"status",
		],
		"no-restricted-syntax": ["error", "ForInStatement", "WithStatement"],
		"no-return-await": "error",
		"no-shadow": [
			"error",
			{
				hoist: "all",
			},
		],
		"no-undef-init": "error",
		"no-underscore-dangle": "error",
		"no-void": "off",
		"no-warning-comments": [
			"error",
			{
				terms: ["fixme"],
			},
		],
		"one-var": ["error", "never"],
		"padding-line-between-statements": [
			"error",
			{
				blankLine: "always",
				next: "return",
				prev: "*",
			},
		],
		"prefer-const": [
			"error",
			{
				destructuring: "all",
			},
		],
		"prefer-object-spread": "error",
		"prefer-template": "error",
		radix: "error",
		"react/no-unescaped-entities": [
			"error",
			{
				forbid: [
					{
						alternatives: ["&gt;"],
						char: ">",
					},
					{
						alternatives: ["&quot;", "&ldquo;", "&#34;", "&rdquo;"],
						char: '"',
					},
					{
						alternatives: ["&#125;"],
						char: "}",
					},
				],
			},
		],
		"react/prop-types": "off",
		"sort-imports": [
			"error",
			{
				ignoreCase: false,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
			},
		],
		"spaced-comment": ["error", "always"],
		"unicorn/filename-case": [
			"error",
			{
				cases: {
					kebabCase: true,
					pascalCase: true,
				},
			},
		],
		"unicorn/no-abusive-eslint-disable": "off",
		"unicorn/no-array-callback-reference": "off",
		"unicorn/no-fn-reference-in-iterator": "off",
		"unicorn/no-nested-ternary": "off",
		"unicorn/no-null": "off",
		"unicorn/no-reduce": "off",
		"unicorn/no-useless-undefined": "off",
		"unicorn/prevent-abbreviations": "off",
		yoda: "error",
	},
};
