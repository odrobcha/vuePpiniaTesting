<template>
  <job-filter-sidebar-checkbox-group
      :uniqueValues="UNIQUE_ORGANIZATIONS"
      :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script setup lang="ts">
import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";
import {useJobsStore} from '../../../stores/jobs';
import {useUserStore} from '../../../stores/user';
import {computed} from "vue";

const jobStore = useJobsStore();
const userStore = useUserStore();

const UNIQUE_ORGANIZATIONS = computed(() => {
  console.log("TESR");
  console.log(jobStore.UNIQUE_ORGANIZATIONS)
  return jobStore.UNIQUE_ORGANIZATIONS
});
</script>

<style scoped>

</style>