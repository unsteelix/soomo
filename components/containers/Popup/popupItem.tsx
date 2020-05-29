import React from 'react';
import { IPopup } from 'src/app/types';
import { Guid } from 'guid-typescript';
import Swipe from 'react-easy-swipe';

interface IPopupItemProps {
  /** popup state */
  popup: IPopup;
  /** hidePopup func */
  hidePopup: (id: Guid) => void;
  /** change popup id, for mobile screen */
  changeCurrentPopup: (e: any) => void;
  /** current id popup, for mobile screen */
  checkedPopupId: Guid;
}

// tslint:disable:jsx-no-lambda
export const PopupItem: React.SFC<IPopupItemProps> = (props) => {
  const { checkedPopupId, popup, hidePopup, changeCurrentPopup } = props;

  return (
    <>
      <input
        checked={popup.id.equals(checkedPopupId)}
        onChange={changeCurrentPopup}
        className="carusel-radio"
        type="radio"
        name="carusel-radio"
        id={popup.id.toString()}
        aria-hidden="true"
        hidden={true}
      />
      <Swipe
        className="soomo-popup carousel-item"
        onSwipeLeft={(event: any) => {
          const currentCarouselItem = document.getElementsByClassName('carousel-bullet-checked')[0];
          const nextCarouselItem = currentCarouselItem
            ? currentCarouselItem.nextElementSibling || undefined
            : undefined;
          const nextCarouselItemId = nextCarouselItem ? nextCarouselItem.getAttribute('for') || undefined : undefined;

          if (nextCarouselItemId) {
            changeCurrentPopup({ target: { id: nextCarouselItemId } });
          }
        }}
        onSwipeRight={(event: any) => {
          const currentCarouselItem = document.getElementsByClassName('carousel-bullet-checked')[0];
          const previousCarouselItem = currentCarouselItem
            ? currentCarouselItem.previousElementSibling || undefined
            : undefined;
          const previousCarouselItemId = previousCarouselItem
            ? previousCarouselItem.getAttribute('for') || undefined
            : undefined;

          if (previousCarouselItemId) {
            changeCurrentPopup({ target: { id: previousCarouselItemId } });
          }
        }}
      >
        <div className="soomo-popup-header">
          <button className="soomo-popup-close" onClick={() => hidePopup(popup.id)} />
        </div>
        <div className="soomo-popup-body default-padding">
          <div className="soomo-popup-title">{popup.header}</div>
          <div className="soomo-popup-content">{popup.body}</div>
        </div>
      </Swipe>
    </>
  );
};
