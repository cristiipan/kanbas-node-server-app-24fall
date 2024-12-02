import express from "express";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import session from "express-session"; // 导入 express-session 库
import "dotenv/config"; // 导入 dotenv 配置
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

const app = express();

app.use(
  cors({
    credentials: true, // 允许跨域请求中使用 Cookie
    origin: process.env.NETLIFY_URL || "http://localhost:3000", // 仅允许来自特定来源的请求
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas", // 用于加密 session ID 的密钥
  resave: false, // 如果没有修改，不会强制保存 session
  saveUninitialized: false, // 如果没有 session 也不会强制创建
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions)); // 使用会话中间件

app.use(express.json()); // 用于处理 JSON 请求体

// 注册所有的路由
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
EnrollmentsRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

const PORT = process.env.PORT || 4000; // 使用环境变量PORT，如果不可用则使用4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});