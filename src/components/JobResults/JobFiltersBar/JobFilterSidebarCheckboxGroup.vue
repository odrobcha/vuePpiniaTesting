<template>
	<collapsible-accordion  :header="header">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li v-for= "value in uniqueValues" :key = "value" class="h-8 w-1/2">
						<input
								:id="value"
								v-model="selectedValues"
								:value ="value"
								@change ="selectValue"
								type="checkbox"
								class="mr-3"
						/>
						<label :for="value"> {{value}}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</collapsible-accordion>
</template>

<script setup>
    import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';
    import {ref} from 'vue';
    import {useRouter} from "vue-router";
    const router = useRouter();
	const props = defineProps({
		header: {
		    type: String,
			required: true
		},
		uniqueValues: {
		    type: Set,
			required: true,
		},
		action: {
		    type: Function,
			required: true
		}
	});
    const selectedValues = ref([]);
    const selectValue = ()=>{
        props.action(selectedValues.value);
        router.push({name : "JobResults"});
    }

</script>

<style scoped>

</style>
