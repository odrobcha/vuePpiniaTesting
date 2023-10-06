<template>
	<collapsible-accordion  header="Organizations">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li v-for= "organization in UNIQUE_ORGANIZATIONS" :key = "organization" class="h-8 w-1/2">
						<input
								:id="organization"
								v-model="selectedOrganizations"
								:value ="organization"
								@change ="selectOrganization"
								type="checkbox"
								class="mr-3"
						/>
						<label :for="organization"> {{organization}}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</collapsible-accordion>
</template>

<script>
	import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';
    import {mapState, mapActions} from 'pinia';
    import {useJobsStore, UNIQUE_ORGANIZATIONS} from '../../../stores/jobs';
    import { ADD_SELECTED_ORGANIZATIONS, useUserStore } from '../../../stores/user';

    export default {
        name: 'JobFilterSidebarOrganizations',
		components: {CollapsibleAccordion},

		data(){
            return{
                selectedOrganizations:[],
			}
		},
		computed:{
            ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),  //by default th computed property name will be the same as it is named in getters in store

		},
		methods:{
            ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
            selectOrganization(){
                this.$router.push({name : "JobResults"});
                this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
              }
		}

    };
</script>

<style scoped>

</style>
