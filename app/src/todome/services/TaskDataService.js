/**
 * Task DataService
 * Task embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
import Task from 'src/todome/Task';
var tasks = [];
var profile = null;
function TaskDataService($q) {
    //默认数据；
    // tasks = [
    //     {
    //         name: 'Lia Lugo1',
    //         timeToDo: new Date('2017-12-24 13:00:00').toLocaleString(),
    //         content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.',
    //         status: false,//完成状态
    //     },
    //     {
    //         name: 'Lia Lugo2',
    //         timeToDo: new Date('2017-12-24 11:00:00').toLocaleString(),
    //         content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.',
    //         status: true,
    //     },
    //     {
    //         name: 'Lia Lugo3',
    //         timeToDo: new Date('2017-12-24 15:00:00').toLocaleString(),
    //         content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.",
    //         status: false,
    //     }
    // ];
    var tasksStr = localStorage.getItem('tasks');
    try{
        tasks = tasksStr !=null? JSON.parse(tasksStr):[];
    }catch(e){
        console.log(e);
        tasks=[];
    }
    var profileStr = localStorage.getItem('profile');
    console.log(profileStr);
    try{
        if(profileStr != null){
            profile = JSON.parse(profileStr);
        }
        else{
            profile = {
                userName: 'James Wheelet',
                email: 'james@wheelet.com'
            };
        }
    }catch(e){
        console.log(e);
        profile = {
            userName: 'James Wheelet',
            email: 'james@wheelet.com'
        };
    }
    
    // Promise-based API
    return {
        loadAllTasks: function () {
            // Simulate async nature of real remote calls
            return $q.when(tasks);
        },
        addTask: function (task) {
            if (!task.name) {
                return $q.when({ success:false, message:"Please input task name!" });
            }
            if (task.timeToDo < new Date()) {
                return $q.when({ success:false, message:"The task time to do error!" });
            }
            if(tasks==null){
                tasks = [];
            }
            tasks.push(task);
            localStorage.setItem('tasks',JSON.stringify(tasks));
            return $q.when(tasks);
        },
        removeTask: function (task) {
            var index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasks',JSON.stringify(tasks));
            return $q.when(tasks);
        },
        markStatusOK: function (task) {
            var index = tasks.indexOf(task);
            tasks[index].status = true;
            localStorage.setItem('tasks',JSON.stringify(tasks));
            return $q.when(tasks);
        },
        getProfile: function () {
            return $q.when(profile);
        },
        saveProfile: function(profileInput){
            profile = profileInput;
            localStorage.setItem('profile',JSON.stringify(profile));
            return $q.when(profile);
        }
    };
}

export default ['$q', TaskDataService];

