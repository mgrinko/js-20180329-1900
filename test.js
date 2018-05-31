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



loadAcademy('academy', (academy) => {
  loadUser((user) => {
    if (!user.hasAccess) {
      return;
    }

    loadCourse(456, (course) => {
      loadUserProgress(course.id, user.id, () => {
        // ...
      })
    })
  })
});