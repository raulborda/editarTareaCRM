export const formatSize = (size) => {
	const sizeFile = Number(size);

	if (size >= 1024) {
		return `${(sizeFile / 1024).toFixed(0)} kb`;
	} else {
		return `${sizeFile.toFixed(0)} bytes`;
	}
};
