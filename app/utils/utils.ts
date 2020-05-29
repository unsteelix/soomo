export const getListStudentsByHistories = (histories: any) => {
  const objStudents: any = {};
  const listStudents: any[] = [];

  histories.forEach((historie: any) => {
    historie.assessments.forEach((assessment: any) => {
      const user = assessment.user;
      if (!(user.id in objStudents)) {
        objStudents[user.id] = user;
        listStudents.push(user);
      }
    });
  });

  return listStudents;
};

export const getDateOfLastWeekByHistories = (histories: any) => {
  let max_snapshot_at: string = null;

  max_snapshot_at = histories[0].snapshot_at;

  histories.forEach((historie: any) => {
    if (Date.parse(historie.snapshot_at) > Date.parse(max_snapshot_at)) {
      max_snapshot_at = historie.snapshot_at;
    }
  });

  return max_snapshot_at;
};

export const getRiskCategoryByHistories = (histories: any) => {
  const riskCategory: any = {
    noLogInLastWeek: [],
    missingWork: [],
    lowScore: [],
  };

  // находим списки студентов для категорий риска
  if (histories) {
    histories = histories.histories;
    // search *** No Log In Last Week ***

    // category_key = 'no-sign-in-last-week';
    const dateOfLastWeek = getDateOfLastWeekByHistories(histories);

    // get count no-sign-in-last-week
    let lastWeek: any = null;

    histories.forEach((historie: any) => {
      // last week
      if (historie.snapshot_at == dateOfLastWeek) {
        lastWeek = historie;
      }
    });

    // list id student who log in last week
    const listIdUserLogInLastWeek: any[] = [];

    lastWeek.assessments.forEach((assessment: any) => {
      const id = assessment.user.id;
      assessment.risks.forEach((risk: any) => {
        if (risk.category_key == 'on-track') {
          listIdUserLogInLastWeek.push(id);
        }
      });
    });

    // list students who No Log In Last Week
    const listStudentNotLogInLastWeek: any[] = [];
    const listStudentLogInLastWeek: any[] = [];
    const students = getListStudentsByHistories(histories); // list all students

    if (students && students.length > 0) {
      students.forEach((student: any) => {
        let isLogInLastWeek = false;

        // watch log or not student on last week
        listIdUserLogInLastWeek.forEach((id: any) => {
          // console.log(student.id, id)
          if (student.id && student.id === id) {
            isLogInLastWeek = true;
          }
        });

        if (!isLogInLastWeek) {
          listStudentNotLogInLastWeek.push(student); // who NO LOG in last week
        } else {
          listStudentLogInLastWeek.push(student); // who LOG in last week
        }
      });
    }
    riskCategory.noLogInLastWeek = listStudentNotLogInLastWeek;

    // search *** Missing Work ***
    riskCategory.missingWork = listStudentLogInLastWeek;

    // search *** Low Score ***
  }

  return riskCategory;
};

// composite data from all courses for section "all sections"
export const compDataFromAllCourses = (listHistorie: any) => {
  // concat all courses
  const h: any[] = [];
  const c: any[] = [];
  const histories = {
    categories: c,
    histories: h,
    riskCategory: {},
  };

  for (const key in listHistorie) {
    const historie = listHistorie[key];

    histories.categories.push(...historie.categories);
    histories.histories.push(...historie.histories);
  }

  // group by time of snapshot_at
  const list_date_of_snapshot = [];

  for (let i = 0; i < histories.histories.length; i++) {
    const snapshot_at = histories.histories[i].snapshot_at;

    list_date_of_snapshot.push(snapshot_at);
  }

  const list_date_of_snapshot_without_dubl: any[] = [];

  list_date_of_snapshot.forEach((date) => {
    if (list_date_of_snapshot_without_dubl.indexOf(date) == -1) {
      list_date_of_snapshot_without_dubl.push(date);
    }
  });

  interface snapshotKeys {
    [key: string]: any[];
  }

  const obj_key_of_snapshot: snapshotKeys = {};

  list_date_of_snapshot_without_dubl.forEach((date) => {
    obj_key_of_snapshot[date] = [];
  });

  histories.histories.forEach((historie: any) => {
    obj_key_of_snapshot[historie.snapshot_at].push(...historie.assessments);
  });

  const list_concat_histories: any[] = [];

  for (const key in obj_key_of_snapshot) {
    const assessments = obj_key_of_snapshot[key];

    list_concat_histories.push({
      snapshot_at: key,
      assessments,
    });
  }

  histories.histories = list_concat_histories;

  return histories;
};
