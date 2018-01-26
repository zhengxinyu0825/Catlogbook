# READ ME

![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/catlogbook_logo.png)

## Introduction 

CatLogBook will be a new app and website for cat lovers. It will be available on both the Android and IOS platforms. Through registering a new account, these users can type in basic information about their cats including cat name, type, sex, age, etc. This system has some fundamental functions, such as storing and tracking cat's medical treatment record, writing logs for cats to record daily behaviours and activities, and gain more information and tips on cat caring. In addition, based on the weekly discussion between our project team and the client, we will create some more innovative and pragmatic features to meet our clients requirements, such as sharing experience online with others and getting medical tips or guidance from professional veterinarians. We expect to build a meaningful app that enlighten cat lovers life and record every detail that happens between you and your lovely pets, and also collect more useful data for researchers to do further researches.

## Tools
Ionic, Karma, Karma-Jasmine, PhantomJS, Bitbucket


## Table of Contents

## Executive Summary - Catlogbook

 ### 1. Introduction

 * 1.1  Problem Statement

 * 1.2 Solution

 ### 2. Overview of System**

* 2.1 Users

* 2.2 Administrators


 ### 3. Evaluation**

* 3.1 Overview

* 3.2 Acceptance Testing

* 3.3 Unit Testing

* 3.4 Usability Testing

* 3.5 Conclusion

 ### 4. System Structure Overview**

* 4.1 System Architecture

* 4.2 Database Schema

 ### 5. System Tools**

* 5.1 Ionic (Main framework)

* 5.2 Karma, Karma-Jasmine and PhantomJS (Testing propose)

* 5.3 Bitbucket and sourcetree (Source code management) 

* 5.4 Programming language

* 5.5 Technology


 ### 6. Information search**

* 6.1 Research on software

* 6.2 Evaluations of software

* 6.3 Literature found on the web or digital library



 ### 7. Reflection**

* 7.1 Challenge and Risk 

* 7.2 Limitation in terms of functionality 

* 7.3 Limitation in terms of structure, design, implementation 

* 7.4 Primary Strength 

* 7.5 Programming Practices  




 ## Appendices 

 ### A1. User Stories

 ### A2. Project Status Reports

 * Project Status Report Week 3

 * Project Status Report Week 4

 * Project Status Report Week 5

 * Project Status Report Week 6

 * Project Status Report Week 7

 * Project Status Report Week 8

 * Project Status Report Week 9

 * Project Status Report Week 10

 * Project Status Report Week 11

 * Project Status Report Week 12

 * Project Status Report Week 13

 ### A3. Schedule Sprint

 ### A4. Week 13 Presentation

 ### A5. Week 13 Demo Video


## 1. Introduction 

### 1.1 Problem Statement

* Cats are one of the most popular pets. In recent years, the number of cat owners have significantly increased. However, no matter new owners or experienced owners, only few of them have the habit that records the daily activities and medical treatments of their cats[JM Scarlett, 2002]. It brings difficulties to vets to accurately keep track of a cat's information. The reason why most owners do not like to do this is that this activity is boring and time consuming. Hence we need to figure out a way to make this process interesting and simple.
* Veterinary scientists are now looking for a method that can collect big data about cats in a continuous way. Collected data will be used for further scientific research.

### 1.2 Solution

The Faculty of Veterinary Science at the University of Sydney has developed an application called Doglogbook to solve similar problems happened to dogs. Hence, our initial solution is to use the Doglogbook code provided by client Sophie Master to build a similar application for cats.

In addition, we are required to do some upgrades. Firstly, users should be able to upload videos and pictures of their cats. Users should have completely control on the privacy permission of these pictures and videos.

Hence, this project is aiming to build an application that maintains all Doglogbook's features and with customised UI and additional functions.


## 2. Overview of System

### 2.1 Users

Catlogbook aims for three kinds of users,which are

1. Cat owners who are willing to record daily activities of their cats.
2. Vets who requires to be aware of detail information of cats.
3. Researchers who wants to collect data about cats for science propose.

### 2.2 Administrator
      
Sophie Master and her teams will be administrators.

### 2.3 User Stories

#### Completed user stories Check Appendix Section


## 3.Evaluation
### 3.1 Overview
#### We conduct three types testing in total including acceptance testing, unit testing and usability testing. In the section below we will talk about each testing in details.

### 3.2 Acceptance testing
#### Acceptance testing usually involves black-box testing[Randell, Brian 1975]. They are related to user stories. We will pass the test case if we meet the client requirement and if the tests failed, the consequence will be recorded and changes will be made to fulfil the clients' needs.  
#### Below is the acceptance test we made
|Priority|Requirements|Acceptance test|Status|Reasons For Fail (if any)|
|--------|------------|-------------------|------|-------------------------|
|High    |Create an account which can be used to log in|1.1 After users fill in their detail and click the confirmation link, users are able to log in with the account they just created|Pass|
|        |            |1.2 Users can't create account if they enter the wrong email address or if they didn't fill in the details|Pass|
|Medium  |Users can change the profile of their cats, so that they can update their cats' name, age and breeds and some other details of their cats.|2.1 Users are able to change their cats status through app or web page and the changed will be saved|Pass|
|High    |Users can upload some lovely photos and videos of their cats|3.1 Users can choose picture and video from their computer or mobile to upload and Uploaded picture will be shown on the section Called "Gallary"|Fail|No access to the database|
|        |            |3.2 Users can't upload image and video which are beyond 20mb|Fail|No access to the database|
|Medium  |Users can find guide about how to use this apps|4.1 User can find the "User Guide" in the app and are able to use the app with the help of the guide|Pass|
|High    |Users can add new behavior of their cats to record when and what their cats does during the day|5.1 Users can add in behaviours through the app and the behaviours are stored in the database|Pass|
|High    |Vet can check what medicine the cats have taken before|6.1 Vet can check the status and medical information through the dashboard|Pass|
|High    |Users can get a bit of advanced information on why their cat is behaving unwell|7.1 Users can click the "medical tips" at the sidebar and get useful tips from the app or the web|Pass|
|High    |Vets add a questionnaire in the app, so that cat owners can diagnose their cats first through these self-diagnosed questions|8.1 User can find "Q&A" section in the sidebar and do a self-diagnosed firstly before looking vets for help|Pass|
|High    |Users can find information about hospital on the web|9.1 User can click the "Find Vet" in the sidebar and contact detail and information about the hospital will pop up|Pass|
|High    |Users can provide feedback about app and web|10.1 Users can find "Contact us" section in the sidebar and write their comments. Comments will be sent to us through email|Pass|
|High    |Users can set permission to prevent other users from viewing personal details|11.1 After users set their account to privacy, other users will not be able to see their  details|Fail|No access to the database|
|Medium  |Users can share cat’s status on Facebook|12.1 Users can link to their Facebook account and using app to post|Fail|Technical issue on implementing Facebook API|
|High    |Users can reset their password if they forgot their password|13.1 Users click "FORGOT PASSWORD" button, an email will be sent to users' registered email address and users can reset their password by following the instructions|Pass|  


