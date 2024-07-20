import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit({});
// console.log(octokit);

//octokit.rest.repos => provient du SDK
//get => Méthode du SDK pour récupérer ici les repos
octokit.rest.repos
  .get({
    owner: "sekou78",
    repo: "Restaurant",
  })
  .then(({ data }) => {
    console.log("Repo récupérer", data);
    console.log(data.url);
  });
