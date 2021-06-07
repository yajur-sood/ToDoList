<template>
  <div id="app">
    <router-view>
        
    </router-view>
    <!-- {{message}}
    <AddTodo v-on:click="addTask"
    v-model.lazy='newTodo'/>
    
    <ol>
      <TodoList v-on:remove="removeTask"
                v-for="item in groceryList"
                v-bind:todo="item"
                v-bind:key="item.id"/>
    </ol>
    
    <router-view></router-view>-->
  </div>
  
</template>

<script>



// import TodoList from './components/TodoList.vue'
// import AddTodo from './components/AddTodo.vue'


// let newId = 3
//  export default ({
   
//       // el: '#app',
//       data() {
//         return {
//         message: 'Hello Vue!',
//         newTodo: '',
//         groceryList: [
//               { id: 0, text: 'Vegetables' },
//               { id: 1, text: 'Cheese' },
//               { id: 2, text: 'Whatever else humans are supposed to eat' }
//             ]
//             }
//         },
//         methods: {
//           addTask() {
//             const item = this.newTodo.trim()
//             // console.log(item)
//             this.groceryList.push({
//               id: newId++,
//               text: item
//             })
//             this.newTodo = ''
//           },
//           removeTask(removeId) {
//             this.groceryList = this.groceryList.filter (item => {
//               return item.id !==removeId
//             })
//           }
//         },
//       components: {
//         TodoList, AddTodo
//       }
//     })

</script>

<style>
/* #app {  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
