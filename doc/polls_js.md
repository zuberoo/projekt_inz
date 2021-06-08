/** * @function showBox. */
/**
* @param {string} el - string containing name of box to open.
*/
/** * Function hideBox. */
/**
* @param {string} el - string containing name of box to hide.
*/
/** * Function initShow. */
/**
* Function calls 'getpoll' php if statement which return information about poll
@return {array} pollShow - information about poll 
*/
/** * Function calculateStats. */
/**
* Function calls 'calculateStats' php if statement which return information about specific poll answers statistic
@return {array} pollStat - information about specific poll answers statistic
*/
/** * Function initCheck. */
/**
* Function calls 'checkpoll' php if statement which return information about specific poll answer for current user
@return {int} checkPoll - information about specific poll answers for current user
*/
/** * Function reload. */
/**
* Function reload page after accepting personal hash code
*/
/**
* Function check if answer was changed or not by administrator
* @param {array} answers - array of answers given by user.
* @param {string} trues - password needed for checking answer consistency.
* @param {number} user - id of current user.
* @param {number} poll - id of specific poll.
* Function calls 'checkpoll' which return integer value
* @return{int} check.true - information
*/
/** * Function initMyCreatedPollsList. */
/**
* Function calls 'myCreatedPollsList' php if statement which return array of polls which was created by current user
* @return{array} myCreatedPollsList- list of created polls
*/
/** * Function initMyPollsList. */
/**
* Function calls 'myPollsList' php if statement which return array of polls which are availble to fill by current user
* @return{array} myPollsList- list of availble polls
*/
 /** * Function checkIfKeyFill. */
/**
* Function check if current user have access to specific poll if he tries to get into it by browser url
*/
/** * Function initFilledPollsList. */
/**
* Function calls 'myFilledList' php if statement which return array of polls which were filled by current user
* @return{array} myFilledList- list of filled polls
*/
/** * Function searchUser. */
/**
* Function calls 'searchUsers' php if statement which return array of user which can be choose to be avaible to fill poll
* @return{array} usersList- list of availble users
*/
/** * Function addNewQuestion. */
/**
* Function push new question to question array used to
*/
/** * Function checkFill. */
/**
* Function calls 'checkFill' php if statement which return information if current user have access to fill specific poll, on negative reload to polls list
*/
/** * Function checkCheck. */
/**
* Function calls 'checkCheck' php if statement which return information if current user have access to check specific poll answer, on negative reload to filled list
*/
/** * Function checkStat. */
/**
* Function calls 'checkStat' php if statement which return information if current user have access to check statistic for specific poll, on negative reload to filled list answers
*/
 /** * Function addNewPoll. */
/**
* Function calls 'addNewPoll' php if statement which add new poll to database and return information if this add was succesfull or not
* @param {array} pollAdd - poll to add to database
* @return{array} response- information if poll was added or not
*/
/** * Function addAnswer. */
/**
* Function calls 'AddAnswer' php if statement which add answer of current user for specific poll to database and return hashcode which user can enter to check if his answer was manipulated or not
* @param {array} answerz - user answers
* @param {int} currentUser.id - user id
* @param {array} idpoll - poll id
* @param {array} truepass - user password
* @return {string} hashcode - user hashcode to check answer later
*/
/** * Function resendPolls. */
/**
* Function calls 'resendPolls' php if statement which send mail with information to specific users for specific poll
* @return {array} response - information if information was send or not
*/