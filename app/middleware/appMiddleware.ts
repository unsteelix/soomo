import { Store, AnyAction, Dispatch } from 'redux';
import actionTypes from '../actions/actionTypes';
import { IGlobalState } from 'src/types';

const appMiddlewareEnum = {
  [actionTypes.GET_COURSE_DATA](store: Store<IGlobalState>, next: Dispatch<AnyAction>, action: AnyAction) {
    // TODO remove this of not needed anymore

    next(action);
  },
};

export const appMiddleware = (store: Store<IGlobalState>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  if (appMiddlewareEnum[action.type]) {
    return appMiddlewareEnum[action.type](store, next, action);
  }

  return next(action);
};
