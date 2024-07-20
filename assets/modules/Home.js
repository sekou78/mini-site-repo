import { Octokit } from "https://esm.sh/octokit";

class Home {
  constructor() {
    this.descriptionHTML = document.querySelector(".js-home-description");
    this.profilHTML = document.querySelector(".js-home-profil-url");
    this.avatarHTML = document.querySelector(".js-home-avatar");

    this.projectTitle = document.querySelector(".js-home-project-title");
    this.projectDescription = document.querySelector(
      ".js-home-project-description"
    );
    this.projectTagsContainer = document.querySelector(
      ".js-home-project-tags-container"
    );

    this.init();
  }

  init() {
    this.getUserInformations();
    this.getReposInformations();
  }

  getUserInformations() {
    //API exemple #1 : Récuperer le contenu avec un fetch
    fetch("https://api.github.com/users/sekou78")
      .then((response) => response.json())
      .then((data) => {
        this.updateHTML(data);
      })
      .catch((error) => {
        console.log("ERREUR lors de l'appel api getReposInformation", error);
      });
  }

  async getReposInformations() {
    //API exemple #2 : Récuperer le contenu avec l'Octokit JS et avec "async / await"
    // console.log(this.projectTitle);
    // console.log(this.projectDescription);
    // console.log(this.projectTagsContainer);

    // console.log(Octokit);
    const octokit = new Octokit();
    //URL de l'API classique : https://api.github.com/users/sekou78/repos
    const response = await octokit
      //   .request("GET /users/sekou78/re-pos")
      .request("GET /users/sekou78/repos")
      .catch((error) => {
        console.log("ERREUR lors de l'appel api getReposInformation", error);
      });
    // if (response.status !== 200) {
    //   console.log("ERREUR lors de l'appel api");
    // }
    const data = response.data;
    console.log(data);
    // console.log(response);
  }

  updateHTML(APIdata) {
    //Afficher la description de mon profil Github
    this.descriptionHTML.textContent = APIdata.bio;
    //Afficher l'url de mon profil github
    this.profilHTML.setAttribute("href", APIdata.html_url);
    //Afficher mon avatar
    this.avatarHTML.setAttribute("src", APIdata.avatar_url);
  }
}

export { Home };
