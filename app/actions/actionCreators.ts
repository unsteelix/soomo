import actionTypes from './actionTypes';
import { ICourseData, IPopup } from 'src/app/types';
// import { ICourse, ICourseData } from 'src/app/types';
import { Guid } from 'guid-typescript';

export const setIsLoading = (isLoading: boolean) => ({
  payload: {
    isLoading,
  },
  type: actionTypes.SET_IS_LOADING,
});

export const selectSection = (sectionId: number) => ({
  payload: {
    sectionId,
  },
  type: actionTypes.SELECT_SECTION,
});

export const getCourseData = (courseId: number) => ({
  payload: {
    courseId,
  },
  type: actionTypes.GET_COURSE_DATA,
});

export const setCourseData = (courseData: ICourseData) => ({
  payload: {
    courseData,
  },
  type: actionTypes.SET_COURSE_DATA,
});

export const getStudentsData = (courseId: number) => ({
  payload: {
    courseId,
  },
  type: actionTypes.GET_STUDENTS_DATA,
});

export const setStudentsData = (studentsData: any) => ({
  payload: {
    studentsData,
  },
  type: actionTypes.SET_STUDENTS_DATA,
});

export const hidePopup = (id: Guid) => ({
  payload: {
    id,
  } as IPopup,

  type: actionTypes.HIDE_POPUP,
});

export const showPopup = (id: Guid) => ({
  payload: {
    id,
  } as IPopup,

  type: actionTypes.SHOW_POPUP,
});

export const addPopup = (
  id: Guid,
  header: React.JSXElementConstructor<any> | string,
  body: React.JSXElementConstructor<any> | any
) => ({
  payload: {
    id,
    header,
    body,
  } as IPopup,

  type: actionTypes.ADD_POPUP,
});

export const addMessageSender = (
  id: Guid,
  header: React.JSXElementConstructor<any> | string,
  body: React.JSXElementConstructor<any> | any
) => ({
  payload: {
    id,
    header,
    body,
  } as IPopup,

  type: actionTypes.ADD_MESSAGE_SENDER,
});

export const hideMessageSender = (id: Guid) => ({
  payload: {
    id,
  } as IPopup,

  type: actionTypes.HIDE_MESSAGE_SENDER,
});

export const selectCategory = (categoryKey: number) => ({
  payload: {
    categoryKey,
  },
  type: actionTypes.SELECT_CATEGORY,
});

export const selectStudents = (studentIds: number[]) => ({
  payload: {
    studentIds,
  },
  type: actionTypes.SELECT_STUDENTS,
});

export const sendMessage = (studentIds: number[], categorySelected: string, message: string) => ({
  payload: {
    studentIds,
    categorySelected,
    message,
  },
  type: actionTypes.MESSAGE_STUDENTS,
});