### 3.3 Unit testing
#### We conduct the unit testing using karma-jasmine. For the functions that have been implemented in the project, unit tests are designed according to each function. For the function we have tested, we have list them in the following table:
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204614%402x.png)

### 3.4 Usability testing
#### We have conducted a survey which interviewed 40 University Of Sydney students(half male and half female). Overall, our application achieved an expected outcome. Most of people are satisfied with our application. Only a few people think our app is not that good since they do not like our interface and they think apps have slow response speed. However, since the survey was conducted after the final delivery, we are lacking time to make changes. Some of the related results are list below(questions about personal details are discarded):
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204626%402x.png)
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204639%402x.png)
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204651%402x.png)
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204703%402x.png)
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204713%402x.png)


### 3.5 Conclusion
####In every project, it is necessary to test after modifying and adding in new functionality. This is done to ensure the current system can run smoothly and bug-free. For this project, we conduct unit testing through karma, acceptance testing and usability testing through interviewing students. Overall, the test results is expected and we have achieved the target we set at the beginning of the project. The only limitation we have is that all testing run offline and therefore we have no clue about its performance online.


## 4.System Structure Overview

### 4.1 System Architecture 
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-204806%402x.png)
#### Figure 4.1.1 System architecture of the Catlogbook applications.
#### The above diagram shows the current system architecture. The system can be accessed through web and mobile app. The user can login via the web dashboard or via their mobile app. Server will process the users’ request and retrieve related data from database. Currently, we are working on the front-end which is web and app in the system structure.

### 4.2 Database Schema
We have no access to the database and therefore cannot make any changes.


## 5. System Tools

### 5.1 Ionic (Main framework)
#### We decided to use ionic framework as our system tools. It is because ionic can be used to build native-feeling cross platform application using HTML, CSS and JavaScript and it is fulfilling the client requirements which require a cross-platform application [ionic.com 2017]. Furthermore, since we are given a base code to start the project. It is easier for us to modify and deploy our version correctly. Finally, ionic framework provides a range of functionality for the programmer to see the results in the browser.


### 5.2 Karma, Karma-Jasmine and PhantomJS (Testing propose) 
#### We are using the above tools to test functionalities we created in the ionic framework. With the help of karma, we can save the time on opening the ionic server again and again. Since they just open a browser and tell us which functionality went wrong and which functionality passed [PhantomJS.com 2017]. They help us to visualise the effect of each functionality and debug efficiently. Meanwhile, they are easy to implement and doesn’t change the system layout while doing the test.


### 5.3 Bitbucket and sourcetree (Source code management)
#### We have 6 people in our team and we might be working on different parts of the project at the same time. Hence, bitbucket is used here as a version control tool. It allows us to create, modify and merge multiple branches of our code’s development. Furthermore, sourcetree is also used to visualise the commit and merge action. It helps us to keep all the commits in order.


### 5.4 Programming language
#### Since we are working on a web-based project, HTML, CSS and JavaScript will be the main programming language. JavaScript will also be used for testing propose. However, since we still do not have access to the database, we believe SQL and C# will be used for connecting and modifying the database in the future stage.


