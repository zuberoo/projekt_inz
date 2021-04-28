wbsiapp.controller('pollsControler', function($scope, CONFIG, $rootScope, $routeParams, $location, $timeout, AuthenticationService, SearchService, CUDService) {
  $scope.config = CONFIG;
  $scope.UNITS = $scope.config.UNITS;
  $scope.remPollsConfirmation=false;
  AuthenticationService.AllowAdmin('polls_view');
  $scope.activeAdmMenu='polls';
  //raportsList
  $scope.raportsListCols = [{
      name: 'nr',
      label: 'Numer',
      type: 'text'
    },{
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
  
  $scope.pollsTabOn='start';
  $scope.pollsTab = function(el){
    $scope.raportTabOn=el;
    if(el=='edit'){
      $scope.editPollsInit();
    }
  };
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
  // $scope.pollsAdd={};
  // $scope.pollsAdd.name='';
  // $scope.pollsAdd.questions={};
  // $scope.pollsAdd.questions.question={};
  // $scope.pollsAdd.questions.question.name='';
  // $scope.pollsAdd.questions.question.type='';
  // $scope.pollsAdd.questions.question.order=0;
  // $scope.pollsAdd.questions.question.answers=[{val:'',ord:0}];
  // $scope.pollsAdd.destGroups={};
  $scope.searchGroup={};
  $scope.searchGroup.text='';
  $scope.searchGroup.search = function(){
    CUDService.Model('polls','searchGroup', $scope.searchGroup.text, '', function(response) {
      $scope.groupList = response;
    });    
  }
  $scope.$watch('searchGroup.text',function(){
    if( $scope.searchGroup.text.length>0){
      $scope.searchGroup.search();
    }
  });
  
  $scope.pickGroup = function(destination) {
     $scope.pickGroupOn=false;
     $scope.pollsAdd.destGroups=destination;
  }
  $scope.pollsAdd={
  name:'',
  destGroups:'',
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
  console.log($scope.pollsAdd.questions);
  $scope.newQuestion={
    name: '',
    answers:[{val:'',ord:0}]
  }
}
$scope.addNewPoll = function(){
  CUDService.Model('polls','addNewPoll', $scope.pollsAdd, '', function(response) {
       console.log(response);
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
    console.log($scope.pollsAdd.questions);
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
    console.log($scope.pollsAdd.questions);
  }
  
  $scope.init = function() {
    $scope.initListPolls();
  };
  $scope.init();
});