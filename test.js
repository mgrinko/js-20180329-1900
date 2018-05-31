'use strict';

function loadAcademy(academyName, callback, errorCallback) {
  callback({ id: 1 });
}

function loadUser(callback, errorCallback) {
  callback({ name: 'Misha', id: 1 });
}

function loadCourse(courseId, callback, errorCallback) {
  callback({ id: 123, topics: [] });
}

function loadUserProgress(userId, courseId, callback, errorCallback) {
  callback({
    results: [{ topicId: 12 }]
  })
}


async function test() {

  try {
    let academy = await loadAcademy('academy');
    let user = await loadUser();
    let course = await loadCourse(456);
    let progress = await loadUserProgress(course.id, user.id);

    console.log(progress);
  } catch (error) {
    console.log(error);
  }

}

let currentUser;

loadAcademy('academy')
  .then((academy) => {
    return loadUser();
  })
  .then((user) => {
    if (!user.hasAccess) {
      return;
    }

    currentUser = user;

    return loadCourse(456);
  })
  .then((course) => {
    return loadUserProgress(course.id, currentUser.id);
  })
  .then((progress) => {

  })
  .catch()
