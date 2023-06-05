<script setup lang="ts">
const props = defineProps<{ placeholder: string }>();
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLabel">{{ props.placeholder }}</h6>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
  

  
  <style scoped>
</style>