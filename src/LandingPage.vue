<template>
    <form>
        <input placeholder='enter username'
                :value="value"
                v-on='inputListener'/>
                
        <router-link to='/'><button @click="searchUser">Go to your todo</button></router-link>
        <div id="authorization" v-if="notAuthorized">username does not exist in database</div>
       <!-- <router-view></router-view> -->
    </form>
</template>

<script>
import axios from 'axios'
// import { response } from 'express';

let username;
// let whereTo="/";
export default({
    data() {
        return {
            notAuthorized: false,
            value:''
        }
    },
    computed : {
        inputListener() {
            return {
                input: event=>{
                    username = event.target.value
                    // console.log(username)
                    }
            }
        }
    },
    methods : {
            searchUser() {
                axios.get(`http://localhost:3000/todo/${username}`)
                    .then( (response)=> {
                        // handle success
                            if(response.data==="empty"){
                            // console.log(response.data + "is empty");
                            this.notAuthorized=true                      
                        }
                        else {
                            // console.log(response.data)
                            
                            //the below line of code lets me redirect to another page without having to pass a value in <router-link>
                            this.$router.push({path:"/todo",query : {user: `${username}`}})
                            
                            this.notAuthorized=false
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // console.log("hello world api working")
            })
        }
    }
})
</script>

<style scoped>
button {
    background: #6a2;
}

#authorization {
    color: red;
    margin-top:10px;
}
</style>