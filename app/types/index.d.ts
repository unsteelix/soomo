import { Guid } from 'guid-typescript';

export interface IConfig {
  remoteServiceURL: string;
}

export interface IAppStoreState {
  courseData: ICourseData;
  isLoading: boolean;
  courseSelected: number;
  categorySelected: string;
  studentsSelected: number[];
  popup: IPopup;
  popups: IPopup[];
  messageSenders: IPopup[];
  sectionSelected: number;
}

export interface ICourseData {
  listOfCourses: ICourse[];
  histories: Record<number, ISectionHistory>;
  studentsData?: any; // TODO
}

export interface IInstitutionalCourse {
  id: number;
  name: string;
  number: string;
}

type courseStatus = 'not-started' | 'in-progress' | 'completed';

export interface ICourse {
  id: number;
  name: string;
  number: string;
  product_name: string;
  institutional_course: IInstitutionalCourse;
  status: courseStatus;
}

type category = 'stopped' | 'hasnt-started' | 'low-completion' | 'low-score' | 'on-track';

export interface ISectionHistory {
  [key: number]: any;
  categories: Array<{
    // all the risk categories included in any of the contained histories
    key: category; // which risk category is being described
    name: string; // a concise name for the risk category
    on_track: boolean; // whether this category should be considered on-track or not
    guidance: string; // content for the faculty guides shown in the application; this can be an object if more precision is needed
    priority: number; // a priority level for this category; lower numbers indicate higher priority
  }>;
  histories: Array<{
    snapshot_at: string; // an ISO8601 string 2019-03-22T18:41:37+00:00
    assessments: Array<{
      user: {
        id: number;
        first_name: string;
        last_name: string;
      };
      risks: Array<{
        // one or more matched risks (or anti-risks) identified for this user
        category_key: category;
        category_metadata: string; // risk category-specific details indicating the magnitude of risk; this could become an object if more dimensions are needed
      }>;
    }>;
  }>;
  riskCategory: any
}

export interface IPopup {
  /** Id component of popup */
  id: Guid;
  /** Header component of popup */
  header: React.ElementType;
  /** Body component of popup */
  body: React.ElementType;
  // is popup visible (for small screens)
  visible: boolean;
}
