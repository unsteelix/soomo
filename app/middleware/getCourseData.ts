import { EffectParams } from 'redux-effex';
import { setCourseData, setIsLoading } from '../actions/actionCreators';
import { ICourse, ISectionHistory } from 'src/app/types';
import { getConfig } from 'src/app/utils/config';
import { compDataFromAllCourses, getRiskCategoryByHistories } from 'src/app/utils/utils';

/**
 * get course data from server and dispatch it to store
 * @param action {AnyAction}
 * @param dispatch {Dispatch}
 */
export default async ({ action, dispatch }: EffectParams) => {
  dispatch(setIsLoading(true));
  console.log('strangeUrl: ' + getConfig().remoteServiceURL);

  const testApiUrl = '//localhost:4000/outreach';

  // all courses in system
  const allCoursesStream = await fetch(`${testApiUrl}/courses`);
  const allCourses = (await allCoursesStream.json()) as ICourse[];

  // courses to show data
  const listOfCourses: ICourse[] = allCourses.filter(
    (course) => course.institutional_course.id === action.payload.courseId
  );

  // list of fetches for all courses
  const coursePromises = listOfCourses.map((course) => fetch(`${testApiUrl}/courses/${course.id}/risk_histories`));

  // transform to json
  const coursesData = await Promise.all(coursePromises).then(async (streamData) => {
    return await Promise.all(streamData.map((sd) => sd.json()));
  });

  const histories: Record<number, ISectionHistory> = {};

  coursesData.forEach((data, i) => {
    histories[listOfCourses[i].id] = data;
  });

  // add courses from "all section"
  const historiesAllSections = compDataFromAllCourses(histories);

  histories[0] = historiesAllSections;

  // add riskCategory
  const listKeyHistories = Object.keys(histories);

  listKeyHistories.forEach((key: any) => {
    const riskCategory = getRiskCategoryByHistories(histories[key]);

    histories[key].riskCategory = riskCategory;
  });

  dispatch(
    setCourseData({
      listOfCourses,
      histories,
    })
  );
  dispatch(setIsLoading(false));
};
