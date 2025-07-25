import { getItemByAssetID, getAssetIDOfElement } from 'utils/utilsModular';

const doTheSorting = (items, itemElements, method, pages, type) => {
  let sortedElements = [];
  if (method === 'price_asc') {
    sortedElements = itemElements.sort((a, b) => {
      const priceOfA = getItemByAssetID(items, getAssetIDOfElement(a)).price !== undefined
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(a)).price.price)
        : 0.0;
      const priceOfB = getItemByAssetID(items, getAssetIDOfElement(b)).price !== undefined
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(b)).price.price)
        : 0.0;
      return priceOfA - priceOfB;
    });
  } else if (method === 'price_desc') {
    sortedElements = itemElements.sort((a, b) => {
      const priceOfA = getItemByAssetID(items, getAssetIDOfElement(a)).price !== undefined
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(a)).price.price)
        : 0.0;
      const priceOfB = getItemByAssetID(items, getAssetIDOfElement(b)).price !== undefined
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(b)).price.price)
        : 0.0;
      return priceOfB - priceOfA;
    });
  } else if (method === 'name_asc') {
    sortedElements = itemElements.sort((a, b) => {
      const nameOfA = getItemByAssetID(
        items,
        getAssetIDOfElement(a),
      ).market_hash_name.toLowerCase();
      const nameOfB = getItemByAssetID(
        items,
        getAssetIDOfElement(b),
      ).market_hash_name.toLowerCase();
      if (nameOfA < nameOfB) return -1;
      if (nameOfA > nameOfB) return 1;
      return 0;
    });
  } else if (method === 'name_desc') {
    sortedElements = itemElements.sort((a, b) => {
      const nameOfA = getItemByAssetID(
        items,
        getAssetIDOfElement(a),
      ).market_hash_name.toLowerCase();
      const nameOfB = getItemByAssetID(
        items,
        getAssetIDOfElement(b),
      ).market_hash_name.toLowerCase();
      if (nameOfA > nameOfB) return -1;
      if (nameOfA < nameOfB) return 1;
      return 0;
    });
  } else if (method === 'tradability_asc') {
    sortedElements = itemElements.sort((a, b) => {
      const tradabilityOfA = getItemByAssetID(items, getAssetIDOfElement(a)).tradability;
      const tradabilityOfB = getItemByAssetID(items, getAssetIDOfElement(b)).tradability;
      if (tradabilityOfA === 'Tradable') return -1;
      if (tradabilityOfA === 'Not Tradable') return 1;
      if (tradabilityOfB === 'Tradable') return 1;
      if (tradabilityOfB === 'Not Tradable') return -1;

      let tradabilityOfATime = new Date(tradabilityOfA);
      tradabilityOfATime = tradabilityOfATime.getTime();
      let tradabilityOfBTime = new Date(tradabilityOfB);
      tradabilityOfBTime = tradabilityOfBTime.getTime();
      if (tradabilityOfATime < tradabilityOfBTime) return -1;
      if (tradabilityOfATime > tradabilityOfBTime) return 1;
      return 0;
    });
  } else if (method === 'tradability_desc') {
    sortedElements = itemElements.sort((a, b) => {
      const tradabilityOfA = getItemByAssetID(items, getAssetIDOfElement(a)).tradability;
      const tradabilityOfB = getItemByAssetID(items, getAssetIDOfElement(b)).tradability;
      if (tradabilityOfA === 'Tradable') return 1;
      if (tradabilityOfA === 'Not Tradable') return -1;
      if (tradabilityOfB === 'Tradable') return -1;
      if (tradabilityOfB === 'Not Tradable') return 1;

      let tradabilityOfATime = new Date(tradabilityOfA);
      tradabilityOfATime = tradabilityOfATime.getTime();
      let tradabilityOfBTime = new Date(tradabilityOfB);
      tradabilityOfBTime = tradabilityOfBTime.getTime();
      if (tradabilityOfATime > tradabilityOfBTime) return -1;
      if (tradabilityOfATime < tradabilityOfBTime) return 1;
      return 0;
    });
  } else if (method === 'float_asc') {
    sortedElements = itemElements.sort((a, b) => {
      const floatInfoOfA = getItemByAssetID(items, getAssetIDOfElement(a)).floatInfo;
      const floatInfoOfB = getItemByAssetID(items, getAssetIDOfElement(b)).floatInfo;

      if (floatInfoOfA === null && floatInfoOfB !== null) return 1;
      if (floatInfoOfA !== null && floatInfoOfB === null) return -1;
      if (floatInfoOfA === null && floatInfoOfB === null) return 0;

      const floatOfA = parseFloat(floatInfoOfA.floatvalue);
      const floatOfB = parseFloat(floatInfoOfB.floatvalue);

      if (floatOfA > floatOfB) return 1;
      if (floatOfA < floatOfB) return -1;
      return 0;
    });
  } else if (method === 'float_desc') {
    sortedElements = itemElements.sort((a, b) => {
      const floatInfoOfA = getItemByAssetID(items, getAssetIDOfElement(a)).floatInfo;
      const floatInfoOfB = getItemByAssetID(items, getAssetIDOfElement(b)).floatInfo;

      if (floatInfoOfA === null && floatInfoOfB !== null) return 1;
      if (floatInfoOfA !== null && floatInfoOfB === null) return -1;
      if (floatInfoOfA === null && floatInfoOfB === null) return 0;

      const floatOfA = parseFloat(floatInfoOfA.floatvalue);
      const floatOfB = parseFloat(floatInfoOfB.floatvalue);

      if (floatOfA > floatOfB) return -1;
      if (floatOfA < floatOfB) return 1;
      return 0;
    });
  } else if (method === 'default') {
    sortedElements = itemElements.sort((a, b) => {
      const itemA = getItemByAssetID(items, getAssetIDOfElement(a));
      const itemB = getItemByAssetID(items, getAssetIDOfElement(b));
      const positionOfA = parseInt(itemA.position);
      const contextIDOfA = itemA.contextid;
      const positionOfB = parseInt(itemB.position);
      const contextIDOfB = itemB.contextid;

      // First, sort by contextid: 16 before 2
      if (contextIDOfA !== contextIDOfB) {
        if (contextIDOfA === '16') return -1;
        if (contextIDOfB === '16') return 1;
      }

      // If contextid is the same, sort by position
      if (positionOfA > positionOfB) return 1;
      if (positionOfA < positionOfB) return -1;
      return 0;
    });
  } else if (method === 'reverse') {
    sortedElements = itemElements.sort((a, b) => {
      const itemA = getItemByAssetID(items, getAssetIDOfElement(a));
      const itemB = getItemByAssetID(items, getAssetIDOfElement(b));
      const positionOfA = parseInt(itemA.position);
      const contextIDOfA = itemA.contextid;
      const positionOfB = parseInt(itemB.position);
      const contextIDOfB = itemB.contextid;

      // First, sort by contextid: 2 before 16
      if (contextIDOfA !== contextIDOfB) {
        if (contextIDOfA === '2') return -1;
        if (contextIDOfB === '2') return 1;
      }

      // If contextid is the same, sort by position (descending)
      if (positionOfA > positionOfB) return -1;
      if (positionOfA < positionOfB) return 1;
      return 0;
    });
  } else if (method === 'sticker_price_asc') {
    sortedElements = itemElements.sort((a, b) => {
      const stickerPriceOfA = getItemByAssetID(items, getAssetIDOfElement(a)).stickerPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(a)).stickerPrice.price)
        : 0.0;
      const stickerPriceOfB = getItemByAssetID(items, getAssetIDOfElement(b)).stickerPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(b)).stickerPrice.price)
        : 0.0;
      return stickerPriceOfA - stickerPriceOfB;
    });
  } else if (method === 'sticker_price_desc') {
    sortedElements = itemElements.sort((a, b) => {
      const stickerPriceOfA = getItemByAssetID(items, getAssetIDOfElement(a)).stickerPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(a)).stickerPrice.price)
        : 0.0;
      const stickerPriceOfB = getItemByAssetID(items, getAssetIDOfElement(b)).stickerPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(b)).stickerPrice.price)
        : 0.0;
      return stickerPriceOfB - stickerPriceOfA;
    });
  } else if (method === 'charm_price_asc') {
    sortedElements = itemElements.sort((a, b) => {
      const charmPriceOfA = getItemByAssetID(items, getAssetIDOfElement(a)).charmPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(a)).charmPrice.price)
        : 0.0;
      const charmPriceOfB = getItemByAssetID(items, getAssetIDOfElement(b)).charmPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(b)).charmPrice.price)
        : 0.0;
      return charmPriceOfA - charmPriceOfB;
    });
  } else if (method === 'charm_price_desc') {
    sortedElements = itemElements.sort((a, b) => {
      const charmPriceOfA = getItemByAssetID(items, getAssetIDOfElement(a)).charmPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(a)).charmPrice.price)
        : 0.0;
      const charmPriceOfB = getItemByAssetID(items, getAssetIDOfElement(b)).charmPrice !== null
        ? parseFloat(getItemByAssetID(items, getAssetIDOfElement(b)).charmPrice.price)
        : 0.0;
      return charmPriceOfB - charmPriceOfA;
    });
  }

  if (type === 'offer' || type === 'inventory') {
    sortedElements.reverse();

    const numberOfItemsPerPage = type === 'offer' ? 16 : 25;

    pages.forEach((page) => {
      const emptySlots = [];
      if (type === 'offer') {
        page.querySelectorAll('.itemHolder').forEach((itemHolder) => {
          if (itemHolder.children.length === 1) emptySlots.push(itemHolder);
        });
      }

      page.innerHTML = '';

      for (let i = 0; i < numberOfItemsPerPage; i += 1) {
        if (emptySlots[i] !== undefined) {
          page.appendChild(emptySlots[i]);
        } else {
          const item = sortedElements.pop();

          if (item !== undefined) page.appendChild(item.parentElement);
          else {
            const emptySlot = document.createElement('div');
            emptySlot.classList.add('itemHolder', 'disabled');
            page.appendChild(emptySlot);
          }
        }
      }
    });
  } else if (type === 'your' || type === 'their') {
    sortedElements.reverse();
    sortedElements.forEach((itemElement) => {
      document.getElementById(`${type}_slots`).insertAdjacentElement('afterbegin', itemElement.parentNode.parentNode);
    });
  } else return sortedElements;
};

export default doTheSorting;
