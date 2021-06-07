<template>
<li>
    {{todo.todo}}
    <button @click="$emit('edit',todo.id)">Edit</button>
    <button @click="$emit('remove',todo.id)">X</button>
</li>
</template>

<script>

    export default({
        props: {
            todo: {
                type: Object,
                required: true
            }
        },
        
  })

</script>

<style scoped>
button {
    background: #3cf;
}
li {
    padding-bottom: 10px;
}
</style>
