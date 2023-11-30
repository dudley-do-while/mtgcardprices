const SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const CARD_NAME_COLUMN = 1;
const PRICE_COLUMN = 2;
const API_BASE_URL = 'https://api.scryfall.com/cards/search?unique=prints&q='

function fetchCardPrices() {
  const cardNames = getCardNames();
  const prices = cardNames.map(getCardPrice);
  updateSheet(prices);
}

function updateSheet(prices) {
  const priceRange = SHEET.getRange(2, PRICE_COLUMN, prices.length, 1);
  priceRange.setValues(prices.map(price => [price]));
}

// Read in card names from the sheet
function getCardNames() {
  const range = SHEET.getRange(2, CARD_NAME_COLUMN, SHEET.getLastRow() - 1, 1);
  return range.getValues().flat();
}

function getCardPrice(cardName) {
  const searchUrl = `${API_BASE_URL}${encodeURIComponent(cardName)}`;
  const response = UrlFetchApp.fetch(searchUrl, { muteHttpExceptions: true });

  if (response.getResponseCode() == 200) {
    const cards = JSON.parse(response.getContentText()).data;
    return findLowestPrice(cards, cardName);
  } else {
    return "Not Found";
  }
}

// Returns the lowest price among different printings of a card
function findLowestPrice(cards, cardName) {
  let lowestPrice = null;

  cards.forEach(card => {
    if (card.name === cardName && card.prices.usd !== null) {
      const currentPrice = Number(card.prices.usd);
      if (lowestPrice === null || currentPrice < lowestPrice) {
        lowestPrice = currentPrice;
      }
    }
  });

  return lowestPrice !== null ? lowestPrice.toString() : "No Price Available";
}

// Custom menu item
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('MTG Tools')
    .addItem('Fetch Card Prices', 'main')
    .addToUi();
}

function main() {
  fetchCardPrices();
  Utilities.sleep(200); // Duration suggested by Scryfall documentation
}
