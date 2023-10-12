<template>
    <div class="flex flex-col  border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
        <section class="pb-5">
            <JobFiltersSidebarPrompt/>
            <JobFiltersSidebarSkills/>
            <collapsible-accordion header="Degrees">
                <JobFiltersSidebarDegrees/>
            </collapsible-accordion>
            <collapsible-accordion header="Job types">
                <JobFiltersSidebarJobTypes/>
            </collapsible-accordion>
            <collapsible-accordion header="Organizations">
                <JobFiltersSidebarOrganizations/>
            </collapsible-accordion>
        </section>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from 'vue-router';
import {useUserStore} from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFilterSidebarCheckboxGroup from "./JobFilterSidebarCheckboxGroup.vue";
import JobFiltersSidebarJobTypes from './JobFiltersSidebarJobTypes.vue'
import JobFiltersSidebarOrganizations from './JobFiltersSidebarOrganizations.vue'
import JobFiltersSidebarDegrees from './JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue"
import JobFiltersSidebarSkills from "./JobFiltersSidebarSkills.vue"

const userStore = useUserStore();
const route = useRoute();

const parseSkillsSearchTerm = ()=>{
    const role = route.query.role as string || "";
    userStore.UPDATE_SKILLS_SEARCH_TERM(role);
}

onMounted(parseSkillsSearchTerm);

</script>

<style scoped>

</style>
