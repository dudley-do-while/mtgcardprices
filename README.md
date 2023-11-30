# mtgcardprices
A Google Apps Script project for fetching MTG card prices.
--------------------

### Usage:
1. Create a Google sheet with two columns, A and B, where A is card names and B is price.  Cell A1 should be a header 'name' and cell B1 should be a header 'price'.  Enter exact card names in column A.
2. Open a new App Script project by click Extension > App Script.  Add the contents of app.js to the file.  Save.
3. In the sheet, select 'MTG Tools' and click 'Fetch Card Prices'

### Why?
I had a buylist in a Google sheet and wanted to be able to programatically update prices.  Thought I'd share the outcome.  If you have this exact need, enjoy?
