JaJa Party Rental

Introduction 
Jaja party rental is a place where you can rent all the equipment for your party! you can crate your own package, and view the previous one.


Installation 

Before you can run the app with nodemon server.js, install the dependencies: Node.js and npm on your computer.

Documentation on downloading and installing Node.js and npm. To begin, navigate on the project directory (after you have downloaded or cloned this repository) and run:

npm install
Then, while in the project directory, you can run:
nodemon server.js
Nodemon is a tool that helps develop Node.js based apps by automatically restarting and developing when any changes are detected.
To use, simply replace the word node on the command line when running your script.
To install: npm install -g nodemon

User Stories

User will be able to sign up, sign in, sign out and change password.
User will create a package and be able to update and delete it.

API Routes
User Authorization Routes
HTTP Method	URL Path	Result	Action
POST	/sign-up	create rental	create
POST	/sign-in	get single rental	show or retrieve
DELETE	/sign-out	delete rental	destroy
PATCH	/change-password	update password	update
Profile Routes
HTTP Method	URL Path	Result	Action
GET	/rentals	read list of rentals	index or list
GET	/rentals/:id	read single rentals	show or retrieve
POST	/rental	create rental	create
PATCH	/rentals/:id	update rentals	update
DELETE	/rentals/:id	delete rental	destroy

Technologies Used
Libraries	Languages	Frameworks	Database	Version Control	API
React.js	HTML	Express	MongoDB	GitHub	Ghibli Studio API
Axios	Javascript	BootStrap			
Mongoose	CSS			

![App Wireframe](https://i.imgur.com/xLLKtko.png)

![App ERD](https://i.imgur.com/iCemSKW.png)


Links to Deployed Sites:

https://ranila10.github.io/JaJa-Party-Rental/

https://github.com/Ranila10/JaJa-Party-Rentalb
https://dashboard.heroku.com/apps/desolate-ravine-55235