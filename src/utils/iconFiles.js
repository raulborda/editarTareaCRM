import React from 'react';

import DocIcon from '../components/icons/doc';
import PdfIcon from '../components/icons/pdf';
import TxtIcon from '../components/icons/txt';
import XlsIcon from '../components/icons/xls';
import JpgIcon from '../components/icons/jpg';
import PngIcon from '../components/icons/png';
import FileIcon from '../components/icons/file';
export const IconFile = (format) => {
	switch (format) {
		case 'docx':
			return <DocIcon />;
		case 'doc':
			return <DocIcon />;
		// case 'xml':
		// 	return <XmlIcon />;
		case 'pdf':
			return <PdfIcon />;
		case 'txt':
			return <TxtIcon />;
		case 'xls':
			return <XlsIcon />;
		case 'xlsx':
			return <XlsIcon />;
		case 'jpg':
			return <JpgIcon />;
		case 'jpeg':
			return <JpgIcon />;
		case 'png':
			return <PngIcon />;

		default:
			return <FileIcon />;
	}
};
