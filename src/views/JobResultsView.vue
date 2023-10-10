<template>
	<div class="flex flex-row flex-nowrap w-full">
		<JobFiltersSideBar></JobFiltersSideBar>
		<JobListings></JobListings>

	</div>
</template>

<script setup lang="ts">
    import JobFiltersSideBar from '../components/JobResults/JobFiltersBar/JobFiltersSideBar.vue';
    import JobListings from '../components/JobResults/JobListings.vue';

</script>

<style scoped>

</style>
