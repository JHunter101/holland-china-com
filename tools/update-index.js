import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function regenerateIndex(folderPath, indexFileName, sortDate, includePinned = false) {
    const indexPath = path.join(folderPath, indexFileName);

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json') && file !== indexFileName);

    const items = files.map(file => {
        const filePath = path.join(folderPath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const item = {
            id: content.id,
            title: content.titles.EN || '',
            sortDate: content[sortDate] ? content[sortDate].split('T')[0] : '',
            launchDate: content['dateLaunch'] ? content['dateLaunch'].split('T')[0] : ''
        };

        if (includePinned) {
            item.isPinned = content.isPinned || false;
        }

        return item;
    });

    items.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

    fs.writeFileSync(indexPath, JSON.stringify(items, null, 4), 'utf8');
    console.log(`${indexFileName} updated with ${items.length} items in ${folderPath}`);
}

regenerateIndex(
    './static/posts/events',
    'index.json',
    'eventStart'
);

regenerateIndex(
    './static/posts/news',
    'index.json',
    'dateLaunch',
    true
);
