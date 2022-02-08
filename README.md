# AngularPokemonTrainer

<div id="top"></div>

<div align="center">
  <img src="resources\logo.png" alt="Translate logo" height="250">
  <h3 align="center">Assignment 4</h3>
  <p align="center">
    Heroku App
    <br />
    <a href="https://pokemon-assignment-4.herokuapp.com/">Demo</a>
  </p>
</div>

# Table of Contents

1. [Instructions](#instructions)
2. [Appendix A](#appendix-a)
3. [Resources](#resources)
4. [Install](#install)
5. [Usage](#usage)
6. [Demo](#demo)
7. [Maintainers](#maintainers)
8. [Contributing](#contributing)
9. [Conventions](#conventions)
10. [Contact](#contact)

# Instructions

## Assignment 4

### Create a Pokémon Trainer using Angular

### Pokémon Trainer

<p>
  Build a Pokémon Trainer web app using the Angular Framework. You have freedom to be as creative as you wish, if it meets the minimum requirements described in Appendix A.
</p>
<ol>
  <li>
    <p>Set up the development environment</p>
    <p>Make sure you have the following tools available:</p>
    <ul>
        <li>Figma</li>
        <li>NPM/Node.js (LTS – Long Term Support version)</li>
        <li> Angular CLI</li>
        <li>Visual Studio Code Text Editor/ IntelliJ</li>
        <li>Browser Developer Tools for testing and debugging
            o Angular Dev Tools
        </li>
        <li>Git</li>
        <li>Trainer API: https://github.com/dewald-els/noroff-assignment-api</li>
        <li>Heroku</li>
    </ul>
  </li>
  <li>
    <p>Design a Component Tree</p>
    <p>
        Use Figma to create a component tree of the application. The component tree should show the pages and feature 
        components you plan to create in your application. This will count towards the overall grade for the application. It 
        should be done BEFORE a single line of code is written.
    </p>
  </li>
  <li>
    <p>Test API in Postman</p>
    <p>
        Test the endpoints to get an understanding of the data structures that will be used in your application. Use the Pokémon API to display Pokémon names: https://pokeapi.co/.
    </p>
    <p>Write HTML & CSS as needed</p>
    <ul>
      <li>
            Colours: If you have trouble choosing colours, use a free resource like https://coolors.co to browse and experiment with colour combinations.</li>
      <li>Animations: If you want to use animations to bring your design to life, use https://animate.style/.</li>
      <li> 
            Free graphics for your web applications: https://www.justinmind.com/blog/35-places-to-get-free-vectorimages-for-your-designs/</li>
      <li>See Pokémon Catalogue page section for more information on Pokémon images.</li>
    </ul>
  </li>
  <li>
    <p> Use the Angular framework to build the following screens into your Pokémon Trainer app. (See 
        Appendix A for detailed specs):</p>
    <ul>
      <li>The Landing Page</li>
      <li>The Trainer Page</li>
      <li> The Pokémon Catalogue Page</li>
    </ul>
  </li>
  <li>
    <p>Submit</p>
    <ul>
      <li>
            Export the component tree to PDF, upload the file to the project’s Git repository and submit a link to    your file.</li>
        <li> 
            Publish your Single Page Application on Heroku and submit a link to your app and the source code on your Git 
            repository. Use https://gitlab.com/javascript-project-examples/heroku-deployment-guides/-
            /blob/main/guides/heroku-angular-deployment.md to learn how to deploy Angular apps to Heroku.
        </li>
    </ul>
  </li>
</ol>

<p align="right">(<a href="#top">back to top</a>)</p>

# Appendix A

### Requirements for the Pokémon Trainer app

<p>
The application allows a user to collect Pokémon received from the PokeAPI. Users must enter username before being 
able to collect any Pokémon. Users must also be able to view the Pokémon that have been collected. 
</p>

1.  ### Landing Page

    <p>
     The first thing a user should see is the “Login page” where the user must be able to enter their “Trainer” name. 
     There should be a button that saves the Trainer name to the Trainer API and in localStorage. The app must then be 
     redirected to the main page, the Pokémon Catalogue page. 
     The users may NOT be able to see the Pokémon Catalogue without have a Trainer name stored in localStorage. Use a 
     Guard service to achieve this functionality.
     If username exists in localStorage, you may automatically redirect to the Pokémon Catalogue page. 
     You can first check if the username exists in the Trainer API before redirecting to the Catalogue page.</p>

    <p>NB!
         Local storage can ONLY store strings. You will have to stringify the data using JSON.stringify when storing objects. 
         Remember, when reading the data, you will have to parse it back to a JavaScript object using JSON.parse</p>

2.  ### Trainer Page

    <p>
        A user may only view this page if there is a Trainer name that exists in localStorage. Please redirect a user back to the Landing page if they do not have a Trainer name stored in localStorage. Use a Guard service to achieve this functionality.

        The Trainer page should list the Pokémon that the trainer has collected. For each collected Pokémon, display the Pokémon name and image.

        A user must also be able to remove a Pokémon from their collection from the Trainer page.

    </p>

    3.  ### Pokémon Catalogue Page

    <p>
    The Catalogue page may NOT be viewed if there is no Trainer name stored in localStorage. Use a Guard service to achieve 
    this functionality. 
    The Catalogue page must list the Pokémon name and avatar*.
    It is recommended to get all the Pokémon and store it in sessionStorage. (Use the limit query parameter for the PokeAPI) 
    When the page is reloaded, read from sessionStorage rather than the API. This way, the PokeAPI is not constantly hit with 
    requests every time you save your files.
    You may optionally create a page that uses Pagination to load n number of Pokémon at a time.

    </p>

    <p>Note:
    You may use the Github repository to obtain images for the Pokémon. You can use the URL of the image with the id of
    the Pokémon.
    The ID of the Pokemon is in the initial response as part of the URL property. You will need to “extract” the id from this
    URL.
    {
    name:"bulbasaur"
    url:"https://pokeapi.co/api/v2/pokemon/1/"
    }
    Example for Pokémon with id of 1:
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
    See all sprites:
    https://github.com/PokeAPI/sprites

    </p>

3.  ### Profile page

    <p>The profile page must display the last 10 translations for the current user. There must also be a button to clear 
    the translations. This should mark the translations as “deleted” in your database and no longer display on the 
    profile page.</p>

    <p>The Logout button should clear all the storage and return to the start page. You may design this however you’d 
    like.</p>

    <p>
        Add a button on each Pokémon that, when clicked, adds the Pokémon to the trainer’s collection. This must update the 
        Trainer API with the collected Pokémon. 
        You must also visually indicate that this Pokémon has been collected. You may choose how to indicate this, perhaps 
        display a small Poke ball in the corner of the collected Pokémon, but you have freedom to be creative.
        You may optionally add a details section to each Pokémon that is ONLY shown when a “Show more info” button is 
        clicked. Here you can add information like the Pokémon base states and abilities. 
        Do NOT download all the Pokémon details on the Catalogue page. Only download additional information for the 
        Pokémon if you add the “Show more” feature.
    </p>

<p align="right">(<a href="#top">back to top</a>)</p>

### Required features

The following features/tools must be present in the application:

<ul>
  <li>Angular framework</li>
  <li>Angular Router to navigate between pages</li>
  <li>Store the username and collected Pokémon in the Trainer API (Noroff API deployed to Heroku).</li>
  <li>Use Angular Services to manage the state of your application</li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

## Optional features

<p>None.</p>

<p align="right">(<a href="#top">back to top</a>)</p>

# Resources

Heroku: <a href="https://pokemon-assignment-4.herokuapp.com/">Demo</a>

Figma: <a href="/resources/Component%20Diagram.pdf">Diagram</a>

Code: <a href="/src">Source</a>

# Install

```
cd AngularPokemonTrainer
ng serve --open
```

# Usage

```
ng serve
```

# Demo

Heroku App:

<a href="https://pokemon-assignment-4.herokuapp.com/">https://pokemon-assignment-4.herokuapp.com/</a>

<p align="right">(<a href="#top">back to top</a>)</p>

# Maintainers

[@Cusatelli](https://github.com/Cusatelli)

[@OmarAbdiAli](https://github.com/OmarAbdiAli)

# Contributing

[@OmarAbdiAli](https://github.com/OmarAbdiAli)

[@Cusatelli](https://github.com/Cusatelli)

<p align="right">(<a href="#top">back to top</a>)</p>

# Conventions

`fix: <description>` a commit of the type fix patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).<br/>
`feat: <description>` a commit of the type feat introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).<br/>
`BREAKING CHANGE: <description>` a commit that has a footer `BREAKING CHANGE:`, or appends a ! after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A `BREAKING CHANGE` can be part of commits of any type.

Read more: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) v1.0.0

<p align="right">(<a href="#top">back to top</a>)</p>

# Contact

Cusatelli: <a href="mailto:github.cusatelli@gmail.com">github.cusatelli@gmail.com</a>

OmarAbdiAli: <a href="mailto:github.omarabdiali0@gmail.com">github.OmarAbdiAli@gmail.com</a>

<p align="right">(<a href="#top">back to top</a>)</p>
