"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const lan = localStorage.getItem('lan') || 'gb';
    const placeholders = {
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
    document.getElementById('name').placeholder =
        placeholderValues.name;
    document.getElementById('email').placeholder =
        placeholderValues.email;
    document.getElementById('subject').placeholder =
        placeholderValues.subject;
    document.getElementById('message').placeholder =
        placeholderValues.message;
});
