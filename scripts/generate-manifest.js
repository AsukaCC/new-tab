import { loadEnv } from 'vite'
import fs from 'fs'
import path from 'path'

// 加载环境变量
const env = loadEnv('', process.cwd(), 'VITE_')

// 读取原始的manifest模板
const manifestTemplate = JSON.parse(
  fs.readFileSync('./public/manifest.json', 'utf-8')
)

// 替换环境变量
manifestTemplate.oauth2.client_id = env.VITE_GOOGLE_CLIENT_ID

// 写入生成的manifest文件
fs.writeFileSync(
  path.resolve('./dist/manifest.json'),
  JSON.stringify(manifestTemplate, null, 2)
)

console.log('✨ Manifest file generated successfully!')