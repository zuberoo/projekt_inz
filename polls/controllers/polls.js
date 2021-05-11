wbsiapp.controller('pollsControler', function($scope, CONFIG, $rootScope, $routeParams, $location, $timeout, AuthenticationService, SearchService, CUDService) {
  $scope.config = CONFIG;
  $scope.UNITS = $scope.config.UNITS;
  $scope.remPollsConfirmation=false;
  AuthenticationService.AllowAdmin('polls_view');
  $scope.activeAdmMenu='polls';
  //raportsList
  $scope.myCreatedPollsListCols = [{
      name: 'name',
      label: 'Nazwa',
      type: 'text'
    },{
      name: 'dateadd',
      label: 'Data Rozpoczęcia',
      date: 'dd-MM-yyyy'
    },{
      name: 'dateend',
      label: 'Data zakończenia',
      date: 'dd-MM-yyyy'
    },{
      name: 'status',
      label: 'Status',
      type: 'text'
    }
  ];
    $scope.myPollsListCols = [{
      name: 'name',
      label: 'Nazwa',
      type: 'text'
    },{
      name: 'dateadd',
      label: 'Data Rozpoczęcia',
      date: 'dd-MM-yyyy'
    },{
      name: 'dateend',
      label: 'Data zakończenia',
      date: 'dd-MM-yyyy'
    }
  ];
  $scope.myFilledListCols = [{
      name: 'name',
      label: 'Nazwa',
      type: 'text'
    },{
      name: 'datefill',
      label: 'Data wypełnienia',
      date: 'dd-MM-yyyy'
    },{
      name: 'dateend',
      label: 'Data zakończenia',
      date: 'dd-MM-yyyy'
    }
  ];
  
  $scope.pollsTabOn='start';
  $scope.pollsTab = function(el){
    $scope.pollsTabOn=el;
    if(el=='edit'){
      $scope.editPollsInit();
    }if(el=='stat'){
      $scope.calculateStats();
    }
  };
  $scope.personalHashCode='';
  $scope.showBox = function(el){
    $scope[el]=true;
    $scope.dragBoxEnable(el);
  }
  $scope.hideBox = function(el){
    $scope[el]=false;
  }
  $scope.dragBoxEnable = function(el){
    $timeout(function() {
      $(function(){
          $('#'+el).draggable({ 
              handle: ".modal-box-header",
              containment: "body"              
          });
          $('#'+el).resizable({
            maxHeight: 1000,
            maxWidth: 1900,
            minHeight: 500,
            minWidth: 300
          });
      });
    }, 300);
  }
$scope.initShow = function(){
    CUDService.Model('polls','getpoll', $routeParams.idpoll, '', function(response) {

      $scope.pollShow = response;
    });
   
  }
  $scope.calculateStats = function(){
    CUDService.Model('polls','calculateStats', {answers:$scope.pollShow.answers,questions:$scope.pollShow.questions,idpoll:$routeParams.idpoll}, '', function(response) {
        console.log(response);
      $scope.stats = response;
    });
   
  }
  $scope.initCheck = function(){
    CUDService.Model('polls','checkpoll', {idpoll:$routeParams.idpoll,iduser:$rootScope.currentUser.id,true:$rootScope.currentUser.truepassword}, '', function(response) {
     
      $scope.pollCheck = response;

    });
   
  }

  $scope.reload = function(){
    $timeout(function() {
          $location.path(CONFIG.route + '/polls/myFilledList/');
        }, CONFIG.autoReload);
  };
  $scope.check={};
  $scope.confirm={};
  $scope.check.chainCheck='';
   $scope.checkConst = function(answers,trues,user,poll){
    $scope.check.true=0;
    CUDService.Model('polls','checkConst',{chain:$scope.check.chainCheck,answers,trues,user,poll}, '', function(response) {;
      $scope.check.true = response;
      $scope.hideBox('checkConstOn');
    });
  };
if ($routeParams.idpoll) {
    $scope.initShow();
    $scope.initCheck();
  }
  $scope.initMyCreatedPollsList = function(){
    var data = $rootScope.currentUser.password;
    CUDService.Model('polls','myCreatedPollsList', data, '', function(response) {
      $scope.myCreatedPollsList = response;
    });
  }
  $scope.initMyPollsList = function(){
    var data = $rootScope.currentUser.id;
    CUDService.Model('polls','myPollsList', data, '', function(response) {
      $scope.myPollsList = response;
    });
  }
  $scope.initFilledPollsList = function(){
    var data = $rootScope.currentUser.id;
    CUDService.Model('polls','myFilledList', {id:$rootScope.currentUser.id,true:$rootScope.currentUser.truepassword}, '', function(response) {

      $scope.myFilledList = response;
    });
  }
  // $scope.pollsAdd={};
  // $scope.pollsAdd.name='';
  // $scope.pollsAdd.questions={};
  // $scope.pollsAdd.questions.question={};
  // $scope.pollsAdd.questions.question.name='';
  // $scope.pollsAdd.questions.question.type='';
  // $scope.pollsAdd.questions.question.order=0;
  // $scope.pollsAdd.questions.question.answers=[{val:'',ord:0}];
  // $scope.pollsAdd.destGroups={};
  $scope.pickUser={};
  $scope.pickUser.text='';
  $scope.searchUser= function(){
    CUDService.Model('polls','searchUsers', $scope.pickUser.text, '', function(response) {
      $scope.usersList = response;
    });    
  }
  $scope.$watch('pickUser.text',function(){
    if( $scope.pickUser.text.length>0){
      $scope.searchUser();
    }
  });
  
  $scope.pickDest = function(destination) {

     $scope.pickUserOn=false;
     $scope.pollsAdd.dest.push(destination);

  }
  $scope.pollsAdd={
  name:'',
  creator: '',
  dateend: new Date(Date.now() + 12096e5),
  dateadd: Date.now(),
  dest:[],
  questions:[]
}

// $scope.newQuestion={
//     name: '',
//     answers:[{val:'',ord:0}]
//   }
$scope.newQuestion={};
$scope.newQuestion.name='';
$scope.newQuestion.order='';
$scope.newQuestion.answers=[{
  val:'',
  ord:0
}];

$scope.addNewQuestion = function(){
  var qestion=jQuery.extend({},$scope.newQuestion);
  qestion.order=$scope.pollsAdd.questions.length;
  if(qestion.type == 'close'){
  qestion.answers.pop(); //usunąć ostatni pusty wpis
  }if(qestion.type == "scale" && qestion.answers[0].val==""){
  qestion.answers[0].val=7;
  } 
  $scope.pollsAdd.questions.push(qestion);

  $scope.newQuestion={
    name: '',
    answers:[{val:'',ord:0}]
  }
}
$scope.addPollMessage = {};
$scope.addNewPoll = function(){
  if($scope.pollsAdd.name == '') {
      $scope.addPollMessage.error = 'Podaj nazwe!';
      return;
  }
  if(!$scope.pollsAdd.questions[0]){
      $scope.addPollMessage.error = 'Dodaj pytanie!';
      return;
  }
  if(!$scope.pollsAdd.dest[0]){
      $scope.addPollMessage.error = 'Dodaj odbiorce!';
      return;
  }
  $scope.pollsAdd.creator=$rootScope.currentUser.password;
    $scope.dataLoading = true;
    CUDService.Model('polls','addNewPoll', $scope.pollsAdd, '', function(response) {

      if (response.success) {
        $scope.addPollMessage.success = response.message;
        $timeout(function() {
          $location.path(CONFIG.route + '/polls/myCreatedList/');
        }, CONFIG.autoReload);
      } else {
        $scope.addPollMessage.error = response.message;
      }
      $scope.dataLoading = false;
    });
  }
$scope.answerz={};
$scope.answerz.answer=[];
$scope.addAnswerMessage = {};
$scope.addAnswerMessage.error='';
$scope.addAnswer = function(answerz){
    $scope.counter=0;
    // $scope.showBox('giveHashCode');
    while($scope.counter!=$scope.pollShow.questions.length){
      if(!$scope.answerz.answer[$scope.counter]){
        $scope.counter++;
        $scope.addAnswerMessage.error = 'Nie podano odpowiedzi na pytanie numer '+$scope.counter;
        return;
      }else{
        $scope.counter++;
      }


    }

  $scope.currentTime=Date.now();
  CUDService.Model('polls','AddAnswer',{answer:$scope.answerz,id:$rootScope.currentUser.id,idpoll:$routeParams.idpoll,true:$rootScope.currentUser.truepassword,currentTime:$scope.currentTime}, '', function(response) {

       $scope.personalHashCode= response;
       $scope.showBox('giveHashCode');
    });
}

$scope.changed = function(){
  $scope.newQuestion.answers=[{
  val:'',
  ord:0
  }];
}
$scope.$watch('newQuestion.answers',function(){
  if($scope.newQuestion.type=="close"){
  if($scope.newQuestion.answers[$scope.newQuestion.answers.length-1].val!=''){
    $scope.newQuestion.answers.push({val:'',ord:$scope.newQuestion.answers.length})
  }if($scope.newQuestion.answers[$scope.newQuestion.answers.length-2].val==''){
    $scope.newQuestion.answers.splice(-1,1)}}
},true);
  //list
  $scope.initListPolls = function(){
    SearchService.search('simple', '', 'polls', '', function(response) {
      $scope.pollsList = response;
    });     
  }
  //$scope.editQuestionOn = false;
  $scope.tempEditQuestion = {};
  $scope.tempIndex = 0;
  $scope.tempCall = '';
  $scope.tempQuestion = function(e,call){
    $scope.tempIndex = e;
    $scope.tempCall = call;
    $scope.tempEditQuestion = $scope.pollsAdd.questions[e];
    $scope.showBox(call);
  }
  $scope.$watch('tempEditQuestion.answers',function(){
  if($scope.tempEditQuestion.type=="close"){
  if($scope.tempEditQuestion.answers[$scope.tempEditQuestion.answers.length-1].val!=''){
    $scope.tempEditQuestion.answers.push({val:'',ord:$scope.tempEditQuestion.answers.length})
  }if($scope.tempEditQuestion.answers[$scope.tempEditQuestion.answers.length-2].val==''){
    $scope.tempEditQuestion.answers.splice(-1,1)}}
},true);
  $scope.editQuestion = function(){
    $scope.pollsAdd.questions[$scope.tempIndex] = $scope.tempEditQuestion;
    $scope.tempIndex = 0;
    $scope.hideBox($scope.tempCall);
    $scope.tempCall = '';
  }
  $scope.questionDelete = function(e){
    var length = $scope.pollsAdd.questions.length;
    if($scope.pollsAdd.questions.length>0){
          $scope.pollsAdd.questions.splice(e,1);
      }
      var u = e;
      length=length-1;
     while(u <= length){
       $scope.pollsAdd.questions[u].order=($scope.pollsAdd.questions[u].order-1);
       u=u+1;
     }
  }
  $scope.destDelete = function(){
      var length = $scope.pollsAdd.dest.length;
      if($scope.pollsAdd.dest.length>0){
          $scope.pollsAdd.dest.splice(-1,1);
      }
    }
  
  $scope.init = function() {
    $scope.initMyPollsList();
    $scope.initFilledPollsList();
    $scope.initMyCreatedPollsList();
  };
  $scope.init();
});