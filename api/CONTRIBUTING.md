# Contributing Guidelines
This doc defines a set of rules and protocols that must be strictly followed while contributing to this repository.

## 1. Commit messages

* Use the `-m` flag only for minor changes. The message following the `-m` flag must be of the below format : 
  > `<Verb in present tense> <Action>`
  
  :white_check_mark: __Examples of valid messages:__
  * Added routes/routes.js file 
  * Update utils/validator.js file
  * Change functionality of authentication process
  
  :x: __Examples of invalid messages:__
  * Routes.js has been updates
  * Almost finished testing
  * All changes done, ready for production :))
  
* Before opening a PR, make sure you squash all your commits into one single commit using `git rebase` (squash). Instead of having 50 commits that describe 1 feature implementation, there must be one commit that describes everything that has been done so far. You can read up about it [here](https://www.internalpointers.com/post/squash-commits-into-one-git).
> NOTE: While squashing your commits to write a new one, do not make use of `-m` flag. In this case, a text editor window shall open. Write a title for the commit within 50-70 characters, leave a line and add an understandable description.

## 3. Issues

* Issues __MUST__ be opened any time the following events occur : 
  1. You encounter an issue such that a major (50 lines of code or above) portion of the code needs to be changed/added.
  2. You want Feature enhancements
  3. You encounter Bugs
  4. Code refactoring is required
  5. Adding more tests
* __Open issues with the given template only.__
* Feel free to label the issues appropriately.
* Do not remove the headings (questions in bold) while opening an issue with the given template. Simply append to it.

## 4. Branches and PRs

* No commits must be made to the `master` branch directly. The `master` branch shall only consist of the working code.
* Developers are expected to create new branches, and upon successful development and testing, a PR (pull request) must be opened to merge with master.
* A branch must be named as either as the feature being implemented, or the issue being fixed. 

  :white_check_mark: __Examples of valid brach names:__
  * #8123 (issue number)
  * OAuth (feature)
  * questionsUtils (functionality of the questions)
  
  :x: __Examples of invalid branch names:
  * John
  * TajMahal
  * SomethingRandom
  * Pizza

## 5. Project Structure
This code repository must __strictly__ follow the below project structure and organisation :

```
  |-/
    |- /controllers
          |- controller1.js (example file name)
          |- controller2.ks
          ...
    |- /middlewares
          |- middlerware1.js (example file name)
          |- middleware2.js
          ...
    |- /routes
          |- route1.js (example file name)
          |- route2.js
          ...
    |- /tests
          |- test1.js (example file names)
          |- test2.js
          ...
    ....
```

> You can add more folders under `/` if required, as long as the files under it are organised semantically according to its functionality

## 6. Coding ethics

* It is recommended that developers add comments wherever necessary. 

  __The code must be self-documented__.

  For more info, click [here](https://stackoverflow.com/questions/209015/what-is-self-documenting-code-and-can-it-replace-well-documented-code) (recommended)

* Follow the [airbnb](https://github.com/airbnb/javascript) JavaScript style guide.
