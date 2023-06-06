<script setup lang="ts">
import { ref } from "vue";

interface TabsProps {
  tabs: ["All Tasks", "In Progress", "Completed"];
  numberOfCompletedTasks: number;
  numberOfAlltasks: number;
}

//props
const props = defineProps<TabsProps>();

//emits
const emit = defineEmits(["onSelected"]);

//data
const selectedTab = ref<string | number>(props.tabs[0] || "");

//actions
const setSelectedTab = (tab: string) => {
  selectedTab.value = tab;
  emit("onSelected", tab);
};
</script>

<template>
  <div class="d-flex justify-content-start align-items-center">
    <ul class="nav nav-tabs">
      <li v-for="tab in props.tabs" :key="tab" class="cursor-pointer">
        <a
          :class="[
            tab === selectedTab && 'active text-primary',
            'nav-link fw-bold text-dark',
          ]"
          @click="setSelectedTab(tab)"
        >
          {{ tab }} ({{
            tab === "Completed" ? numberOfCompletedTasks : numberOfAlltasks
          }})
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
