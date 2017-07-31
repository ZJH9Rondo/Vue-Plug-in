new Vue({
  el: "#todo",
  data: {
    newTodoText:'',
    newtodos:[], // 作为暂存去来保存当前todos
    outtodos:[]  // 实际操作数据，防止各项操作互相覆盖
  },
  computed: {
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
      this.outtodos.splice(index,1);
    },
    getAll: function (){
      this.outtodos = this.newtodos;
    },
    getActive: function (){
      this.outtodos = this.newtodos.filter(function (item) {
       return !item.status;
     });
   },
   getCompleted: function (){
     this.outtodos = this.newtodos.filter(function (item){
       return item.status;
     });
   },
   cleartodos: function (){
     this.newtodos.splice(0,this.newtodos.length);
     this.outtodos = this.newtodos;
   }
  }
});
