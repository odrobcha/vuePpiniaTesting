<template>
  <job-filter-sidebar-checkbox-group
      header="Degree"
      :uniqueValues="degreesStore.UNIQUE_DEGREES"
      :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script setup lang="ts">
import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";
import {useDegreesStore} from "@/stores/degrees";
import {computed} from "vue";
import {useUserStore} from '../../../stores/user';
const userStore = useUserStore();

const degreesStore = useDegreesStore();
const UNIQUE_DEGREES = computed(() => {
  return degreesStore.UNIQUE_DEGREE
})
</script>

<style scoped>

</style>