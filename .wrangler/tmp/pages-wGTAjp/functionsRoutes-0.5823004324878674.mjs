import { onRequestPost as __api_explain_js_onRequestPost } from "C:\\Users\\Prashanth Kumar\\Desktop\\Neet\\functions\\api\\explain.js"

export const routes = [
    {
      routePath: "/api/explain",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_explain_js_onRequestPost],
    },
  ]