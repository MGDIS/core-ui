import templateUrl from './technical-test.template.html';
import './technical-test.scss';

export default {
  templateUrl,
  controller: class HelloWorldCtrl {
    $onInit() {
      this.tasks = [{ text: 'Learn AngularJS' }, { text: 'Build a todo list' }];
    }
    addTask = () => {
      if (this.newTask) {
        this.tasks.push({ text: this.newTask });
        this.newTask = '';
      }
    };
    removeTask = (index) => {
      this.tasks.splice(index, 1);
    };
  },
};
