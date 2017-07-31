new Vue({
  el: "#todo",
  data: {
    newTodoText:'',
    newtodos:[],
    outtodos:[]
  },
  computed: {
    remaining: function (){
      return this.newtodos.length;
    }
  },
  methods: {
    addTodo: function (){
      this.newtodos.push({title: this.newTodoText,status: false});
      this.outtodos = this.newtodos;
      this.newTodoText = '';
    },
    Completed: function (index){
      this.newtodos[index].status = !this.newtodos[index].status;
    },
    removeTodo: function (index){
      this.newtodos.splice(index,1);
      this.outtodos = this.newtodos;
      console.log(this.outtodos,this.newtodos);
    },
    getAll: function (){
      return this.newtodos;
    },
    getActive: function (){
      return this.newtodos.filter(function (item) {
       return !item.status;
     });
   },
   getCompleted: function (){
     return this.newtodos.filter(function (item){
       return item.status;
     });
   },
   cleartodos: function (){
     this.newtodos.splice(0,this.newtodos.length);
     this.outtodos = this.newtodos;
   }
  }
});
