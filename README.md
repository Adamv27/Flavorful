<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="frontend/images/flavorful-green.svg" alt="Logo" width="300">
  </a>

  <h3 align="center">Flavorful</h3>

  <p align="center">
    A recipe app aimed to help users discover new recipes and save their existinig ones
    <br />
    <br />
    <a href="https://recipes.adamvinch.com">Live site</a>
    ·
    <a href="https://github.com/adamv27/WhatToEat/issues">Report Bug</a>
    ·
    <a href="https://github.com/adamv27/WhatToEat/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Flavorful Screen Shot][product-screenshot]](https://github.com/Adamv27/WhatToEat/blob/main/frontend/)

This project is a full stack web app made for JMU's CS 343 Application Development class. 

Built around the [Spoonacular API](https://spoonacular.com/food-api/docs), this website provides users the ability to
exploree new recipes found on Spoonacular, save them to their account, and add their own existing recipes all in one place.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![FastAPI][FastAPI.com]][FastAPI-url]
  - Used to create the backend which provides user auth and performs CRUD operations on user recipes
* [![Supabase][Supabase.com]][Supabase-url]
  - User and recipe data is stored in Supabase's built in PostreSQL database 
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
  - Provides built in responsive components

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* [Docker](https://docs.docker.com/engine/install/)

### Installation

1. Get a free API Key for [Spoonacular](https://spoonacular.com/food-api/)
2. Set up a free [Supabase](https://supabase.com) project
3. Clone the repo
   ```sh
   git clone https://github.com/Adamv27/WhatToEat.git
   ```  
4. Create .env file from root of repo
   ```sh
   touch backend/.env
   ```
5. Enter your Spoonacular API key in `backend/.env`
   ```py
   SPOONACULAR_API_KEY=(YOUR API KEY)
   ```
6. Enter your Supabase Postgres URI in `backend/.env`
   - You can find this in Project Settings > Database
   ```py
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres
7. Enter a JWT key from [GRC](https://www.grc.com/passwords.htm) in `backend/.env`
   ```py
   JWT_KEY=(YOUR JWT KEY)
   ```
8. Run backend in docker container
   ```sh
   docker compose up --build
   ```
9. Front end is vanilla JavaScript and can be ran by opening `WhatToEat/frontend/index.html` in a web browser
    or using [Live Server](https://www.npmjs.com/package/live-server)
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Display recipe details on card click
- [x] Search for saved recipes 
- [x] Search for recipes based on queries
    - [X] Time
    - [X] Calories
    - [X] Cuisine
    - [ ] Advanced parameters
- [ ] Add user account page
    - [ ] Export saved recipe data to JSON
    - [ ] Clear data
- [ ] Upload custom recipes

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Adamv27/WhatToEat.svg?style=for-the-badge
[contributors-url]: https://github.com/Adamv27/WhatToEat/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Adamv27/WhatToEat.svg?style=for-the-badge
[forks-url]: https://github.com/Adamv27/WhatToEat/network/members
[stars-shield]: https://img.shields.io/github/stars/Adamv27/WhatToEat.svg?style=for-the-badge
[stars-url]: https://github.com/Adamv27/WhatToEat/stargazers
[issues-shield]: https://img.shields.io/github/issues/Adamv27/WhatToEat.svg?style=for-the-badge
[issues-url]: https://github.com/Adamv27/WhatToEat/issues
[license-shield]: https://img.shields.io/github/license/Adamv27/WhatToEat.svg?style=for-the-badge
[license-url]: https://github.com/Adamv27/WhatToEat/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/adam-vinch
[product-screenshot]: frontend/images/mobile-view.png

[FastAPI.com]: https://img.shields.io/badge/FastAPI-grey?style=for-the-badge&logo=fastapi
[FastAPI-url]: https://fastapi.tiangolo.com/
[Supabase.com]: https://img.shields.io/badge/Supabase-grey?style=for-the-badge&logo=supabase
[Supabase-url]: https://supabase.com/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-grey?style=for-the-badge&logo=bootstrap
[Bootstrap-url]: https://getbootstrap.com
