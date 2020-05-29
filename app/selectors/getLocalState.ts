import { IGlobalState } from '../../types';

/**
 * get app subState from global app state
 * @param state
 */
export default (state: IGlobalState) => {
  // TODO this must be binded at creation phase
  return state.app;
};
