const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };
  
  const module = {
    id: "M1",
    name: "Introduction to NodeJS",
    description: "This module covers the basics of NodeJS",
    course: "Full Stack Development",
  };

  export default function WorkingWithObjects(app) {
    // 路由返回整个作业对象
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });

    // 路由返回作业对象的 title 属性
    app.get("/lab5/assignment/title", (req, res) => {
      res.json(assignment.title);
    });

    // 修改作业对象的title属性
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });
      
    app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        assignment.completed = newCompleted === "true";
        res.json(assignment);
    });
    
    // 返回模块对象
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });

    // 返回模块的 name 属性
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });

    // 修改模块的 name 属性
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
      
    // 修改模块的 description 属性
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });
  }
