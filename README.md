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
  

Development
---
Want to contribute? Great!

If you're new here, please use `yarn` as your package manager *instead* of `npm`, and use `yarn install` or `yarn` to install all dependencies.

Please branch off of `develop` if you're working on new features.

Build & Deployment from scratch
--
Pre-requisite: Be added to the Firebase project if not already

1. Clone github repo
2. Run: yarn install
3. Create a .env file at the root project directory level, populate it with our Tripetto api token (not kept in src control)
4. Run: yarn deploy

How to Contribute
---

I'm really glad you're reading this because we need volunteer developers to help this project come to fruition.


1. File an issue to notify the maintainers about what you're working on.
2. Fork the repo, develop and test your code changes, add docs.
3. Make sure that your commit messages clearly describe the changes.
4. Send a pull request.

File an Issue
----------------------------------

Use the issue tracker to start the discussion. It is possible that someone
else is already working on your idea, your approach is not quite right, or that
the functionality exists already. The ticket you file in the issue tracker will
be used to hash that all out.

Style Guides
-------------------
Coming soon...

Fork the Repository
-------------------

Be sure to add the relevant tests before making the pull request. Docs will be
updated automatically when we merge to `master`, but you should also build
the docs yourself and make sure they're readable.

Make the Pull Request
---------------------

Once you have made all your changes, tests, and updated the documentation,
make a pull request to move everything back into the main branch of the
`repository`. Be sure to reference the original issue in the pull request.
Expect some back-and-forth with regards to style and compliance of these
rules.

## Reporting issues & features requests

If you notice any bugs in the app, see some code that can be improved, or have features you would like to be added, please create a [bug report] or a [feature request]!

If you want to open a PR that fixes a bug or adds a feature, then we can't thank you enough! It is definitely appreciated if an issue has been created before-hand so it can be discussed first.

## Working on issues

Please feel free to take on any issue that's currently open. Feel free to resolve any issue that you would enjoy working on even if it happens to be a low priority.


### Tech

COVIDx uses a number of open source projects to work properly:

* [React](https://reactjs.org/) - for our frontend
* [Formik](https://jaredpalmer.com/formik) - for building our forms
* [Flask](https://flask.palletsprojects.com/) - for our backend
* [Leaflet](https://leafletjs.com/) - for our mobile-friendly interactive maps

And of course COVIDx itself is open source under a MIT license.


## COVIDx API
We also have a backend server that you can make API calls to if you are building features here. Right now, it's pretty barebones - user data, survey data, and location data are what's available. If there are any requests, please feel free to ask!

More details will be coming soon.




License
----

MIT
