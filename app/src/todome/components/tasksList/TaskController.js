import Task from 'src/todome/task';
class TaskController {
  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor(TaskDataService, $mdDialog) {
    // var self = this;
    this.TaskDataService = TaskDataService;
    // self.$mdDialogDelete = $mdDialogDelete;
    // this.tasks = null;
    this.willRemoveTask = null;
    this.willFinishTask = null;
    this.deleteisshow = false;
    this.finishisshow = false;
    this.$mdDialog = $mdDialog;
  }

  getDateTime(dt){
    var dtstr = dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes(); 
    return dtstr;
  }
  showDialog(removeTask) {
    this.willRemoveTask = removeTask;
    this.deleteisshow = true;
    this.$mdDialog.show();
    // self.$mdDialogDelete.show();
  }
  closeDialog() {
    console.log('closeDialog');
    this.deleteisshow = false;
    this.$mdDialog.hide();
  }
  remove() {
    var self = this;
    this.TaskDataService
      .removeTask(this.willRemoveTask)
      .then(function (tasks) {
        self.tasks = tasks;
      });
    this.deleteisshow = false;
    this.$mdDialog.hide();
  }
  showfinishTask(task) {
    this.willFinishTask = task;
    this.finishisshow = true;
    this.$mdDialog.show();
    // self.$mdDialogDelete.show();
  }
  closeFinishDialog() {
    console.log('closeDialog');
    this.finishisshow = false;
    this.$mdDialog.hide();
  }
  finishTask() {
    console.log('finishTask');
    var self = this;
    this.TaskDataService
      .markStatusOK(this.willFinishTask)
      .then(function (tasks) {
        self.tasks = tasks;
      });
    this.finishisshow = false;
    this.$mdDialog.hide();
  }
}
export default TaskController;