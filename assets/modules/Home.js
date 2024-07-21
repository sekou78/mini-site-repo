import { Octokit } from "https://esm.sh/octokit";

class Home {
  constructor() {
    this.descriptionHTML = document.querySelector(".js-home-description");
    this.profilHTML = document.querySelector(".js-home-profil-url");
    this.avatarHTML = document.querySelector(".js-home-avatar");

    this.projectsTitle = document.querySelectorAll(".js-home-project-title");
    this.projectsDescription = document.querySelectorAll(
      ".js-home-project-description"
    );
    this.projectsTagsContainer = document.querySelectorAll(
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
        this.updateHTMLUser(data);
      })
      .catch((error) => {
        console.log("ERREUR lors de l'appel api getReposInformation", error);
      });
  }

  async getReposInformations() {
    const octokit = new Octokit();
    //URL de l'API classique : https://api.github.com/users/sekou78/repos
    const response = await octokit
      .request("GET /users/sekou78/repos")
      .catch((error) => {
        console.log("ERREUR lors de l'appel api getReposInformation", error);
      });
    this.updateHTMLProjects(response.data);
  }

  updateHTMLUser(APIdata) {
    //Afficher la description de mon profil Github
    this.descriptionHTML.textContent = APIdata.bio;
    //Afficher l'url de mon profil github
    this.profilHTML.setAttribute("href", APIdata.html_url);
    //Afficher mon avatar
    this.avatarHTML.setAttribute("src", APIdata.avatar_url);
  }

  updateHTMLProjects(projects) {
    const maxIndex = projects.length - 1;
    let htmlIndex = 0;
    for (let i = maxIndex; i > maxIndex - 3; i--) {
      const project = projects[i];
      this.projectsTitle[htmlIndex].textContent = project.name;
      this.projectsDescription[htmlIndex].textContent = project.description;
      const topics = project.topics;
      console.log(topics);
      htmlIndex++;
    }
  }
}

export { Home };
