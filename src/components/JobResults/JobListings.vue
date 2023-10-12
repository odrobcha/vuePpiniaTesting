<template>
  <main class="flex-auto bg-brand-gray-2 p-8 ">
    <ol>
      <JobListing
          v-for="job in displayedJobs"
          :key="job.id"
          :job="job"
      >
      </JobListing>
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
              role="link"
              v-if="previousPage"
              :to="{name: 'JobResults', query: {page: previousPage}}"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>
          <router-link
              role="link"
              v-if="nextPage"
              :to="{name: 'JobResults', query: {page: nextPage}}">
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>

</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import JobListing from './JobListing.vue';
import {useJobsStore} from '../../stores/jobs';
import usePreviousAnNextPage from '../../composables/usePreviouseAndNextPages'
import { useDegreesStore } from "@/stores/degrees";

const jobsStore = useJobsStore();

//@ts-expect-error
onMounted(jobsStore.FETCH_JOBS);


const degreesStore = useDegreesStore();
onMounted(degreesStore.FETCH_DEGREES);

const route = useRoute();

const currentPage = computed(() => {
  return Number.parseInt(route.query.page as string || '1');
});
const FILTERED_JOBS = computed(() => {
  //@ts-expect-error
  return jobsStore.FILTERED_JOBS;
});
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));
const {previousPage, nextPage} = usePreviousAnNextPage(currentPage, maxPage);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
})


</script>

<style scoped>

</style>
