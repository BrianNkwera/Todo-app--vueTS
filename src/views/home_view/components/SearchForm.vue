<script setup lang="ts">

</script>

<template>
    <form @submit.prevent class="row g-0">
        <div class="col-8 g-0 d-flex align-items-center">
            <input type="text" class="d-inline-block form-control no-outline" placeholder="Search for a task...">
        </div>
        <div class="col-4 g-0 d-flex align-items-center">
            <button type="submit" class="btn bg-primary text-white ms-2 border-0">Search</button>
        </div>


    </form>
</template>

<style scoped>
.btn {
    width: 70px;
}
</style>
