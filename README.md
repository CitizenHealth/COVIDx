# COVIDx

> We're on a mission to reduce the coronavirus R0 to < 1 by 2021

COVIDx is a pandemic response platform leveraging the crowd to predict & prevent the spread of COVID-19. This is an open source volunteer project supported by Citizen Health, a Public Benefit Cooperative dedicated to fighting COVID-19.

COVIDx consists of three core components:

**1. Crowdsourcing wearable data, symptom checks, & population sentiment**

Studies show that resting heart rate data & sleep quality measured from wearables like Fitbits and Apple Watches can predict influenza-like illnesses at the state level. We're extending these studies to detect COVID-19 before people exhibit symptoms.

Along with passive, synchronous, and physiological data analysis, we're crowdsourcing self-reported symptom checks. Daily check-ins can help understand where the virus might be spreading and give us opportunities to intervene. Our aim is to use the power of the crowd for the rapid scaling of public health surveillance.

**2. Coordinating the crowdsourced data with public health agencies, hospitals, & testing facilities**

Hospitals & testing facilities do not have the infrastructure for managing the scale of testing we need at the local, state, & regional levels. Our aim is to leverage longitudinal data from self-reports & wearable data to help hospitals better screen for COVID-19 while supporting at-risk populations with information they need for testing.


**3. Gamifying self-reporting, isolation, & social distancing protocols**

Games are a powerful tool to promote awareness and behavioral changes, including public health. We’re applying behavioral economics & gamification techniques to scale epidemiological surveillance through volunteered contributions. Our aim is to promote awareness and behavioral changes needed to fight COVID-19.

**Here are some important resources:**

- We communicate on our Rocket Chat server at [chat.citizenhealth.io](https://chat.citizenhealth.io)
- Our [Trello board](https://trello.com/b/iaHAdHFK/covidx) is where we manage this project
- Our designs are on [Figma](https://www.figma.com/file/ttoCvYKt8seGWl5dYi3ERL/COVIDx-Screens?node-id=7%3A0)
- Images, graphics, and general files are shared on this [Google Drive folder](https://drive.google.com/drive/folders/1wqfooBvQyUleZ8OpVvuLxhKGmUdikQWz?usp=sharing)
- [Citizen Health](https://citizenhealth.io) is sponsoring COVIDx  


Development - How To Contribute
---

Please always branch off of `develop`, all branches should be named based on
a corresponding issue number, for example `issue-126`. All open issues can be
viewed [here](https://github.com/CitizenHealth/COVIDx/issues). If you're working
on a bug fix or new functionality not already listed in an issue, you must first
create a new issue to document what you will be working on.

Please be sure to use `yarn` as your package manager *instead* of `npm`.

1. Clone our github repo, once you've been added to the project
2. Run: `yarn install`
3. Checkout to your issue branch
4. Run `yarn start`, after an initial load it should auto-open http://localhost:3000/
5. Develop and test your code changes, it should livereload out of the box
6. Make sure you commit changes often, with clear commit messages
7. Send a pull request

Build & Deployment from scratch
--
Pre-requisite: Be added to the Firebase project if not already

1. Clone github repo
2. Run: yarn install
3. Run: yarn deploy

## Tech

### COVIDx API
Our backend server is a separate repo [here](https://github.com/CitizenHealth/COVIDx-server)

### Dependencies
COVIDx uses a number of open source projects to work properly:

* [React](https://reactjs.org/) - for our frontend
* [tripetto](https://tripetto.com/) - for building our forms
* [Flask](https://flask.palletsprojects.com/) - for our backend
* [Leaflet](https://leafletjs.com/) - for our mobile-friendly interactive maps

### License
Open Source under MIT License
