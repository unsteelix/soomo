declare module 'redux-effex' {
  export type ReduxStore = {
    dispatch: Function;
    getState: () => Object;
  };

  export type EffectParams = {
    action: any;
    dispatch: (action: any) => void;
    getState: () => any;
    nextDispatchAsync: (actionType: string) => Promise<Object>;
  };

  export type EffectErrorHandlerParams = {
    action: Object;
    dispatch: (action: any) => void;
    getState: () => any;
    nextDispatchAsync: (actionType: string) => Promise<Object>;
    error: Object;
  };

  export type EffectFunction = (params: EffectParams) => Promise<any>;

  export type EffectDefinition = {
    action: string;
    effect: EffectFunction;
    error?: (params: EffectErrorHandlerParams) => any;
  };

  export function effectsMiddleware(effectsDefinitionArray: any, ...args: any[]): any;
}
