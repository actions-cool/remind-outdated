require('dotenv').config();
const axios = require('axios');
const core = require("@actions/core");
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const { analyzeActionYml } = require('analyze-action');

// ****************************************************
const token = core.getInput('token') || process.env.GH;
const octokit = new Octokit({ auth: `token ${token}` });

// ****************************************************
async function run() {
  try {
    // const owner = github.context.repo.owner;
    // const repo = github.context.repo.repo;
    const owner = 'ant-design';
    const repo = 'ant-design';

    // Get Actions
    const APIURL = `https://api.github.com/repos/${owner}/${repo}/contents/.github/workflows/`;
    const res = await axios.get(APIURL);
    const actions = res.data;

    // 储存遇到所有的 action
    let allActions = [];
    let allActionsWithVersion = [];

    const actionYML = await axios.get(actions[0].download_url);
    const actionYMLArr = analyzeActionYml(actionYML.data)

    let arr = [];
    for await (let action of actionYMLArr.actions) {
      allActions.push(`${action.owner}/${action.repo}`);
      const latest = await octokit.repos.getLatestRelease({
        owner: action.owner,
        repo: action.repo,
      })
      console.log(latest.data)

      const getRelease = await octokit.repos.getReleaseByTag({
        owner: action.owner,
        repo: action.repo,
        tag: 'v2.3.3'
      })
      console.log(getRelease)
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
