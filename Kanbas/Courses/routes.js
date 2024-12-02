import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204); // 成功删除后返回 204 状态码
  });

  app.put("/api/courses/:courseId", (req, res) => {
    try {
      const { courseId } = req.params; // 从请求参数中获取课程ID
      const courseUpdates = req.body; // 从请求体中获取课程更新数据
      const updatedCourse = dao.updateCourse(courseId, courseUpdates); // 调用 DAO 函数来更新课程
      res.status(200).send(updatedCourse); // 成功时返回更新后的课程
    } catch (error) {
      console.error(error);
      res.status(404).send({ error: 'Course not found' }); // 错误处理
    }
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });
  
}