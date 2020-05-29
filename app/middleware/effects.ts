import { EffectErrorHandlerParams } from 'redux-effex';
import actionTypes from '../actions/actionTypes';
import { setIsLoading } from 'src/app/actions/actionCreators';
import getCourseData from 'src/app/middleware/getCourseData';
import getStudentsData from 'src/app/middleware/getStudentsData';
import messageStudents from 'src/app/middleware/messageStudents';

// TODO add error handling to requests
const genericErrorHandler = ({ action, error, dispatch }: EffectErrorHandlerParams) => {
  window.console.log({ error, action });
  dispatch(setIsLoading(false));
};

export default [
  {
    action: actionTypes.GET_COURSE_DATA,
    effect: getCourseData,
    error: genericErrorHandler,
  },
  {
    action: actionTypes.GET_STUDENTS_DATA,
    effect: getStudentsData,
    error: genericErrorHandler,
  },
  {
    action: actionTypes.MESSAGE_STUDENTS,
    effect: messageStudents,
    error: genericErrorHandler,
  },
];
