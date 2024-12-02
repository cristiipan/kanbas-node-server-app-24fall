import Database from "../Database/index.js";

// 注册课程
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = { _id: new Date().getTime().toString(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

// 取消注册课程
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
  );
}

// 查找用户的注册课程
export function findEnrollmentsByUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}
