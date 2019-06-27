# Form Builder

This has been a college project. 

## Requirements

There are 3 types of form inputs. 
Each of these can also have sub-inputs which will only show
when the parent input is answered a certain way.

The types of conditions are as follows
+ Text
+ Equals - Text entered is equal to this value
+ Number
+ Equals - Number entered is equal to this value
+ Greater than - Number entered is greater than this value
+ Less than - Number entered is less than this value
+ Yes / No (radio)
+ Equals - Radio selected is equal to this value (either yes or no)

The user should be able to keep creating sub-inputs with conditions 
to as many levels deep as they would like. 
Each sub-input’s condition will correspond to the 
value of the parent input. By default, the create tab should 
start out blank with just the Add Input button there 
for the user to create their first input.
This should be stored in theIndexedDB for persistence and loaded at page load.

Technical Requirements
The project should store a persistent state for the form objects in the IndexedDB as we aren’t using a backend or any external APIs. The entire app will live on the front-end without a backend.

The final deliverable should be a github repo that should contain everything
needed to easily run the project locally with a few commands (yarn install, yarn start) and view the result at localhost.

You may use webpack, browserify, or any similar library for easily running your project. Feel free to use a boilerplate setup as well so you can get to the actual development as soon as possible. You may use either Angular or React with either JSX, Typescript, or ES.Next.

## Build with

+ Angular
+ Bootstrap
+ JQuery
+ SASS
+ firebase
+ webpack
