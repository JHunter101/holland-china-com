document.addEventListener('DOMContentLoaded', () => {
	const lan: string = localStorage.getItem('lan') || 'gb';

	const placeholders: {
		[key: string]: {
			name: string;
			email: string;
			subject: string;
			message: string;
		};
	} = {
		gb: {
			name: 'Name',
			email: 'Email',
			subject: 'Subject',
			message: 'Message',
		},
		nl: {
			name: 'Naam',
			email: 'E-mail',
			subject: 'Onderwerp',
			message: 'Bericht',
		},
		cn: {
			name: '姓名',
			email: '电子邮件',
			subject: '主题',
			message: '信息',
		},
	};

	const placeholderValues = placeholders[lan] || placeholders['gb'];

	(document.getElementById('name') as HTMLInputElement).placeholder =
		placeholderValues.name;
	(document.getElementById('email') as HTMLInputElement).placeholder =
		placeholderValues.email;
	(document.getElementById('subject') as HTMLInputElement).placeholder =
		placeholderValues.subject;
	(document.getElementById('message') as HTMLInputElement).placeholder =
		placeholderValues.message;
});
