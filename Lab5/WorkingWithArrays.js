const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  
  export default function WorkingWithArrays(app) {
    // 创建新任务的路由（一定要在获取特定ID的路由之前定义）
    app.get("/lab5/todos/create", (req, res) => {
      const newTodo = {
        id: new Date().getTime(), // 使用时间戳作为唯一标识符
        title: "New Task", // 新任务的默认标题
        completed: false, // 默认未完成状态
      };
      todos.push(newTodo); // 将新任务添加到todos数组中
      res.json(todos); // 返回更新后的todos数组
    });
  
    // 根据ID获取任务的路由
    app.get("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).send("Todo not found");
      }
    });
  
    // 其他已有的路由（如获取所有任务、筛选任务等）
    app.get("/lab5/todos", (req, res) => {
      const { completed } = req.query;
      if (completed !== undefined) {
        const completedBool = completed === "true";
        const completedTodos = todos.filter((t) => t.completed === completedBool);
        res.json(completedTodos);
        return;
      }
      res.json(todos);
    });
  }