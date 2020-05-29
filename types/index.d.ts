import { RouterState } from 'connected-react-router';
import { IAppStoreState } from '../app/types';

// TODO must be patched for final app
export interface IGlobalState {
  router: RouterState;
  app: IAppStoreState;
}
