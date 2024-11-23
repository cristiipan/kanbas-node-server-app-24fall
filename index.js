import express from 'express';
import Hello from './Hello.js';
import Lab5 from "./Lab5/index.js";

const app = express()
app.use(express.json());  // 用于处理 JSON 请求体

Lab5(app);  // 使用 Lab 5 的路由
Hello(app);

const PORT = process.env.PORT || 4000;  // 使用环境变量PORT，如果不可用则使用4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  // 从 Lab5 导入并传递 express 模块的引用
  