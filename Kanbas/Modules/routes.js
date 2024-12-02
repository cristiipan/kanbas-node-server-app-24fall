import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    await modulesDao.deleteModule(moduleId);
    res.sendStatus(204);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const updatedModule = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.status(204).json(updatedModule);
  });
}
