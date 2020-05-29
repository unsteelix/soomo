import { IAppStoreState } from '../../app/types';

/**
 * get all loaded courses
 * @param state
 */
export default (state: IAppStoreState) => {
  return state.courseData.listOfCourses;
};
