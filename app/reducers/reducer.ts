import { AnyAction } from 'redux';
import { IAppStoreState, IPopup } from '../../app/types';
import actionTypes from 'src/app/actions/actionTypes';
import { Guid } from 'guid-typescript';

const INITIAL_STATE: IAppStoreState = {
  isLoading: false,
  courseData: {
    listOfCourses: [],
    histories: {},
    studentsData: {
      students: [],
    },
  },
  courseSelected: null,
  categorySelected: null,
  studentsSelected: [],
  popup: {
    id: Guid.createEmpty(),
    body: null,
    header: null,
    visible: false,
  },
  popups: [],
  messageSenders: [],
  sectionSelected: 0,
};

const reducers = {
  [actionTypes.SET_IS_LOADING]: (state: IAppStoreState, { payload }: AnyAction) => {
    return {
      ...state,
      isLoading: payload.isLoading,
    };
  },
  [actionTypes.SELECT_SECTION]: (state: IAppStoreState, { payload }: AnyAction) => {
    return {
      ...state,
      sectionSelected: payload.sectionId,
    };
  },
  [actionTypes.SELECT_CATEGORY]: (state: IAppStoreState, { payload }: AnyAction) => {
    return {
      ...state,
      categorySelected: payload.categoryKey,
    };
  },
  [actionTypes.SELECT_STUDENTS]: (state: IAppStoreState, { payload }: AnyAction) => {
    return {
      ...state,
      studentsSelected: payload.studentIds,
    };
  },
  [actionTypes.SET_COURSE_DATA]: (state: IAppStoreState, { payload }: AnyAction) => {
    return {
      ...state,
      courseData: {
        ...state.courseData,
        ...payload.courseData,
      },
    };
  },
  [actionTypes.SET_STUDENTS_DATA]: (state: IAppStoreState, { payload }: AnyAction) => {
    const studentsData = payload.studentsData.allStudents;
    // console.log(studentsData.students)
    studentsData.students.forEach((student: any) => {
      // TODO: remake to real data
      // student.trend = [true, false, true];
    });
    return {
      ...state,
      courseData: {
        ...state.courseData,
        studentsData,
      },
    };
  },
  [actionTypes.HIDE_POPUP]: (state: IAppStoreState, { payload }: AnyAction) => {
    const { id } = payload;

    const newPopups = state.popups.map((x) => {
      if (x.id === id) {
        x.visible = false;
      }
      return x;
    });

    return {
      ...state,
      popups: [...newPopups],
    };
  },
  [actionTypes.SHOW_POPUP]: (state: IAppStoreState, { payload }: AnyAction) => {
    const { id } = payload;
    let newPopups = [] as any;

    if (id) {
      newPopups = state.popups.map((x) => {
        if (x.id === id) {
          x.visible = true;
        }
        return x;
      });
    } else {
      newPopups = state.popups.map((x) => {
        x.visible = true;
        return x;
      });
    }

    return {
      ...state,
      popups: [...newPopups],
    };
  },
  [actionTypes.SET_POPUP]: (state: IAppStoreState, { payload }: AnyAction) => {
    const { Header, Body } = payload;

    return {
      ...state,
      popup: {
        ...state.popup,
        Id: Guid.createEmpty(),
        Header,
        Body,
      },
    };
  },
  [actionTypes.ADD_POPUP]: (state: IAppStoreState, { payload }: AnyAction) => {
    const { id, header, body } = payload;

    const newPopups = state.popups.filter((e) => !e.id.equals(id));

    return {
      ...state,
      popups: [
        ...newPopups,
        {
          id,
          header,
          body,
        } as IPopup,
      ],
    };
  },
  [actionTypes.ADD_MESSAGE_SENDER]: (state: IAppStoreState, { payload }: AnyAction) => {
    const { id, header, body } = payload;

    const newMessageSenders = state.messageSenders.filter((e) => !e.id.equals(id));

    return {
      ...state,
      messageSenders: [
        ...newMessageSenders,
        {
          id,
          header,
          body,
        } as IPopup,
      ],
    };
  },
  [actionTypes.HIDE_MESSAGE_SENDER]: (state: IAppStoreState, { payload }: AnyAction) => {
    // const { id } = payload;

    // const newMessageSenders = state.messageSenders.map((x) => {
    //     if (x.id === id) {
    //         x.visible = false;
    //     }
    //     return x;
    // });

    return {
      ...state,
      messageSenders: [] as any,
    };
  },
};

export default (state = INITIAL_STATE, action: AnyAction): IAppStoreState => {
  if (reducers.hasOwnProperty(action.type)) {
    return reducers[action.type](state, action);
  }

  return state;
};
