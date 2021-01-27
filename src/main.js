const core = require("@actions/core");
const github = require('@actions/github');

async function run() {
  try {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const APIURL = 'https://api.github.com/repos/octokit/plugin-rest-endpoint-methods.js/contents/docs/';

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
