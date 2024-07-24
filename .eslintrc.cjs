module.exports = {
  root: true, // 作为根配置文件
  env: {
    browser: true, // 浏览器环境
    es2020: true, // 启用ES2020特性
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ["simple-import-sort", 'react-refresh', "import"],
  rules: {
    semi: ["warn", "never"], // 分号(不使用)
    indent: ["error", 2, { // 缩进，2个空格
      SwitchCase: 1, // switch语句缩进1个单位
      offsetTernaryExpressions: true //三元表达式缩进
    }],
    quotes: ["error", "double"], // 引号(双引号)
    "object-shorthand": ["off", "consistent"], // 对象字面量简写语法

    "no-unused-vars": "off", // 禁止未使用过的变量。已禁用，使用typescript检查
    "@typescript-eslint/no-unused-vars": "off", // 禁止未使用过的变量。
    "no-undef": "off", // 禁止未声明的变量。已禁用，使用typescript检查
    "no-var": "error", // 禁止使用 var 声明变量
    "@typescript-eslint/no-non-null-assertion": "off", // 禁止非空断言

    "simple-import-sort/exports": "error", // 排序导出
    "simple-import-sort/imports": "error", // 排序导入
    "import/first": "error", // import语句应该放在文件的顶部
    "import/newline-after-import": "error", // import语句后要求空行
    "import/no-duplicates": "error", // 禁止重复导入
    'react-refresh/only-export-components': [ // React组件只能导出函数组件
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用any类型(关闭)
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
