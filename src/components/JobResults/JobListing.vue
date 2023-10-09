<template>
	<li class="mb-7">
		<router-link :to="jobPageLink"
					 class="max-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray">
			<div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
				<h2 class="mb-2 text-2xl">{{job.title}}</h2>
				<div class="flex flex-row align-middle">
					<div class="mr-5">
						<span>{{job.organization}}</span>
					</div>
					<div>
						<ul>
							<li class="mr-5 inline-block"
								v-for="location in job.locations" :key="location"
							><span>{{location}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="px-8 py-4">
				<div>
					<h3 class="mt-2 mb-2">Qualification:</h3>
					<ul class="list-disc pl-8">
						<li v-for="qalification in job.minimumQualifications"
							:key={qalification}
						>
							{{qalification}}
						</li>

					</ul>
				</div>
			</div>
			<div class="mt-2 text-center">
				<router-link :to="jobPageLink"
							 class="text-brand-blue-1"
				>
					Expand
				</router-link>

			</div>
		</router-link>
	</li>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        job: {
            type: Object,
            required: true,
        }
    });
    const jobPageLink = computed(() => {
        return `results/${props.job.id}`;
    });
</script>

<style scoped>

</style>
