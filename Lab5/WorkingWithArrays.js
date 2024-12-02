let todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  
  export default function WorkingWithArrays(app) {
    // 更新任务标题的路由
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
      const { id, title } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.title = title;
        res.json(todos);
      } else {
        res.status(404).send("Todo not found");
      }
    });
  
    // 更新任务描述的路由
    app.get("/lab5/todos/:id/description/:description", (req, res) => {
      const { id, description } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.description = description;
        res.json(todos);
      } else {
        res.status(404).send("Todo not found");
      }
    });
  
    // 更新任务完成状态的路由
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
      const { id, completed } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.completed = completed === "true";
        res.json(todos);
      } else {
        res.status(404).send("Todo not found");
      }
    });

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
  
    // 使用get删除任务的路由
    app.get("/lab5/todos/:id/delete", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
      if (todoIndex !== -1) {
        todos.splice(todoIndex, 1); // 删除数组中的任务
        res.json(todos); // 返回更新后的todos数组
      } else {
        res.status(404).send("Todo not found");
      }
    });

    // 使用 HTTP DELETE 方法删除操作
    app.delete("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
      if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.sendStatus(200); // 成功删除，返回状态码 200
      } else {
        res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
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

      // 使用 POST 请求接收 JSON 数据并创建新 todo 项
    app.post("/lab5/todos", (req, res) => {
      const newTodo = { ...req.body, id: new Date().getTime() };  // 通过请求体接收数据
      todos.push(newTodo);
      res.json(newTodo);  // 只返回新创建的 todo 项
    });

    app.put("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      todos = todos.map((t) => {
        if (t.id === parseInt(id)) {
          return { ...t, ...req.body };
        }
        return t;
      });
      res.sendStatus(200); // 返回状态码 200 表示成功
    });
    
  }