### 5.5 Technology
* Programming language: [JavaScript](https://en.wikipedia.org/wiki/JavaScript), [css](https://en.wikipedia.org/wiki/Cascading_Style_Sheets), [html](https://en.wikipedia.org/wiki/HTML), [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language))
* Programming framework: [.NET Framework](https://en.wikipedia.org/wiki/.NET_Framework)
* Database tool: [MySQL](https://en.wikipedia.org/wiki/MySQL)
* UI design: [Visual Studio](https://en.wikipedia.org/wiki/Microsoft_Visual_Studio), [Xcode](https://en.wikipedia.org/wiki/Xcode), [Android Studio](https://en.wikipedia.org/wiki/Android_Studio)



## 6.Information Search

### 6.1 Research on software/concepts

**6.1.1 Research on database**
#### All data exchange in our project depends on the use of the database, so understanding the database is crucial to our successful project development. A database is an organized collection of data. A relational database, on the other hand, is a collection of schemas, tables, queries, reports, views, and other elements. Database designers typically organize the data to model aspects of reality in a way that supports processes requiring information, such as (for example) modelling the availability of rooms in hotels in a way that supports finding a hotel with vacancies[Carlos C. 
 2000].

#### In the project, we used a DBMS system for building and managing the available databases and their computational logic. A database-management system (DBMS) is a computer-software application that interacts with end-users, other applications, and the database itself to capture and analyze data. A general-purpose DBMS allows the definition, creation, querying, update, and administration of databases. Well-known DBMSs include MySQL, PostgreSQL, EnterpriseDB, MongoDB, MariaDB, Microsoft SQL Server, Oracle, Sybase, SAP HANA, MemSQL, SQLite and IBM DB2.

#### Existing DBMSs provide various functions that allow management of a database and its data which can be classified into four main functional groups:

####
	•	Data definition – Creation, modification and removal of definitions that define the organization of the data.
	•	Update – Insertion, modification, and deletion of the actual data. 
	•	Retrieval – Providing information in a form directly usable or for further processing by other applications. The retrieved data may be made available in a form basically the same as it is stored in the database or in a new form obtained by altering or combining existing data from the database. 
	•	Administration – Registering and monitoring users, enforcing data security, monitoring performance, maintaining data integrity, dealing with concurrency control, and recovering information that has been corrupted by some event such as an unexpected system failure.

#### We use these features extensively in our projects, and dozens of such operations behind almost every feature to ensure the proper flow of information.

#### Taxonomy trees also have specific restrictions on them that make them easier to store. Trees have a fixed maximum depth with each level having a specific name associated. Additionally for a given branch, each node in the path has a known value (no value is still a known value e.g. infraclass is not often used so no value is given), which means back filling is possible and searching does not need to account for unknown values.

#### Adjacency lists:

#### Each record holds a parent entry that is a foreign key to the same table. Nodes essentially hold a link to their parent.

#### Pros: Allows storing forests, each root has Null parent; Changing the parent of a sub tree is fast as only the parent link needs changing; Adding new entries is fast; Stores minimal duplicate data; Trees can be arbitrary depth (although that is not needed in this case since taxonomy trees have fixed depth)

#### Cons :Finding the children of a parent is slow;Finding an entire branch requires recursive SQL calls which have very poor performance; In general this tree structure is write fast, but read slow, making it unsuitable for this application were the tree will be frequently read from but less frequently written too.

#### Full Paths:
#### Each record, stores an entire branch with an entry at each level. 
#### Pros: Reasonably fast writing, adding a new branch is adding a new record; Finding all nodes on a path is very fast; Finding the parents or children of a node is fast; If a certain level is searched often e.g. family then that layer can be indexed to improve performance.

#### Cons:If a change to a branch needs to be propagated to other records e.g. Consider two branches that have the same path for 3 layers, before splitting. If the parent at level 3 changes, then the parent of all other branches should change as well. e.g. one branch can't change to have a marsupial as a reptile and as a mammal; Some duplicate data is kept; This tree structure is very read fast and easily can be improved with indices. Writing new branches is also quick as well as searching nodes on paths for back-filling; The main performance penalty is changing the parent of a node, however this operation happens very rarely as is only occurs if an animal is reclassified so this will rarely impact performance.

#### Inaddition, the next task of our project is to produce a conceptual data model that reflects the structure of the information to be held in the database. A common approach to this is to develop an entity-relationship model, often with the aid of drawing tools. Another popular approach is the Unified Modeling Language. A successful data model will accurately reflect the possible state of the external world being modeled. 

#### Modelling is a process which create data model that determines the logical structure of a database and fundamentally determines in which manner data can be stored, organized, and manipulated. The most popular example of a database model is the relational model (or the SQL approximation of relational), which uses a table-based format.
Common logical data models for databases include:

#####
	•	Navigational databases
	•	Hierarchical database model
	•	Network model
	•	Graph database
	•	Relational model
	•	Entity–relationship model
	•	Enhanced entity–relationship model
	•	Object model
	•	Document model
	•	Entity–attribute–value model
	•	Star schema

#### Database languages are special-purpose languages, which do one or more of the following:
#####
	•	Data definition language – defines data types such as creating, altering, or dropping and the relationships among them
	•	Data manipulation language – performs tasks such as inserting, updating, or deleting data occurrences
	•	Query language – allows searching for information and computing derived information




**6.1.2 Research on Web app structure**
#### In computing, a web application or web app is a client–server computer program in which the client (including the user interface and client-side logic) runs in a web browser. Common web applications include webmail, online retail sales, online auctions, wikis, instant messaging services and many other functions.

#### The general distinction between a dynamic web page of any kind and a "web application" is unclear. Web sites most likely to be referred to as "web applications" are those which have similar functionality to a desktop software application, or to a mobile app. HTML5 introduced explicit language support for making applications that are loaded as web pages, but can store data locally and continue to function while offline. Single-page applications are more application-like because they reject the more typical web paradigm of moving between distinct pages with different URLs. Single-page frameworks like Sencha Touch and AngularJS might be used to speed development of such a web app for a mobile platform.

#### There are several ways of targeting mobile devices when making a web application. This is in line with our practice in the Catlogbook project, which consists of two parts: a mobile application and a web-based page: 

#### Responsive web design can be used to make a web application - whether a conventional web site or a single-page application viewable on small screens and work well with touchscreens.
Progressive Web Apps are a hybrid of regular web pages (or websites) and a mobile application.

#### Native apps or "mobile apps" run directly on a mobile device, just as a conventional software application runs directly on a desktop computer, without a web browser (and potentially without the need for Internet connectivity); these are typically written in Java (for Android devices) or Objective C or Swift (for iOS devices). Recently, frameworks like React Native, Flutter and Xamarin allow the development of native apps for all platforms using languages other than each standard native language.

#### Through Java, JavaScript, DHTML, Flash, Silverlight and other technologies, application-specific methods such as drawing on the screen, playing audio, and access to the keyboard and mouse are all possible. Many services have worked to combine all of these into a more familiar interface that adopts the appearance of an operating system. General purpose techniques such as drag and drop are also supported by these technologies. Web developers often use client-side scripting to add functionality, especially to create an interactive experience that does not require page reloading. Recently, technologies have been developed to coordinate client-side scripting with server-side technologies such as ASP.NET, J2EE, Perl/Plack and PHP. Ajax, a web development technique using a combination of various technologies, is an example of technology which creates a more interactive experience.

##### Some related concepts for reference.
	•	Software as a service (SaaS)
	•	Web 2.0
	•	Web Engineering
	•	Web services
	•	Single-page application
	•	Ajax(programming)


**6.1.3 Research on Ionic (mobile app framework)**

#### Ionic is a complete open-source SDK for hybrid mobile app development.The original version was released in 2013 and built on top of AngularJS and Apache Cordova. The more recent releases, known as Ionic 2 or simply "Ionic", are built on Angular. Ionic provides tools and services for developing hybrid mobile apps using Web technologies like CSS, HTML5, and Sass. Apps can be built with these Web technologies and then distributed through native app stores to be installed on devices by leveraging Cordova. Ionic was created by Max Lynch, Ben Sperry, and Adam Bradley of Drifty Co. in 2013. In addition, Ionic Creator is a drag-and-drop interface building tool.

#### Ionic provides all the functionality which can be found in native mobile development SDKs.Users can build their apps, customize them for Android or iOS, and deploy through Cordova. Ionic includes mobile components, typography, interactive paradigms, and an extensible base theme. Using Angular, Ionic provides custom components and methods for interacting with them. One such component, collection repeat, allows users to scroll through a list of thousands of items without any performance hits. Another component, scroll-view, creates a scrollable container with which users can interact using a native-influenced delegate system.

#### This is an example shows how to introduce ionic into html file.
```
#!html

<ion-content>
</ion-content>

```
#### We used following methods as examples to import the libraries of ionic:
```
#!html

$ionicScrollDelegate.scrollTop();
$ionicScrollDelegate.scrollBottom();
$ionicScrollDelegate.zoomTo(1.5);
$ionicScrollDelegate.getScrollView();

```
#### Besides the SDK, Ionic also provides services that developers can use to enable features, such as push notifications, A/B testing, analytics, code deploys, and automated builds.Ionic also provides a powerful command-line interface (CLI), so developers can get started with creating a project with a simple command. The CLI also allows developers to add Cordova plugins and additional front-end packages, enable push notifications, generate app Icons and Splash screens, and build native binaries.

##### Some related dependencies
	•	npm module
	•	Nodde.js

### 6.2 Evaluations of software/technical concepts

#### We used a widely used standard evaluation method to report and evaluate software. A criteria-based assessment gives a measurement of quality in a number of areas. These areas are derived from ISO/IEC 9126-1 Software engineering — Product quality and include usability, sustainability and maintainability.The assessment involves checking whether the software, and the project that develops it, conforms to various characteristics or exhibits various qualities that are expected of sustainable software. The more characteristics that are satisfied, the more sustainable the software.

**6.2.1 Evaluation of ionic architecture**
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-205129%402x.png)

**6.2.1 Evaluation of Visual Studio Code editor**
![img](https://github.com/zhengxinyu0825/Catlogbook/blob/master/catlogbook/image/WX20180126-205140%402x.png)

### 6.3 Literature found on the web or digital library

#### Our main source of documentation is the official documentation for software or technology products, the e-library and the developer community. The literature from the official website of the product is very comprehensive and provides us with strong technical support. In our development process, almost one hundred Sixty percent of the problems can be solved by consulting official technical documentation. The literature in the e-library can often give me some help with design ideas and what we need, and we have learned from these articles about the development of web apps When we are confronted with difficult problems that can not be defined, we will go to some developer communities for technical support, because these issues are encountered by other developers in the development process, so the solution they give They have strong reference value. 
#### Below, we list some sources of literature and the literature we have found. To distinguish them from the reference part of this report, we provide links behind them.

#### Ionic Documentation - Ionic Framework (includes every thing developers need to know about how to get start with ionic) :

Introduction of Installation: [link](https://ionicframework.com/docs/intro/installation/)

Introduction of Deploying to devices: [link](https://ionicframework.com/docs/intro/deploying/)

Introduction of Migration Concepts: [link](https://ionicframework.com/docs/intro/migration/)

Tutorial of Ionic deeper development: [link] (https://ionicframework.com/docs/intro/tutorial/)


ionic API Docs: [link] (https://ionicframework.com/docs/api/)


Tutorial of Ionic Storage system: [link] (https://ionicframework.com/docs/intro/tutorial/)


#### ionic Developers Forum (the community of ionic developers, where contains of thousands of discussion and posts) :

Discussion of general ionic issues: [link](https://forum.ionicframework.com/c/ionic)

Discussion ngCordova issues: [link](https://forum.ionicframework.com/c/ngcordova)

Discussion of ionic creater: [link](https://forum.ionicframework.com/c/ionic-creator)

#### IEEE Xplore Digital Library ( a digital library delivering full text access to the world's highest quality technical literature in engineering and technology.) :

Web App Security: A Comparison and Categorization of Testing Frameworks: [link](http://ieeexplore.ieee.org/document/7819409/)

An Interface Design Secure Measurement Model for Improving Web AppSecurity: [link](http://ieeexplore.ieee.org/document/6103069/)

A Web-App Auto-Testing System Based on Test-Flow and Control Constraints: [link](http://ieeexplore.ieee.org/document/4722148/)

Integration of HTML tables in web pages: [link](http://ieeexplore.ieee.org/document/7436985/)

#### Google Books( A service from Google Inc. that searches the full text of books and magazines that Google has scanned, converted to text using optical character recognition (OCR), and stored in its digital database) :

HTML and CSS: Design and Build Websites: [link](https://books.google.com.au/books?id=blCyf8XF41sC&printsec=frontcover&dq=html&hl=en&sa=X&ved=0ahUKEwj75_WRxKHXAhWLWLwKHYONBgQQ6AEIKTAA#v=onepage&q=html&f=false)

Beginning Web Programming with HTML, XHTML, and CSS: [link](https://books.google.com.au/books?id=cCYDj6vEReAC&pg=PT48&dq=html&hl=en&sa=X&ved=0ahUKEwj75_WRxKHXAhWLWLwKHYONBgQQ6AEILzAB)

Ionic Framework By Example [link](https://books.google.com.au/books?id=LQMcDAAAQBAJ&printsec=frontcover&dq=ionic&hl=en&sa=X&ved=0ahUKEwjC4IjDxKHXAhWDerwKHYA3BXwQ6AEIMTAB)

Mobile App Development with Ionic 2: Cross-Platform Apps with Ionic: [link](https://books.google.com.au/books?id=ZaWkDgAAQBAJ&printsec=frontcover&dq=ionic&hl=en&sa=X&ved=0ahUKEwjC4IjDxKHXAhWDerwKHYA3BXwQ6AEIPTAD)

#### In addition to these listed documents, we have also searched a large number of documents. For details, please see the references.





## 7.Reflection 

### 7.1 Challenge and risks ###

### 7.1.1 Challenge ###

1. Lack of knowledge about developing app
2. Unfamiliar with tools
3. Not sure if the database is modifiable

The biggest problem for our team is the weak knowledge of developing a IOS app by using ionic and angularjs, the base code which provided by our clients is too complex to us. To overcome this issue, we have done a lot of study and research in the first 2 weeks to understand the base code.
In order to get a better team work, we need to use some work platform system like bitbucket and slack. Some merge problems occur when we try to upload our work together. The bitbucket expert of that weeks will focus on keeping the code correct.  
The database which given by our clients is unmodifiable in the beginning. We cannot store our data in it. To overcome this, we keep contacting with our client for the permission of the database.
In conclusion, the biggest challenge problem we faced is our level of understanding and experience with ionic project, at the start of the project, none of the team have any prior experience of the technology, we need to do a lot of research and study to go through the base code and modify them.

###7.1.2 Risks ###
A. Misunderstanding of requirement from client/ new requirement from clients/ changing requirement during project.

B. Short timeframe for complex project.

C. Working with XP role methodology.

There might be some new requirements from our clients or misunderstand client’s requirement during the project, since the code is such complex for us, if this occur, we need to devote more time into develop the new features. However, the time constraint is not big enough to develop a fully completed applications, therefore, we may not satisfied all the requirements from the client perfectly on time. To avoid this issue, our manager of that weeks will consult with our clients and reach an agreement of the new features and changed features.
We are following the XP role methodology and rotated roles every week. However, the overlap will occur when some of our teammates did same work with others, therefore some part of project cannot be done due to ignoring it. To avoid this problem, we have a meeting on Monday’s lab every week, to assign the correct XP roles and related works to make sure everyone knows their works and role.


##7.2 Limitation in terms of functionality ##

* The Database is not accessible and unmodifiable.

After we built the upload photos and videos features, we noticed that the database which given by our clients is not accessible and modifiable. The data cannot be stored in the database. After we contact with our clients for a number of times. Our client arrange our team to meet with DoglogBook team and give us the permission of DoglogBook’s database to test our functionality. Therefore, the CatLogBook database is still cannot access and store. The only thing we can do for overcoming this issue is that the clients must give us the permission to access the catlogbook database.

##7.3 Limitation in terms of Structure, design, implementation ##

* Possible limitation on User Interface. 

The User Interface is simple and clear, but after we did a questionnaires survey for around 40 people, There are still around 35% people that unsatisfied with our user interface. It is possible that the percentage will increase if we take more questionnaires.

* Messy backend code 
 
Although we build all the features that clients asked, the code we wrote is hard to be further modified. If the code needs to be further implemented by other team in the future, it may take a lot of times to integrate.

##7.4 Primary Strengths ##

* Diversity

Our group are consist of 6 people with experienced coding skills, even though a lot of new technology are used for the first time but the team are all able to overcome any problem that we have encountered with the unfamiliar technology, because the number of member we have we are able to divide the team and allow members to work on the areas that they are more familiar and capable with, so there was a strength in diversity.

* Teamwork

We have established great communication and team work right from the first week when we have been assigned to the same project group. We almost have 2 meetings per weeks to sharing problems and opinion with each other. Therefore the new technical knowledge is easier for us to understand.

* Clients communication

Our clients and us have a great communication during this project. The opinions from both sides are interchanging frequently. The good communication between us is helpful for our working.

##7.5 Programming Practice ##

###7.5.1 Reflection on XP ###

For the time constraint given Extreme Programming appear to be the correct choice of programming methodology to use, though given the scope of our project the full project will require a larger number of developers with a more structured programming methodology, with a smaller team where frequent and concise communication is not an issue Extreme Programming can be very effective which will prevent any lost of information from using the full flexibility of an agile programming methodology.

###7.5.2 Version control, issue tracking, coding style ###

We mainly using bitbucket to merge uploading code and tracking any issues.To ensure that both work and information are updated to all members bitbucket are used for version control, the bitbucket expert are mainly focus on merge the code every week to avoid messy code.


###7.5.3 Group aspect, products and processes ###

We mainly use Ionic, angular and HTML to encoding our products. Since we have no experience on ionic project, we study together which make easier to understand the knowledge.


## A1. User stories ##

### Complete User Stories

##### As a <user,cat lovers/owners>
------------------------

1.<**I want to register an account, so that I get to log in and use this app.**>


**Priority level:** high


**Description:** This is an App, the first thing when a user open an App is to log in the system using his/her own username and password. So that users can manage their own account, and fill in all the related information in their account such as the profile of their cats. This is a very fundamental function.

**Test Script:** *Open the App -> In the Logging Page -> Click on the Register button -> Fill in all the info
-> Complete Registration*

------------------------

2.<**I want to edit my profile, so that other people can recognise me via my username and profile picture.**>

**Priority level:** medium

**Description:** This is another fundamental function. As long as you can log into the system using your own account, of course users are able to modify and edit their own profile informations. 

**Test Script:** *Log in -> Enter the Home page -> User the left hand side tool bar -> Click on Profile -> Save all the changes*

------------------------

3.<**I want to add a new behaviour/activity of my cat, so that I can record when and what it does today.**>

**Priority level:** high

**Test Description:** This is what Catlogbook wants to do, to record cats daily behaviours. This is also very important for researchers, they can collect all the users information about their cats behaviours. Also, researchers can use these data samples to continue their research on cat.

**Script:** *Open the dash board -> View all the registered cats -> Click the one you want to record its behaviour -> Select and fill in the info, like Activity Date, Location, Time, Rating, Behaviour Type and so on -> Save the log*

------------------------

4.<**I want to upload some lovely photos and videos of my cats, so that I can record their daily life and probably share it with researchers and vets.**>

**Priority level:** high

**Description:** This is the main requirement from our client, she wants us to implement a function that allows users to upload their cats photos and videos at any time. Sometimes, videos and photos can be more remarkable than normal logs and records.

**Test Script:** *Enter the Dashboard -> Click on Upload Image button -> Select photos or videos from your device or local server -> Complete the upload*

-------------------------

5.<**I want to set up the privacy settings for my cats profile, so that I can share my cat's information to the vet only and I don't want the others to see my cats profile.**>

**Priority level:** high

**Description:** Set up privacy permission is an important way to prevent users personal details from leaking. Sometimes users do not want the public to view their cats profile or personal profile, so that the client asked us to implement such function. Users can authorised a specific user to view his/her personal information.

**Test Script:** *Open the left hand side tool bar -> Select Permissions -> Choose the cat that you want to share with others -> Type in the person's email -> Complete setting permission function*

-------------------------

6.<**I want to use the Catlogbook website, so that I can manage my account when I can't access to my phone.**>

**Priority level:** high

**Description:** Catlogbook can not only be used on mobile devices but also can be used on websites. Some users would prefer to use PC rather than cell phones at home, and using website is easier to record, too. And also it is convenient for users who don't have phone by their side to user Catlogbook.

**Test Script:** *Enter the web address of Catlogbook -> Same functions can be used but a different interface*

-------------------------

7.<**I want to search for a cat among all my cats, so that I can save my time looking for its profile on my phone.**>

**Priority level:** medium

**Description:** When a user register lots of cats on his/her devices, this can be very annoying. Because you want to write logs for one of them, you have to find the specific cat's profile on your phone. In case this happens, we design a tool bar on top of the dashboard, so users can search their cats by using the cats name. 

**Test Script:** *Open the dashboard -> Type in the cat's name that you want to find -> Complete searching*

-------------------------

8.<**I want to look for more information about cats, so that I can learn how to take care of a cat.**>

**Priority level:** medium

**Description:** In order to let our users get to know more knowledge about cats, we design a Q&A section in our tool bar for acquiring more information. This section contains a lot of quick questions about cats, such as basic health care, illness and injury. Help user take a better care of their cats.

**Test Script:** *Open the left hand side tool bar -> Select Q&A section -> Search for the info you want to know*

-------------------------

9.<**I want to look for medical help, so that I can get a bit of advanced information on why my cat is sick or behaving unwell.**>

**Priority level:** high

**Description:** Pets health care is very important. The illness not only affects cats physical condition, but also affects owners mood. They will get panic when their cats are sick and do not know what to do. The good thing is, Catlogbook can help them search the nearest Vet hospitals and clinic via Google Map. There are details of the hospital like the contact info and address. 

**Test Script:** *Open the left hand side tool bar -> Select Vet -> Find one nearest hospital and take your cats their for professional treatment*

-------------------------

10.<**I want to record the food list of cats, so that I know what I have fed my cats on what day.**>

**Priority level:** medium

**Description:** Feeding is a very significant aspect for raising cats. As we all know, when you feed wrong food to your cats, some serious illness may happen on your cats. We design a feeding record function to record the food you feed your cats everyday at what time. Even though your cats are sick, the vet can quickly analyse what happen to your cats by viewing you feeding list.

**Test Script:** *Click on one cat's profile in Dashboard -> Select feeding -> Select the type of food your cat just eats -> Complete the process*

-------------------------

11.<**I want to look for more information about this app on website, so that I can tell whether it is suitable for me to use this app.**>

**Priority level:** medium

**Description:** When users firstly use this App, they need more time and guidance to get to know this App as quickly as they can. Hence, we have created a guidance section in the tool bar for new users. They will find all the useful operations of this App and teach them what things they can do in this App, just like a simple tutorial.

**Test Script:** *Open the tool bar -> Select User Guidance -> Go through the guidance and learn how to use this App properly*

-------------------------

12.<**I want to record my cats health status , so that when they are sick again I can show all the previous treatment they had to the vet.**>

**Priority level:** high

**Description:** Pets health care is so important and this function can help users record every single details of their cats health issues including symptoms and seizure.

**Test Script:** *Open dashboard -> Click on the cat you want to log -> Select Treatment status*

-------------------------

13.<**I want to add a new cat in my account, so that I can manage not only one of my cats at the same time.**>

**Priority level:** high

**Description:** Users can not only have one cat in their lifetime, for some of them, they may have a couple of cats at the same time. They can always add a new cat to their account and manage them at the same time.

**Test Script:** *Click More on Dashboard -> Select Add cat -> Fill in all the details and info about your new cat such as Sex, Age, Breed, Date of Birth, etc.*

-------------------------

14.<**I want to contact the developers, so that I can offer my precious advices to them about this App.**>

**Priority level:** high

**Description:** As developers, we would always love to hear from our users. They can send us anything they like to say about this App, and how they feel about it. Users feedbacks are very important and useful for us to improve and upgrade a better version for them to use in the future.

**Test Script:** *Open the tool bar -> Select Contact Us -> Enter your subject and comments -> Complete*

-------------------------

##### As a <user,vet>

-------------------------

1.<**I want to know what treatment this cat took before, so that I can diagnose and find a way to cure this cat.**>

**Priority level:** high

**Description:** 

-------------------------

2.<**I want to register as a special user type which is a vet account, so that I can communicate with all the cat owners and their have a look at their cats too.**>

**Priority level:** high

**Description:** This will be realised in future development as building bond between users and vets requires a large amount of works. What we currently can do is we have a function that can help users search for nearest pet clinics.

-------------------------

3.<**I want to add a sheet about cat diseases in the app, so that I can help cat owners to learn more about cat.**>

**Priority level:** high

**Description:** This is contained in the Q&A section in the left hand side tool bar. Vet users will be authorised to edit this section and keep it update from time to time.

-------------------------

4.<**I want to add a questionnaire in the app, so that cat owners can diagnose their cats first through these self-diagnosed questions.**>

**Priority level:** high

**Description:** Our client has provided us with a list of questions inside a questionnaire. These questions are not only for registration purposes but also for researching purposes.

-------------------------

5.<**I want to receive the photos and videos that the cat owners send me, so that I can have a look first and then give them some constructive advice before they can reach vet.**>

**Priority level:** high

**Description:** Photos and videos are able to upload using the upload function in the dashboard, users can view them whenever they want. And Vets in the future can have the access to the database to view the specific user's cats if they have health issues. This permits a remote consultation.

-------------------------

##### As a <user,researcher>

-------------------------

*<**I can collect the information of cats, like what they normally do when they are happy and sad, and what they do when don't feel really well, so that I can collect data for my research and study more about cats behaviours.**>

**Priority level:** high

**Description:** All the user info are stored in the database and will automatically shared with researchers. This is also our client's ultimate goal, to collect cats data through this App.

-------------------------

*<**I want to see a sharing function in this app, so that I can collect and analyse via these user data and sharing info, to finish my research on cats behaviour and pet's health issues.**>

**Priority level:** high

**Description:** By using the Set Permissions function in the Tool Bar, this can be realised for the researchers. They can all gain valuable results from Catlogbook users.

-------------------------

## A2. Project Status Reports ##


| Team Name     | Catlogbook Capstone                                                     | 
| ------------- |-------------------------------------------------------------------------| 
| Start Date    | Monday, 07/08/2017                                                      |
| End date      | Friday, 03/11/2017                                                      |
| Members       | Xinyu Zheng, Yiding Shi, Shuai Yuan, Yuanxi Zeng, Qiang Zeng, Yi Sun    |


### Project Status Report Week 3 ###

Monday, 14/08/2017

| Status Item          | Current Progress           | To do                    | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Initially meet with the client and get a further understanding of the Catlogbook. Set up the Bitbucket team and Slack team.     |Research the programming tools containing Augular and Ionic. Learn Git command to update the code. Set up a scope of users for the Catlogbook and user stories. Email the client for the next meeting.
| Major Issues   | Carefully record the meeting note at the next time. Difficult with the Augular and Ionic.     |Get a basic code about the Doglogbook. Learn the development environment and the structure of code.|
| Major Challenges       | Our group has no experience with the development project.     |Learn Git command line. Run the Doglogbook code.|
| Recorded Effort    | 2 hours     ||



### Project Status Report Week 4 ###

Monday, 21/08/2017


| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Run the Doglogbook code using Angular and Ionic in the command line. Meet the client again to get access to the Catlogbook database. Set up the development environment. Allocate the XP roles for the next week.     |Consider the needs of the potential users. Write the user stories. Design the wireframe of the website and app of the Catlogbook. Set up the repository. Prepare the first demonstration and the presentation.|
| Major Issues   | Some operations on the Catlogbook database. Use the Git command to upload the code to the BItbucket.     |Ignore the necessary needs for a scope of users. Some unexpected bugs when uploading codes.|
| Major Challenges        | Some bugs will appear due to the different versions of tools containing Pip, Gulp, Browse and Ionic.    |Add some new or creative features for the Catlogbook.|
| Recorded Effort    | 4 hours     ||

### Project Status Report Week 5 ###

Monday, 28/08/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Write an initial user story. Design the layout of the homepage. Achieve the login feature.     |Allocate the XP roles for week 5. Finish the first demonstration. Achieve the layout of the homepage. |
| Major Issues   | It is difficult to create a branch using Git command line rather than the SourceTree. Our group spends much time on it.     |The use of CSS style, HTML and JavaScript.Design the sidebar on the home page and combine the back-end with the front-end.|
| Major Challenges        | A potential risk is to merge others code.     |Refer to merge others code. |
| Recorded Effort    | 8 hours     ||

### Project Status Report Week 6 ###

Monday, 04/09/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Implement the login feature containing registering, login, and changing the password. Achieve the homepage containing the sidebar and the layout.     |Get the demonstration feedback from the tutor. Write the User Guidance and recording user stories. Achieve User Guidance feature. Add the recording function including reporting, behaviors and health.|
| Major Issues   | Click the button on the sidebar to transfer the other page. Embed the CSS style and JavaScrip function in the HTML file.     |The implementation of the back-end on these functions. Transfer between pages.|
| Major Challenges        | Merge three different version on the Bitbucket.     |Merge others branches into the master.|
| Recorded Effort   | 10 hours     ||

### Project Status Report Week 7 ###

Monday, 11/09/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Design the homepage of the Catlogbook. Accomplish the functions of User Guidance and recording for behavior and health.     |Usability tests on the current features. Think about new creative features.|
| Major Issues   | Create branches in the master.     |Merge other versions into the master.|
| Major Challenges        | Provide creative features for the Catlogbook.     |Security on the database.|
| Recorded Effort    | 10 hours    ||

### Project Status Report Week 8 ###

Monday, 18/09/2017

| Status Item          | Current Progress           | To do  |  
| ------------- |---------------| -------------------------|
| Major Deliverables  | Finish usability tests on the current features. Successfully merge different versions into the master.     |Add uploading video or photo function. Design the new UI. Review the progress of the Catlogbook.|
| Major Issues   | Meet with the client for the current progress and record carefully everything and check anything we were unsure about with clients.     |Problems about the format of the video or photo on the database.
| Major Challenges        | Difficultly upload video or photos on the Catlogbook.     |Change the attribute format on the database.|
| Recorded Effort   | 10 hours   ||

### Project Status Report Week 9 ###

Monday, 25/09/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
|Major Deliverables   | Complete the expected functions of video or photo.     |Add the Vet feature to make users search for the nearby hospital according to the current location and the question and answer page where users can find some medical tips on it. Deploy an initial set of user stories and current progress to the client. Prepare for the demonstration to the client.|
| Major Issues   | Download the merged version on the Bitbucket and rerun the relevant command lines to set up the new version.      |API on Google map is not easy to acquire.|
| Major Challenges        | Insert external API, such as Google map.     |N/A|
| Recorded Effort    | 8 hours     ||

### Project Status Report Week 10 ###

Monday, 09/10/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Achieve the Vet feature and Q & A function.      |Achieve Contact Us feature page where users can provide feedback on the catlogbook for developers. Add the search bar in the homepage which users can search a certain cat. Review the current system.|
| Major Issues   | The client cannot meet with us because of the mid-break. We implement the deployment online.     |Complex operations on the database. Differences between exact matching and fuzzy matching.|
| Major Challenges        | Set the Google map API and find relevant medical tips about the cat.    |N/A|
| Recorded Effort   | 6 hours     ||

### Project Status Report Week 11 ###

Monday, 16/10/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Achieve the creative features before.     |Work on the final stages of the Catlogbook. Reflections on Extreme Programming.|
| Major Issues   | Match the input keywords with your own cats’ name.     |Merge all achieved functions on the Bitbucket.|
| Major Challenges        | N/A     |Conflict when merging codes. |
| Recorded Effort    |4 hours||

### Project Status Report Week 12 ###

Monday, 23/10/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
|Major Deliverables   | All expected features are implemented.      |Prepare the final deployment to the client. Prepare for the presentation slides. Do the demo video.|
| Major Issues   | Discussion the finished system with team members.    |N/A|
| Major Challenges        | N/A     |N/A|
| Recorded Effort    |2 hours    ||

### Project Status Report Week 13 ###

Monday, 02/11/2017

| Status Item          | Current Progress           | To do  | 
| ------------- |---------------| -------------------------|
| Major Deliverables   | Accomplish the presentation and demonstration. Provide the related documentation to the client and do the final deployment.     |Finish the final group and individual report.|
| Major Issues   | Provide the further help to the students who study this unit next year.     |N/A|
| Major Challenges        | N/A     |N/A|
| Recorded Effort    | 2 hours     ||

## A3. Schedule Sprint ##

![WX20171103-115557@2x.png](https://bitbucket.org/repo/645Bbzg/images/1713050325-WX20171103-115557@2x.png)

## A4. Week 13 Presentation ##
[Week 13 Presentation](https://docs.google.com/presentation/d/1XDwTwQFiZ809ODptx7YObFM9u1U7po0HKgbkhcHmsqQ/edit?usp=sharing)

## A5. Week 13 Demo Video ##
[Week 13 Demo video](https://www.youtube.com/watch?v=s46RVS3U-_0)

## Reference

#### (Other references cited in the "Information Search" section.)

#### Scarlett, Janet M., et al. "The role of veterinary practitioners in reducing dog and cat relinquishments and euthanasias." Journal of the American Veterinary Medical Association 220.3 (2002): 306-311.

#### Randell, Brian. "System structure for software fault tolerance." IEEE Transactions on Software Engineering 2 (1975): 220-232.

#### ionic.com, https://ionicframework.com/docs/intro/installation/ , visited Nov 2017

#### PhantomJS.com , http://phantomjs.org/documentation/, visited Nov 2017

#### Carlos C.  , https://books.google.com.au/books?id=4JN4CgAAQBAJ&lpg=PP1&dq=database&pg=PP1#v=onepage&q=database&f=false , visited Nov 2017 

#### Multimedia Database Management Systems , https://books.google.com.au/books?id=zeNKPYnOuzEC&printsec=frontcover&dq=database&hl=en&sa=X&ved=0ahUKEwj86r34y6HXAhUEa7wKHSPtBe8Q6AEIPjAE , published 1996

#### Ionic 2 Cookbook , https://books.google.com.au/books?id=ZKDcDgAAQBAJ&printsec=frontcover&dq=ionic&hl=en&sa=X&ved=0ahUKEwiy1pLGzKHXAhVJhrwKHe-bAGMQ6AEIQzAE , visited Nov 2017

#### Learning Web App Development: Build Quickly with Proven JavaScript, https://books.google.com.au/books?id=JLDZAgAAQBAJ&printsec=frontcover&dq=web+app&hl=en&sa=X&ved=0ahUKEwiN9sbWzKHXAhXGU7wKHTgmCZYQ6AEILzAB,  published 2014
