import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)
    );
    return enrolledCourses;
  }

export function createCourse(course) {
    const newCourse = { ...course, _id: Date.now().toString() };
    Database.courses = [...Database.courses, newCourse];
    return newCourse;
}

export function deleteCourse(courseId) {
    if (!courseId) {
        throw new Error("课程ID不能为空");
    }
    const { courses, enrollments } = Database;
    // 检查课程是否存在
    const courseExists = courses.some(course => course._id === courseId);
    if (!courseExists) {
        throw new Error(`未找到ID为 ${courseId} 的课程`);
    }
    // 从课程列表中移除该课程
    Database.courses = courses.filter((course) => course._id !== courseId);
    // 从注册信息中移除与该课程相关的所有记录
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
    );
}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database; // 获取课程数据
    const course = courses.find((course) => course._id === courseId); // 查找要更新的课程
    if (!course) {
      throw new Error('Course not found');
    }
    // 将传递过来的更新应用到找到的课程对象上
    Object.assign(course, courseUpdates);
    return course;
  }
  