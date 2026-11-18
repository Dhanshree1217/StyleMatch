const DATASET_URL = '/dataset/amazon_co-ecommerce_sample.csv';
const REQUIRED_COLUMNS = ['uniq_id', 'product_name', 'price', 'amazon_category_and_sub_category'];
const IMAGE_COLUMN_PATTERN = /^(?:(?:main|product)_)?image(?:_?(?:url|file(?:_?name)?|link|path))?$/i;

let datasetPromise;

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"' && field.length === 0) {
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ''));
    if (row.some((value) => value.trim())) rows.push(row);
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

function isFashionProduct(record) {
  const category = cleanText(record.amazon_category_and_sub_category || '');
  const name = cleanText(record.product_name || '');
  const supportedCategory = /^(clothing(?:\s*>|$)|shoes(?:\s*>|$)|footwear(?:\s*>|$)|handbags\s*&\s*shoulder bags(?:\s*>|$)|fancy dress\s*>\s*costumes(?:\s*>|$))/i.test(category);
  const costumeGarment = /^fancy dress\s*>\s*costumes(?:\s*>|$)/i.test(category)
    && /\b(costume|dress|outfit|uniform|jumpsuit|tunic|shirt|trousers|skirt|robe|coat|cape|suit|gown|leotard|bodysuit|catsuit|jacket)\b/i.test(name);

  return supportedCategory && (costumeGarment || !/^fancy dress/i.test(category));
}

function getImageValue(record, imageHeaders) {
  for (const header of imageHeaders) {
    const value = cleanText(record[header] || '');
    if (/^https?:\/\/\S+$/i.test(value) || /^\/(?!\/)\S+$/.test(value)) {
      return value;
    }
    if (/^[^/\\?#]+\.(?:avif|gif|jpe?g|png|webp)$/i.test(value)) {
      return `/dataset/${encodeURIComponent(value)}`;
    }
  }
  return '';
}

export function parseAmazonDataset(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) throw new Error('The Amazon CSV contains no product records.');

  const headers = rows[0].map(cleanText);
  const missingColumns = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));
  if (missingColumns.length) {
    throw new Error(`The Amazon CSV is missing required columns: ${missingColumns.join(', ')}.`);
  }

  const imageHeaders = headers.filter((header) => IMAGE_COLUMN_PATTERN.test(header));
  const products = rows.slice(1)
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ''])))
    .filter(isFashionProduct)
    .map((record) => {
      const asin = getAsin(record.product_information);
      return {
        id: cleanText(record.uniq_id),
        name: cleanText(record.product_name),
        manufacturer: cleanText(record.manufacturer || ''),
        price: cleanText(record.price || ''),
        category: cleanText(record.amazon_category_and_sub_category || ''),
        audience: getAudience(cleanText(record.product_name)),
        productUrl: asin ? `https://www.amazon.co.uk/dp/${asin}` : '',
        imageUrl: getImageValue(record, imageHeaders),
      };
    })
    .filter((product) => product.id && product.name);

  return { products, imageFields: imageHeaders };
}

export function loadAmazonDataset() {
  if (!datasetPromise) {
    datasetPromise = fetch(DATASET_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load the Amazon CSV (${response.status}).`);
        }
        return response.text();
      })
      .then(parseAmazonDataset)
      .catch((error) => {
        datasetPromise = undefined;
        throw error;
      });
  }

  return datasetPromise;
}
