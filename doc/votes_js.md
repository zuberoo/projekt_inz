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
* Function calls 'getvote' php if statement which return information about vote
@return {array} voteShow - information about f 
*/
/** * Function calculateStats. */
/**
* Function calls 'calculateStats' php if statement which return information about specific vote answers statistic
@return {array} voteStat - information about specific vote answers statistic
*/
/** * Function initCheck. */
/**
* Function calls 'checkvote' php if statement which return information about specific vote answer for current user
@return {int} checkVote - information about specific vote answers for current user
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
* @param {number} vote - id of specific vote.
* Function calls 'checkvote' which return integer value
* @return{int} check.true - information
*/
/** * Function initMyCreatedVotesList. */
/**
* Function calls 'myCreatedVotesList' php if statement which return array of votes which was created by current user
* @return{array} myCreatedVotesList- list of created votes
*/
/** * Function initMyVotesList. */
/**
* Function calls 'myVotesList' php if statement which return array of votes which are availble to fill by current user
* @return{array} myVotesList- list of availble votes
*/
 /** * Function checkIfKeyFill. */
/**
* Function check if current user have access to specific vote if he tries to get into it by browser url
*/
/** * Function initFilledVotesList. */
/**
* Function calls 'myFilledList' php if statement which return array of votes which were filled by current user
* @return{array} myFilledList- list of filled votes
*/
/** * Function searchUser. */
/**
* Function calls 'searchUsers' php if statement which return array of user which can be choose to be avaible to fill vote
* @return{array} usersList- list of availble users
*/
/** * Function addNewQuestion. */
/**
* Function push new question to question array used to
*/
/** * Function checkFill. */
/**
* Function calls 'checkFill' php if statement which return information if current user have access to fill specific vote, on negative reload to votes list
*/
/** * Function checkCheck. */
/**
* Function calls 'checkCheck' php if statement which return information if current user have access to check specific vote answer, on negative reload to filled list
*/
/** * Function checkStat. */
/**
* Function calls 'checkStat' php if statement which return information if current user have access to check statistic for specific vote, on negative reload to filled list answers
*/
 /** * Function addNewVote. */
/**
* Function calls 'addNewVote' php if statement which add new vote to database and return information if this add was succesfull or not
* @param {array} voteAdd - vote to add to database
* @return{array} response- information if vote was added or not
*/
/** * Function addAnswer. */
/**
* Function calls 'AddAnswer' php if statement which add answer of current user for specific vote to database and return hashcode which user can enter to check if his answer was manipulated or not
* @param {array} answerz - user answers
* @param {int} currentUser.id - user id
* @param {array} idvote - vote id
* @param {array} truepass - user password
* @return {string} hashcode - user hashcode to check answer later
*/
/** * Function resendVotes. */
/**
* Function calls 'resendVotes' php if statement which send mail with information to specific users for specific vote
* @return {array} response - information if information was send or not
*/