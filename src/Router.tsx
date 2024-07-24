/**
 * 基于文件系统的路由配置
 * 参考：https://juejin.cn/post/7064450438564675621
 * 功能：
 * - [x] 懒加载
 * - [ ] 路由守卫
 * - [x] 错误边界
 * - [ ] 路由参数
 * - [x] 嵌套路由
 *
 * - [x] _layout.tsx => 布局组件
 * - [x] _error.tsx => 错误组件
 *
 * 路由形式：
 * - [x] pages/index.tsx => /
 * - [ ] pages/index/index.tsx => /
 * - [x] pages/about.tsx => /about
 * - [x] pages/user/index.tsx => /user
 * - [ ] pages/user/[id].tsx => /user/:id
 * - [ ] pages/user/[id]/profile.tsx => /user/:id/profile
 */
import { ComponentType } from "react"
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"

import { set, wrapSuspense } from "./utils"

/**
 * 动态导入函数
 */
type DynamicImportFunction = () => Promise<{ default: ComponentType }>
/**
 * 路径配置对象
 * - key 为路径
 * - value 为动态导入函数 或 子路径配置对象
 * - 递归实现嵌套路由
 * - 以 _layout 为 key 的值为布局组件
 * - 以 _error 为 key 的值为错误边界组件
 * - 以 _meta 为 key 的值为路由元数据
 */
type PathConfig = { [key: string]: PathConfig | DynamicImportFunction } & {
  _layout?: DynamicImportFunction
  _error?: DynamicImportFunction
  _404?: DynamicImportFunction
  _meta?: {
    title?: string
  }
}

function generatePathConfig(): PathConfig {
  // 获取所有tsx文件，过滤掉大写开头的(组件)文件
  const modules = import.meta.glob(["./pages/**/(?![A-Z])*.{js,jsx,ts,tsx}", "!**/*.{d,spec,e2e}.ts"]) as Record<
    string,
    DynamicImportFunction
  >
  console.log("modules", modules)

  const pathConfig = {}
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace("./pages/", "")
      // 去除文件名后缀
      .replace(/\.[jt]sx?/, "")
      .replace(/\.[jt]s?/, "")
      // 转换动态路由 [foo].tsx => :foo
      .replace(/\[([\w-]+)]/, ":$1")
      // 转换以参数开头的文件
      .replace(/([\w-]+)/, "$1")
      // 以目录分隔
      .split("/")

    // 使用自定义的 set 函数合并为一个对象
    set(pathConfig, routePath, modules[filePath])
    console.log("route", routePath, modules[filePath])
  })

  console.log("pathDict", pathConfig)
  return pathConfig
}

/**
 * 将文件路径配置映射为 react-router 路由
 */
function mapPathConfigToRoute(cfg: PathConfig): RouteObject[] {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === "function") {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === "index"
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        element: wrapSuspense(child),
      }
    }
    child = child as PathConfig
    // 否则为目录，则查找下一层级
    const { _layout, _error, ...rest } = child
    console.log("layout", _layout, rest)
    return {
      path: routePath,
      // layout 处理
      element: _layout && wrapSuspense(_layout),
      errorElement: _error && wrapSuspense(_error),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    }
  })
}

function generateRouteConfig(): RouteObject[] {
  const { _layout, _error, _404, ...pathConfig } = generatePathConfig()
  // 提取跟路由的 layout
  const rootRoute = {
    path: "/",
    element: _layout && wrapSuspense(_layout),
    errorElement: _error && wrapSuspense(_error),
    children: mapPathConfigToRoute(pathConfig),
  }
  // 404 处理
  if (_404) {
    rootRoute.children.push({
      path: "*",
      element: wrapSuspense(_404),
    })
  }

  const routes: RouteObject[] = [rootRoute]
  console.log("routes", routes)
  return routes
}

const router = createBrowserRouter(generateRouteConfig())

export default function Router() {
  return <RouterProvider router={router} />
}
