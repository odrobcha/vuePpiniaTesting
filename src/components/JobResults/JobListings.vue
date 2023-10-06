<template>
	<main class="flex-auto bg-brand-gray-2 p-8 ">
		<ol>
			<JobListing
					v-for="job in displayedJobs"
					:key="job.id"
					:job = "job"
			>
			</JobListing>
		</ol>
		<div class="mx-auto mt-8">
			<div class="flex flex-row flex-nowrap">
				<p class="flex-grow text-sm">Page {{currentPage}}</p>
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

<script>
	import {mapActions, mapState} from 'pinia';
    import JobListing from './JobListing.vue';
  //  import axios from 'axios';
	import {useJobsStore, FETCH_JOBS, FILTERED_JOBS} from '../../stores/jobs';

    export default {
        name: 'JobListings',
        components: { JobListing },
        async mounted(){
            const baseUrl = import.meta.env.VITE_APP_API_URL; //depend on environment. Syntaxys to get EV variabledependes on envirenment only for VITE
            /*
            ENV
            -- development --> has hot module reloading option (for example)
            -- production --> has reduce file size option (for example)
			-- test --> has testing option
             */
            // try{
            //     const response = await axios.get(`${baseUrl}/jobs`);
            //     this.jobs = response.data;
			// } catch (error){
            //     console.log(error)
			// }
            // const response = await axios.get(`${baseUrl}/jobs`);
			// this.jobs = response.data;

			this.FETCH_JOBS();
        },
		data(){
            return{
               // jobs:[],
			}
		},

		computed:{
                             //this means : this.jobs is equal to useJobsStore.jobs
            currentPage(){
                return  Number.parseInt(this.$route.query.page || "1")
            },
			previousPage(){
              const previousPage = this.currentPage - 1;
              const firstPage = 1;
              return previousPage >= firstPage ? previousPage : undefined
			},
            ...mapState(useJobsStore, { //1 arg - storeName,
             //   jobs: "jobs",        //2 - object. property name is top level property we want to be availble in THIS component, value - is the name of of property from the store
                FILTERED_JOBS,


                nextPage(){
                    const nextPage = this.currentPage + 1;
                    const lastPage = Math.ceil(this.FILTERED_JOBS.length/10);
                    return nextPage <= lastPage? nextPage : undefined;
                },
                displayedJobs(){
                    const pageNumber = this.currentPage;
                    const firstJobIndex = (pageNumber - 1)* 10;
                    const lastJobIndex = pageNumber*10;
                    return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
                }
            }),
		},

		methods:{
            ...mapActions(useJobsStore, [FETCH_JOBS]),
		}

    };
</script>

<style scoped>

</style>
