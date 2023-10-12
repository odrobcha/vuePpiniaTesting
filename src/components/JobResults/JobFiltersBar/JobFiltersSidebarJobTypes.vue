<template>
  <job-filter-sidebar-checkbox-group

      :uniqueValues="UNIQUE_JOB_TYPES"
      :action="userStore.ADD_SELECTED_JOB_TYPES"
  />

</template>

<script setup lang="ts">
import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";
import {useJobsStore} from '../../../stores/jobs';
import {useUserStore} from '../../../stores/user';
import {computed} from "vue";

const jobStore = useJobsStore();
const userStore = useUserStore();

const UNIQUE_JOB_TYPES = computed(() => {
  return jobStore.UNIQUE_JOB_TYPES
});
</script>

<style scoped>

</style>