# Polls Controller

This controller supports the polls module and deals with the data transfer between the backend and the frontend

>## Function showBox
>>Parameters: **string** el - string containing name of box to open.

>>Description: The function takes the name of the element to be shown on the page.

>>Return: None.

>## Function hideBox
>>Parameters: **string** el - string containing name of hide to open.

>>Description: The function takes the name of the element to be hidden on the page.

>>Return: None.

>## Function initShow
>>Parameters: None.

>>Description: Function calls *getpoll* php if statement which return information about poll.

>>Return: **array** pollShow - information about poll 

>## Function calculateStats
>>Parameters: None.

>>Description: Function calls *calculateStats* php if statement which return information about specific poll answers statistic.

>>Return: **array** pollStat - information about specific poll answers statistic

>## Function initCheck
>>Parameters: None.

>>Description: Function calls *calculateStats* php if statement which return information about specific poll answers statistic.

>>Return: **int** checkPoll - information about specific poll answers for current user.

>## Function initCheck
>>Parameters: None.

>>Description: Function calls *calculateStats* php if statement which return information about specific poll answers statistic.

>>Return: **int** checkPoll - information about specific poll answers for current user.

>## Function reload
>>Parameters: None.

>>Description: Function reload page after accepting personal hash code.

>>Return: None.

>## Function checkConst
>>Parameters: 

>>>- **array** answers - array of answers given by user.
>>>- **string** trues - password needed for checking answer consistency.
>>>- **int** user - id of current user.
>>>- **int** poll - id of specific poll.

>>Description: Function check if answer was changed or not by administrator and calls *checkpoll* which return integer value

>>Return: **int** check.true - information about changes.

>## Function initMyCreatedPollsList
>>Parameters: None.

>>Description: Function calls *myCreatedPollsList* php if statement which return array of polls which was created by current user.

>>Return: **array** myCreatedPollsList- list of created polls.

>## Function initMyPollsList
>>Parameters: None.

>>Description: Function calls *myPollsList* php if statement which return array of polls which are availble to fill by current user.

>>Return: **array** myPollsList- list of availble polls.

>## Function initFilledPollsList
>>Parameters: None.

>>Description: Function calls *myFilledList* php if statement which return array of polls which were filled by current user.

>>Return: **array** myFilledList- list of filled polls.

>## Function checkIfKeyFill
>>Parameters: None.

>>Description: Function check if current user have access to specific poll if he tries to get into it by browser url.

>>Return: None.

>## Function searchUser
>>Parameters: None.

>>Description: Function calls *searchUsers* php if statement which return array of user which can be choose to be avaible to fill poll.

>>Return: **array** usersList- list of availble users.

>## Function addNewQuestion
>>Parameters: None.

>>Description: Function push new question to question array used to questions list.

>>Return: None.

>## Function checkFill
>>Parameters: None.

>>Description: Function calls *checkFill* php if statement which return information if current user have access to fill specific poll, on negative reload to polls list.

>>Return: None.

>## Function checkCheck
>>Parameters: None.

>>Description: Function calls *checkFill* php if statement which return information if current user have access to fill specific poll, on negative reload to polls list

>>Return: None.

>## Function checkStat
>>Parameters: None.

>>Description: Function calls *checkStat* php if statement which return information if current user have access to check statistic for specific poll, on negative reload to filled list answers

>>Return: None.

>## Function addNewPoll
>>Parameters: **array** pollAdd - poll to add to database

>>Description: Function calls 'addNewPoll' php if statement which add new poll to database and return information if this add was succesfull or not.

>>Return: **array** response- information if poll was added or not

>## Function addAnswer
>>Parameters:

>>>- **array** answerz - user answers.
>>>- **int** currentUser.id - user id.
>>>- **array** idpoll - poll id.
>>>- **string** truepass - user password

>>Description: Function calls 'AddAnswer' php if statement which add answer of current user for specific poll to database and return hashcode which user can enter to check if his answer was manipulated or not.

>>Return: **string** hashcode - user hashcode to check answer later.

>## Function resendPolls
>>Parameters: **array** pollAdd - poll to add to database

>>Description: Function calls 'resendPolls' php if statement which send mail with information to specific users for specific poll.

>>Return: **array** response - information if information was send or not,