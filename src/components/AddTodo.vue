<template>
    <div>
        <form>
            <input placeholder="Add todo"
            type="text"
            class="input"
            :value = 'value'
            v-on="inputListener"/>
            <!-- <button v-on:click="addTask">add</button> -->
            <div v-on="listeners">add</div>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddTodo",
    props: {
    value: {
      type: String,
      default: '',
    }
  },
    data() {
        return {
            message: "Add a todo here"
        }
    },
    computed: {
        inputListener(){
            return {
                input: event => this.$emit('input',event.target.value)
            }
        },
        listeners () {
            return {
                ...this.$listeners,
                
            }
        }
    }
    // methods: {
	// 	addTodo () {
	// 		console.log("Task added")
	// 	}
    // }
}
</script>
