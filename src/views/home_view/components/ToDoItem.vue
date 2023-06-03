<script setup lang="ts">

</script>

<template>
    <div class="d-flex shadow border p-3 mx-md-2 justify-content-between align-items-center row">
        <div class="d-flex align-items-center col-9 col-md-9 mb-2">
            <input type="checkbox" class="me-3 form-check-input no-outline" />
            <div class="d-inline-block">
                <p class="mb-0">Eat Food</p>
                <small class="text-muted text-truncate d-inline-block description">Eat food today
                    habvadjbvjbwrigvuwruvh nsfnvkwndovwnkvwn</small>
            </div>
        </div>
        <div class="col-3 col-md-3">
            <div class="d-flex justify-content-end">
                <button class="btn text-primary me-3 shadow border border-primary">View</button>
                <button class="btn bg-secondary text-white shadow">Delete</button>
            </div>

        </div>

    </div>
</template>

<style scoped>
.description {
    max-width: 400px;
}
@media only screen and (max-width: 600px) {
  .description {
    max-width: 300px;
  }
}

@media only screen and (max-width: 527px) {
  .description {
    max-width: 170px;
  }
}

@media only screen and (max-width: 424px) {
  .description {
    max-width: 120px;
  }
}

</style>
