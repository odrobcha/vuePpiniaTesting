<template>
	<div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
		<div class="flex h-full items-center px-8">
			<div v-if="onJobResultsPage">
				<font-awesome-icon :icon="['fas', 'search']" class="mr-3"/>
				<span><span class="text-brand-green-1">{{FILTERED_JOBS.length}}</span> jobs matched</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {useJobsStore} from '../../stores/jobs';
	import {computed} from 'vue';
	import {useRoute} from 'vue-router';
	const route = useRoute();

    const onJobResultsPage = computed (() =>{
        return route.name === 'JobResults'
	});

	const jobsStore = useJobsStore();  //to get access to pinia store we should wrap them to computed property
	const FILTERED_JOBS = computed(()=>{
	    return jobsStore.FILTERED_JOBS
	})


</script>
