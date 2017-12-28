/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
import Task from 'src/todome/task';
function AppController(UsersDataService, TaskDataService, $mdSidenav, $mdDialog) {
  var self = this;

  self.selected = null;
  self.users = [];
  
  self.tasks = [];
  self.profile = null;
  self.pageTitle = null;
  self.timeNow = new Date().toDateString();
  
  self.taskaddisshow = false;
  self.addname = null;
  self.adddateTime = new Date();
  self.addtime = 1;
  self.taskpage = true;
  //方法声明
  self.selectUser = selectUser;
  self.toggleList = toggleUsersList;
  self.showDialog = showDialog;
  self.closeDialog = closeDialog;
  self.addTask = addTask;
  self.back = back;
  self.showProfile = showProfile;
  self.saveProfile = saveProfile;
  
  self.minDate = new Date();

  TaskDataService
    .loadAllTasks()
    .then(function (tasks) {
      console.log(tasks);
      self.tasks = [].concat(tasks);
    });
  TaskDataService
    .getProfile()
    .then(function (profile) {
      self.profile = profile;
    });

  // self.timeNow = (new Date()).getFullYear+'/'+(new Date()).getMonth+'/'+(new Date()).getDate()+' '+(new Date()).getHours+':'+(new Date()).getMinutes;
  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }
  function showDialog(){
    // console.log('showDialog');
    self.taskaddisshow = true;
    $mdDialog.show();
  }
  function closeDialog(){
    // console.log('closeDialog');
    self.taskaddisshow = false;
    $mdDialog.hide();
  }
  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser(user) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
  }
  function addTask(name, dateTime, time) {
    if(!name){
      return false;
    }
    dateTime.setHours(time);
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    var hours = time>12?((time-12)+" PM"):(time+" AM");
    var dtstr = dateTime.getDate()+"/"+dateTime.getMonth()+"/"+dateTime.getFullYear()+" "+hours;
    console.log(dtstr);
    try{
      TaskDataService
      .addTask(new Task(name, dtstr, name, false ))
      .then(function (tasks) {
        self.tasks = tasks;
      });
    }
    catch(e){
      TaskDataService
        .loadAllTasks()
        .then(function (tasks) {
          console.log(tasks);
          self.tasks = [].concat(tasks);
        });
    }
    
    self.taskaddisshow = false;
    $mdDialog.hide();
  }
  function showProfile(){
    self.taskpage = false;
  }
  function back(){
    self.taskpage = true;
  }
  function saveProfile(name, email){
    if(!name){
      alert("Name is null");
      return false;
    }
    if(!email){
      alert("Email is error");
      return false;
    }
    try{
      TaskDataService
      .saveProfile({userName: name, email: email})
      .then(function (result) {
        self.profile = result;
      });
    }
    catch(e){
      console.log(e);
      TaskDataService
        .getProfile()
        .then(function (profile) {
          self.profile = profile;
        });
    }
  }
}

export default ['UsersDataService', 'TaskDataService', '$mdSidenav', '$mdDialog', AppController];
