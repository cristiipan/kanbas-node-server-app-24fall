import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // 创建新 Assignment
  app.post("/api/assignments", (req, res) => {
    const newAssignment = assignmentsDao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  });

  // 获取所有 Assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = assignmentsDao.findAllAssignments();
    res.json(assignments);
  });

  // 获取特定 Assignment
  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = assignmentsDao.findAssignmentById(assignmentId);
    if (!assignment) {
      res.sendStatus(404);
    } else {
      res.json(assignment);
    }
  });

  // 更新 Assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.status(204).json(updatedAssignment);
  });

  // 删除 Assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });
}
