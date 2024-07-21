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
    //API exemple #2 : Récuperer le contenu avec l'Octokit JS et avec "async / await"
    //URL de l'API classique : https://api.github.com/users/sekou78/repos
    const octokit = new Octokit();
    const response = await octokit
      .request("GET /users/sekou78/repos")
      .catch((error) => {
        console.log("ERREUR lors de l'appel api getReposInformation", error);
      });

    const recentsProjects = response.data.slice(-3);
    //URL pour récuperer les langages d'un projet:
    //https://api.github.com/repos/sekou78/{nom-du-repos}/languages
    for (let i = 0; i < recentsProjects.length; i++) {
      const languagesUrl = recentsProjects[i].languages_url;
      const cleanedUrl = languagesUrl.replace("https://api.github.com", "");
      const responseLanguages = await octokit
        .request(`GET ${cleanedUrl}`)
        .catch((error) => {
          console.log(
            "ERREUR lors de l'appel api getReposInformation-langages",
            error
          );
        });

      const projectLanguages = responseLanguages.data;
      // console.log(projectLanguages);
      recentsProjects[i].languages = projectLanguages;
      // console.log(recentsProjects[i].languages);
    }
    this.updateHTMLProjects(recentsProjects);
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
      // const languages = project.languages;
      // console.log(languages);

      this.createHTMLLanguageTag(
        this.projectsTagsContainer[i],
        project.languages
      );
      htmlIndex++;
    }
  }

  createHTMLLanguageTag(div, languages) {
    //où ? Je crée mes éléments HTML
    //quels éléments ? les langages
    console.log("div", div);
    console.log("languages", languages);
    const arrayLanguages = Object.keys(languages);
    // console.log("array", arrayLanguages);
    for (let i = 0; i < arrayLanguages.length; i++) {
      const span = document.createElement("span");
      span.textContent = arrayLanguages[i];
      div.appendChild(span);
    }
    console.log("array", arrayLanguages);
  }
}

export { Home };
