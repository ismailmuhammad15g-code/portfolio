"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";

export const getGithubStats = action({
  args: {},
  returns: v.any(),
  handler: async () => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GITHUB_TOKEN environment variable is not set");
    }
    const headers = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
    
    // Get user details for total repos
    const userRes = await fetch("https://api.github.com/user", { headers });
    const user = await userRes.json();
    
    // Get repos
    const reposRes = await fetch("https://api.github.com/user/repos?sort=updated&per_page=6&affiliation=owner", { headers });
    const repos = await reposRes.json();
    
    return {
      totalRepos: typeof user.public_repos === 'number' ? user.public_repos + (user.total_private_repos || 0) : 0,
      repos: Array.isArray(repos) ? repos.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        language: r.language,
        stargazers_count: r.stargazers_count,
        updated_at: r.updated_at
      })) : []
    };
  }
});