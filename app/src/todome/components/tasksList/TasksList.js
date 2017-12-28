// Notice that we do not have a controller since this component does not
// have any specialized logic.
import TaskController from './TaskController'
export default {
  name : 'tasksList',
  config : {
    bindings         : {  tasks: '<' },
    templateUrl      : 'src/todome/components/tasksList/TasksList.html',
    controller       : [ 'TaskDataService','$mdDialog', TaskController ]
  }
};
