function quoteFileNames(f) {
	return f.map((fn) => `'${fn.replace("'", "'\\''")}'`).join(" ");
}

module.exports = {
	"*.ts?(x)": (filenames) => {
		const quoted = quoteFileNames(filenames);

		return [
			`eslint --max-warnings=0 --fix ${quoted}`,
			`prettier --write ${quoted}`,
			`tsc -p . --noEmit`,
		];
	},
	"*.js?(x)": "prettier --write",
};
