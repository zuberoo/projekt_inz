# Votes Controller

This controller supports the votes module and deals with the data transfer between the backend and the frontend

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

>>Description: Function calls *getvote* php if statement which return information about vote.

>>Return: **array** voteShow - information about vote 

>## Function calculateStats
>>Parameters: None.

>>Description: Function calls *calculateStats* php if statement which return information about specific vote answers statistic.

>>Return: **array** voteStat - information about specific vote answers statistic

>## Function initCheck
>>Parameters: None.

>>Description: Function calls *calculateStats* php if statement which return information about specific vote answers statistic.

>>Return: **int** checkVote - information about specific vote answers for current user.

>## Function initCheck
>>Parameters: None.

>>Description: Function calls *calculateStats* php if statement which return information about specific vote answers statistic.

>>Return: **int** checkVote - information about specific vote answers for current user.

>## Function reload
>>Parameters: None.

>>Description: Function reload page after accepting personal hash code.

>>Return: None.

>## Function checkConst
>>Parameters: 

>>>- **array** answers - array of answers given by user.
>>>- **string** trues - password needed for checking answer consistency.
>>>- **int** user - id of current user.
>>>- **int** vote - id of specific vote.

>>Description: Function check if answer was changed or not by administrator and calls *checkvote* which return integer value

>>Return: **int** check.true - information about changes.

>## Function initMyCreatedVotesList
>>Parameters: None.

>>Description: Function calls *myCreatedVotesList* php if statement which return array of votes which was created by current user.

>>Return: **array** myCreatedVotesList- list of created votes.

>## Function initMyVotesList
>>Parameters: None.

>>Description: Function calls *myVotesList* php if statement which return array of votes which are availble to fill by current user.

>>Return: **array** myVotesList- list of availble votes.

>## Function initFilledVotesList
>>Parameters: None.

>>Description: Function calls *myFilledList* php if statement which return array of votes which were filled by current user.

>>Return: **array** myFilledList- list of filled votes.

>## Function checkIfKeyFill
>>Parameters: None.

>>Description: Function check if current user have access to specific vote if he tries to get into it by browser url.

>>Return: None.

>## Function searchUser
>>Parameters: None.

>>Description: Function calls *searchUsers* php if statement which return array of user which can be choose to be avaible to fill vote.

>>Return: **array** usersList- list of availble users.

>## Function addNewQuestion
>>Parameters: None.

>>Description: Function push new question to question array used to questions list.

>>Return: None.

>## Function checkFill
>>Parameters: None.

>>Description: Function calls *checkFill* php if statement which return information if current user have access to fill specific vote, on negative reload to votes list.

>>Return: None.

>## Function checkCheck
>>Parameters: None.

>>Description: Function calls *checkFill* php if statement which return information if current user have access to fill specific vote, on negative reload to votes list

>>Return: None.

>## Function checkStat
>>Parameters: None.

>>Description: Function calls *checkStat* php if statement which return information if current user have access to check statistic for specific vote, on negative reload to filled list answers

>>Return: None.

>## Function addNewVote
>>Parameters: **array** voteAdd - vote to add to database

>>Description: Function calls 'addNewVote' php if statement which add new vote to database and return information if this add was succesfull or not.

>>Return: **array** response- information if vote was added or not

>## Function addAnswer
>>Parameters:

>>>- **array** answerz - user answers.
>>>- **int** currentUser.id - user id.
>>>- **array** idvote - vote id.
>>>- **string** truepass - user password

>>Description: Function calls 'AddAnswer' php if statement which add answer of current user for specific vote to database and return hashcode which user can enter to check if his answer was manipulated or not.

>>Return: **string** hashcode - user hashcode to check answer later.

>## Function resendVotes
>>Parameters: **array** voteAdd - vote to add to database

>>Description: Function calls 'resendVotes' php if statement which send mail with information to specific users for specific vote.

>>Return: **array** response - information if information was send or not,