<template>
	<div class="flex flex-row flex-nowrap w-full">
		<JobFiltersSideBar></JobFiltersSideBar>
		<JobListings></JobListings>

	</div>
</template>

<script>
    import JobFiltersSideBar from '../components/JobResults/JobFiltersBar/JobFiltersSideBar.vue';
    import JobListings from '../components/JobResults/JobListings.vue';
    export default {
        name: 'JobResultsView',
        components: { JobListings, JobFiltersSideBar },
        computed:{

		},
		methods:{

		}

    };
</script>

<style scoped>

</style>
