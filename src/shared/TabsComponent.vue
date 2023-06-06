<script setup lang="ts">
import { ref } from "vue";

interface TabsProps {
  tabs: ["All Tasks", "In Progress", "Completed"];
  numberOfInProgressTasks: number;
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
  <ul class="nav nav-tabs">
    <li v-for="tab in props.tabs" :key="tab" class="cursor-pointer">
      <a
        :class="[
          tab === selectedTab && 'active text-primary',
          'nav-link fw-bold text-dark px-2',
        ]"
        @click="setSelectedTab(tab)"
      >
        {{ tab }} ({{
          tab === "Completed"
            ? numberOfCompletedTasks
            : tab === "In Progress"
            ? numberOfInProgressTasks
            : numberOfAlltasks
        }})
      </a>
    </li>
  </ul>
</template>

<style scoped>
.nav-link {
  font-size: 1rem;
}

@media only screen and (max-width: 600px) {
  .nav-link {
    font-size: 0.75rem;
  }
}
</style>
