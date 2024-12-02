import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // 注册课程
  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.status(201).json(newEnrollment);
  });

  // 取消注册课程
  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  });

  // 查找用户的注册课程
  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsByUser(userId);
    res.json(enrollments);
  });
}
