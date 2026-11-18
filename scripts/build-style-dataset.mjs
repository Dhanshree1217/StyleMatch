import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sourcePath = resolve('public/dataset/amazon_co-ecommerce_sample.csv');
const outputPath = resolve('public/dataset/style-products.json');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ',') {
      row.push(value);
      value = '';
    } else if (character === '\n') {
      row.push(value.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      value = '';
    } else {
      value += character;
    }
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value.replace(/\r$/, ''));
    rows.push(row);
  }

  return rows;
}

function cleanText(value = '') {
  return value
    .replace(/^\uFEFF/, '')
    .replace(/Â£/g, '£')
    .replace(/Â /g, ' ')
    .replace(/â€™/g, '’')
    .trim();
}

function getAudience(name) {
  if (/\b(girls?|female children)\b/i.test(name)) return 'Girls';
  if (/\b(boys?|male children)\b/i.test(name)) return 'Boys';
  if (/\b(women|womens|woman|ladies|lady|female)\b/i.test(name)) return 'Women';
  if (/\b(men|mens|man|male)\b/i.test(name)) return 'Men';
  return '';
}

function getAsin(productInformation = '') {
  return productInformation.match(/\bASIN\s*([A-Z0-9]{10})\b/i)?.[1]?.toUpperCase() || '';
}

function getImageUrl(record, headers) {
  const imageHeader = headers.find((header) => (
    /^(image|image_url|imageurl|main_image|main_image_url|product_image|product_image_url)$/i.test(header)
  ));
  if (!imageHeader) return '';

  const candidate = cleanText(record[imageHeader] || '');
  return /^https?:\/\/\S+$/i.test(candidate) ? candidate : '';
}

function isClothingProduct(record) {
  const category = cleanText(record.amazon_category_and_sub_category || '');
  const name = cleanText(record.product_name || '');
  const productCategory = /^(clothing(?:\s*>|$)|shoes(?:\s*>|$)|footwear(?:\s*>|$)|handbags\s*&\s*shoulder bags(?:\s*>|$)|fancy dress\s*>\s*costumes(?:\s*>|$))/i.test(category);
  const costumeGarment = /^fancy dress\s*>\s*costumes(?:\s*>|$)/i.test(category)
    && /\b(costume|dress|outfit|uniform|jumpsuit|tunic|shirt|trousers|skirt|robe|coat|cape|suit|gown|leotard|bodysuit|catsuit|jacket)\b/i.test(name);

  return productCategory && (costumeGarment || !/^fancy dress/i.test(category));
}

const csv = (await readFile(sourcePath, 'utf8')).replace(/^\uFEFF/, '');
const rows = parseCsv(csv);
if (rows.length < 2) {
  throw new Error(`Dataset contains no product records: ${sourcePath}`);
}

const headers = rows[0].map((header) => cleanText(header));
const requiredColumns = ['uniq_id', 'product_name', 'price', 'amazon_category_and_sub_category'];
const missingColumns = requiredColumns.filter((column) => !headers.includes(column));
if (missingColumns.length) {
  throw new Error(`Dataset is missing required columns: ${missingColumns.join(', ')}`);
}

const sourceRecords = rows.slice(1).map((values) => (
  Object.fromEntries(headers.map((header, index) => [header, values[index] || '']))
));

const products = sourceRecords
  .filter(isClothingProduct)
  .map((record) => {
    const asin = getAsin(record.product_information);
    return {
      id: cleanText(record.uniq_id),
      name: cleanText(record.product_name),
      manufacturer: cleanText(record.manufacturer),
      price: cleanText(record.price),
      category: cleanText(record.amazon_category_and_sub_category),
      audience: getAudience(cleanText(record.product_name)),
      productUrl: asin ? `https://www.amazon.co.uk/dp/${asin}` : '',
      imageUrl: getImageUrl(record, headers),
    };
  })
  .filter((product) => product.id && product.name);

await writeFile(outputPath, `${JSON.stringify({ products }, null, 2)}\n`, 'utf8');

const summary = {
  sourceRecords: sourceRecords.length,
  products: products.length,
  withPrice: products.filter((product) => product.price).length,
  withAsinLink: products.filter((product) => product.productUrl).length,
  withProductImage: products.filter((product) => product.imageUrl).length,
  audiences: Object.fromEntries(
    ['Women', 'Men', 'Girls', 'Boys', 'Unspecified'].map((audience) => [
      audience,
      products.filter((product) => (product.audience || 'Unspecified') === audience).length,
    ]),
  ),
  output: outputPath,
};

console.log(JSON.stringify(summary, null, 2));
