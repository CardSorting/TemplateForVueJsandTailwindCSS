const STANDARD_LAYOUTS = [
  { id: 'poker9up', name: '9-up Poker', cardWidth: 63.5, cardHeight: 88.9 },
  { id: 'bridge8up', name: '8-up Bridge', cardWidth: 56, cardHeight: 87.5 },
  { id: 'tarot6up', name: '6-up Tarot', cardWidth: 70, cardHeight: 120 }
];

export const calculateLayout = (pageWidth, pageHeight, cardWidth, cardHeight, bleed = 0, margin = 0) => {
  const availableWidth = pageWidth - (2 * margin);
  const availableHeight = pageHeight - (2 * margin);

  const actualCardWidth = cardWidth + (2 * bleed);
  const actualCardHeight = cardHeight + (2 * bleed);

  const cardsPerRow = Math.floor(availableWidth / actualCardWidth);
  const cardsPerColumn = Math.floor(availableHeight / actualCardHeight);

  const totalCards = cardsPerRow * cardsPerColumn;

  const startX = margin + (availableWidth - (cardsPerRow * actualCardWidth)) / 2;
  const startY = margin + (availableHeight - (cardsPerColumn * actualCardHeight)) / 2;

  const cardPositions = [];
  for (let row = 0; row < cardsPerColumn; row++) {
    for (let col = 0; col < cardsPerRow; col++) {
      cardPositions.push({
        x: startX + (col * actualCardWidth),
        y: startY + (row * actualCardHeight)
      });
    }
  }

  return {
    cardsPerRow,
    cardsPerColumn,
    totalCards,
    startX,
    startY,
    cardPositions,
    pageWidth,
    pageHeight,
    cardWidth,
    cardHeight,
    bleed,
    margin
  };
};

export const getStandardLayouts = () => STANDARD_LAYOUTS;

export const getLayoutById = (id) => STANDARD_LAYOUTS.find(layout => layout.id === id);

export const calculateBleed = (cardWidth, cardHeight, bleedSize) => ({
  width: cardWidth + (2 * bleedSize),
  height: cardHeight + (2 * bleedSize)
});

export const calculateMargins = (pageWidth, pageHeight, cardWidth, cardHeight, cardsPerRow, cardsPerColumn) => {
  const horizontalMargin = (pageWidth - (cardWidth * cardsPerRow)) / 2;
  const verticalMargin = (pageHeight - (cardHeight * cardsPerColumn)) / 2;
  return { horizontal: horizontalMargin, vertical: verticalMargin };
};

export const adjustLayoutForBleed = (layout, bleedSize) => {
  const { cardWidth, cardHeight, cardPositions } = layout;
  const bleedAdjustedPositions = cardPositions.map(pos => ({
    x: pos.x - bleedSize,
    y: pos.y - bleedSize
  }));
  return {
    ...layout,
    cardWidth: cardWidth + (2 * bleedSize),
    cardHeight: cardHeight + (2 * bleedSize),
    cardPositions: bleedAdjustedPositions
  };
};