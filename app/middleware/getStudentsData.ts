import { EffectParams } from 'redux-effex';
import { setStudentsData } from '../actions/actionCreators';

/**
 * get students data from server and dispatch it to store
 * @param action {AnyAction}
 * @param dispatch {Dispatch}
 */
export default async ({ action, dispatch }: EffectParams) => {
  const courseId = action.payload.courseId;

  const testApiUrl = `//localhost:4000/outreach/courses/${courseId}/students`;

  // all students in this course
  const allStudentsStream = await fetch(testApiUrl);
  const allStudents = await allStudentsStream.json();

  dispatch(
    setStudentsData({
      allStudents,
    })
  );
};
