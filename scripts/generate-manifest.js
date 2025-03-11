import { loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

// 加载环境变量，按优先级顺序：.env.local > .env
// 首先加载 .env 的环境变量（低优先级）
const baseEnv = loadEnv('', process.cwd(), 'VITE_');

// 尝试加载 .env.local 的环境变量（高优先级）
let localEnv = {};
const localEnvPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(localEnvPath)) {
  // 读取 .env.local 文件
  const localEnvContent = fs.readFileSync(localEnvPath, 'utf-8');
  // 解析环境变量
  localEnvContent.split('\n').forEach((line) => {
    // 忽略注释和空行
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=').map((part) => part.trim());
      // 只处理 VITE_ 前缀的变量，与 loadEnv 保持一致
      if (key.startsWith('VITE_')) {
        localEnv[key] = value;
      }
    }
  });
}

// 合并环境变量，.env.local 的优先级更高
const env = { ...baseEnv, ...localEnv };

// 读取原始的manifest模板
const manifestTemplate = JSON.parse(
  fs.readFileSync('./public/manifest.json', 'utf-8')
);

// 替换环境变量
manifestTemplate.oauth2.client_id = env.VITE_GOOGLE_CLIENT_ID;

// 写入生成的manifest文件
fs.writeFileSync(
  path.resolve('./dist/manifest.json'),
  JSON.stringify(manifestTemplate, null, 2)
);

console.log('✨ Manifest file generated successfully!');
