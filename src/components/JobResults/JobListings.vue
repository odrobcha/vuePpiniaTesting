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
    import JobListing from './JobListing.vue';
    import axios from 'axios';
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
            const response = await axios.get(`${baseUrl}/jobs`);
            this.jobs = response.data;
        },
		data(){
            return{
                jobs:[],
			}
		},

		computed:{
            currentPage(){
                return  Number.parseInt(this.$route.query.page || "1")
            },
			previousPage(){
              const previousPage = this.currentPage - 1;
              const firstPage = 1;
              return previousPage >= firstPage ? previousPage : undefined
			},

			nextPage(){
                const nextPage = this.currentPage + 1;
                const lastPage = Math.ceil(this.jobs.length/10);

                return nextPage <= lastPage? nextPage : undefined;
			},
            displayedJobs(){
                const pageNumber = this.currentPage;
                const firstJobIndex = (pageNumber - 1)* 10;
                const lastJobIndex = pageNumber*10;
                return this.jobs.slice(firstJobIndex, lastJobIndex);
			}
		},
    };
</script>

<style scoped>

</style>
