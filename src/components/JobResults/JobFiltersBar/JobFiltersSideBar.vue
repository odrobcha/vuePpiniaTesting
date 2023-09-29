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

			<collapsible-accordion v-for = "item in accordion"  :key = "item.header" :header="item.header">
				<div class="mt-5">
					<fieldset>
						<ul class="flex flex-row flex-wrap">
							<li v-for= "type in item.types" :key = "type" class="h-8 w-1/2">
								<input :id="type" type="checkbox" class="mr-3"/>
								<label :for="type"> {{type}}</label>
							</li>
						</ul>
					</fieldset>
				</div>

			</collapsible-accordion>


		</section>
	</div>

</template>

<script>
	import ActionButton from '../../Shared/ActionButton.vue';
    import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';
    export default {
        name: 'JobFiltersSideBar',
        components: { CollapsibleAccordion, ActionButton },
		data(){
            return{
				accordion: [
					{header: "Organization", types : ["VueTube", "Bettween Vue", "Et Vue Brute", 'Vue and Half Man']},
					{header: "City", types : ["Gent", "Brussels", "Lviv"]},
				]
			}
		}
    };
</script>

<style scoped>

</style>
