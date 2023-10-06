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
			<job-filter-sidebar-job-types>TEST</job-filter-sidebar-job-types>
			<job-filter-sidebar-organizations></job-filter-sidebar-organizations>


			</section>
	</div>

</template>

<script>
	import ActionButton from '../../Shared/ActionButton.vue';
    import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';
    import JobFilterSidebarOrganizations from './JobFilterSidebarOrganizations.vue';
    import JobFilterSidebarJobTypes from './JobFilterSidebarJobTypes.vue';

    export default {
        name: 'JobFiltersSideBar',
        components: { JobFilterSidebarJobTypes, CollapsibleAccordion, ActionButton, JobFilterSidebarOrganizations },
		data(){
            return{

			}
		}
    };
</script>

<style scoped>

</style>
