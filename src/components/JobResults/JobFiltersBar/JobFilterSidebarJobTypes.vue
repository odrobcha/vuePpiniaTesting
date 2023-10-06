<template>
	<collapsible-accordion  header="Job types">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li v-for= "jobType in UNIQUE_JOB_TYPES" :key = "jobType" class="h-8 w-1/2">
						<input
								:id="jobType"
								v-model="selectedJobTypes"
								:value ="jobType"
								@change ="selectJobType"
								type="checkbox"
								class="mr-3"
						/>
						<label :for="jobType"> {{jobType}}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</collapsible-accordion>
</template>

<script>
	import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';
    import {mapState, mapActions} from 'pinia';
    import {useJobsStore, UNIQUE_JOB_TYPES} from '../../../stores/jobs';
    import { ADD_SELECTED_JOB_TYPES, useUserStore } from '../../../stores/user';

    export default {
        name: 'JobFilterSidebarJobTypes',
		components: {CollapsibleAccordion},

		data(){
            return{
                selectedJobTypes:[],
			}
		},
		computed:{
            ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),  //by default th computed property name will be the same as it is named in getters in store

		},
		methods:{
            ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
            selectJobType(){
                this.$router.push({name : "JobResults"});
                this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
              }
		}

    };
</script>

<style scoped>

</style>
