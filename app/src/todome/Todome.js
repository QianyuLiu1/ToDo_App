// Load the custom app ES6 modules

import TaskDataService from 'src/todome/services/TaskDataService';

// import UsersList from 'src/users/components/list/UsersList';
// import UserDetails from 'src/users/components/details/UserDetails';
import TasksList from 'src/todome/components/tasksList/TasksList';

// Define the Angular 'users' module

export default angular
  .module("todome", ['ngMaterial'])

  .component(TasksList.name, TasksList.config)
//   .component(AddTask.name, AddTask.config)
//   .component(Profile.name, Profile.config)

  .service("TaskDataService", TaskDataService);
