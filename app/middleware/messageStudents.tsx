import { EffectParams } from 'redux-effex';
import { setIsLoading } from '../actions/actionCreators';
// import { hidePopup, setIsLoading } from '../actions/actionCreators';
import { getConfig } from 'src/app/utils/config';

/**
 * call api for sending message to students
 * @param action {AnyAction}
 * @param dispatch {Dispatch}
 */
export default async ({ action, dispatch }: EffectParams) => {
  dispatch(setIsLoading(true));

  // TODO get courseID
  const status = await fetch(`${getConfig().remoteServiceURL}/courses/29392/communication`, {
    method: 'POST',
    body: JSON.stringify({
      user_ids: action.payload.studentsSelected,
      risk_category_key: action.payload.categoryKey,
      message: action.payload.message,
    }),
  });

  // TODO update histories here
  // @ts-ignore
  const statusJSON = await status.json();

  // TODO think about doing this through state flag
  // dispatch(hidePopup());
  // dispatch(setPopup('Message', <MessageSuccess />));

  dispatch(setIsLoading(false));
};
