<template>
	<div class="flex flex-col  border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="'my-4 text-base font-semibold">What do you want to do</h3>
				<div class="flex items-center text-sm">
					<ActionButton text="Clear filter"
								  type="secondary">
					</ActionButton>
				</div>
			</div>


			<job-filter-sidebar-checkbox-group
					header = "Job types"
					:uniqueValues = "UNIQUE_JOB_TYPES"
					:action = "userStore.ADD_SELECTED_JOB_TYPES"
			/>
			<job-filter-sidebar-checkbox-group
					header = "Organizations"
					:uniqueValues = "UNIQUE_ORGANIZATIONS"
					:action = "userStore.ADD_SELECTED_ORGANIZATIONS"
			/>



			</section>
	</div>

</template>

<script setup>
	import {computed} from "vue";
	import ActionButton from '../../Shared/ActionButton.vue';
    import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';

    import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";

    import {useJobsStore} from '../../../stores/jobs';
    import {useUserStore} from '../../../stores/user';

    const jobStore = useJobsStore();
    const userStore =useUserStore();

    const UNIQUE_ORGANIZATIONS = computed (()=>{
        return jobStore.UNIQUE_ORGANIZATIONS
	});

    console.log(UNIQUE_ORGANIZATIONS.value)
    const UNIQUE_JOB_TYPES = computed (()=>{
        return jobStore.UNIQUE_JOB_TYPES
    });


</script>

<style scoped>

</style>
