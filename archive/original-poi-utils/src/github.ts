import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: "YOUR_GITHUB_TOKEN", // 推荐使用 token 提高限流
});

async function getRepoInfo(owner, repo) {
  const response = await octokit.repos.get({ owner, repo });
  console.log(response.data);
}

getRepoInfo("facebook", "react");


// 1. 创建 GitHub Token
// 访问：https://github.com/settings/tokens
// 点击 "Generate new token" → "Fine-grained tokens"
// 设置：
// Token name: my-api-token
// Repository access: 选择你要访问的仓库（或所有）
// Permissions: 勾选 Contents: Read-only
// 点击生成，复制生成的 token（形如 ghp_XXXXXXXXXXXXXXXX）
// 🔐 保存好 token，后续用作 YOUR_GITHUB_TOKEN 