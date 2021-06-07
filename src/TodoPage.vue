<template>
  <div id="app">
    {{message}}
    
    <AddTodo v-on:click="addTask"
    v-model.lazy='newTodo'/>
    
    <ol>
      <TodoList v-on:edit='editTask'
                v-on:remove="removeTask"
                v-for="item in todoList"
                v-bind:todo="item"
                v-bind:key="item.id"/>
    </ol>
    <button id="clear" v-on:click="clearTodo">Clear List</button>
  </div>
  
</template>

<script>
import TodoList from './components/TodoList.vue'
import AddTodo from './components/AddTodo.vue'
import axios from 'axios'
// let newId = 3
let username;
 export default ({
   
      // el: '#app',
      data() {
        return {
        message: 'ToDo List',
        newTodo: '',
        todoList: [
              { id: 0, text: 'Vegetables' },
              { id: 1, text: 'Cheese' },
              { id: 2, text: 'Whatever else humans are supposed to eat' }
            ]
            }
        },
        beforeMount() {
          // console.log(this.$route.query.user + 'this is the query')
          username = this.$route.query.user
          //not the best way to fetch data because the data is already in Landing Page
          axios.get(`http://localhost:3000/todo/${username}`)
                    .then( (response)=> {
                        // handle success
                            // console.log(response.data);
                            this.todoList=response.data
                            // console.log(this.todoList,'todolist')            
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // console.log("hello world api working")
            })
        },
        methods: {

          addTask() {

            const item = this.newTodo.trim()
            if(item===''){
              alert('cannot add empty task')
              return 0
            }
            axios.post(`http://localhost:3000/todo/${username}`, {
              username: username,
              task: item
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            
            location.reload();
            
          },
          removeTask(removeId) {
            
            // this.todoList = this.todoList.filter (item => {
            //   return item.id !==removeId
            // })
            
            axios.delete(`http://localhost:3000/todo/${username}/${removeId}`,{
              username: username,
              id: removeId
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            location.reload();
          },
          editTask(editId) {
            let newTask = prompt('Enter value').trim()
            if(newTask==''){
              alert('empty task cannot be added')
              return 0
            }
            axios.put(`http://localhost:3000/todo/${username}/${editId}`,{
              username: username,
              id: editId,
              task: newTask
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
           location.reload();
          },
          clearTodo() {
            axios.delete(`http://localhost:3000/todo/${username}`)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
           location.reload();
          }
          
        },
      components: {
        TodoList, AddTodo
      }
    })

</script>

<style>
#app {  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#clear {
  background: #a4719c;
}
</style>
