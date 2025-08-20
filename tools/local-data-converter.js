import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const csvFilePath = path.resolve('./static/locales/locale.csv');
const outputDir = path.resolve('./static/locales');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const languages = ['en', 'nl', 'cn'];
const data = { en: {}, nl: {}, cn: {} };

fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    const key = row.id?.trim();
    if (!key) return;
    languages.forEach((lang) => {
      data[lang][key] = row[lang]?.trim() || '';
    });
  })
  .on('end', () => {
    languages.forEach((lang) => {
      fs.writeFileSync(
        path.join(outputDir, `${lang}.json`),
        JSON.stringify(data[lang], null, 2),
        'utf-8'
      );
    });
    console.log('✅ CSV converted to flat JSON for each language in ./locales/');
  });