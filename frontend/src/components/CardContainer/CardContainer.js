import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Components
import Swipeable from 'react-swipy';
import Link from 'next/link';
import Card from '../Card/Card';

//Styles
import * as Styled from './CardContainerStyles';

const CardContainer = ({ data }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(data.map(set => <Card data={set} />));
  }, [data]);

  //This is updated in the onSwipe function of Swipeable to indicate direction
  let direction = '';

  const onAfterSwipe = () => {
    if (direction === 'left') {
      dislikeCard();
    } else {
      likeCard();
    }
  };

  const dislikeCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setCards([]);
    }
  };

  const likeCard = () => {
    window.open(data[currentCard].externalLink, '_blank');
  };

  if (cards.length > 0) {
    return (
      <Styled.CardContainerWrapper>
        <Swipeable
          limit={100}
          min={10}
          buttons={({ left, right }) => (
            <Styled.CardContainerButtons>
              <button onClick={left}>
                <img src="/static/cross-icon.svg" />
              </button>
              <button onClick={right}>
                <img src="/static/heart-icon.svg" />
              </button>
            </Styled.CardContainerButtons>
          )}
          onSwipe={dir => {
            direction = dir;
          }}
          onAfterSwipe={onAfterSwipe}
        >
          {cards[currentCard]}
        </Swipeable>
        {currentCard + 1 < cards.length ? (
          <Styled.HiddenCard>{cards[currentCard + 1]}</Styled.HiddenCard>
        ) : null}
      </Styled.CardContainerWrapper>
    );
  }

  return (
    <Styled.BackToCategorySelectionContainer>
      <h3>No More Cards</h3>
      <span role="img" aria-label="hand pointing left">
        👈
      </span>
      <Link href="/">
        <a>Click here to choose another category</a>
      </Link>
    </Styled.BackToCategorySelectionContainer>
  );
};

CardContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      externalLink: PropTypes.string.isRequired
    })
  )
};

export default CardContainer;
