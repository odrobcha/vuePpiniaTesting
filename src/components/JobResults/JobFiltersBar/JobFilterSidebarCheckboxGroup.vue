<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
          <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              @change="selectValue"
              type="checkbox"
              class="mr-3"
          />
          <label :for="value"> {{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue';
import {ref, defineProps} from 'vue';
import {useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS} from "@/stores/user";
import {useRouter} from "vue-router";

const router = useRouter();

const userStore = useUserStore();
userStore.$onAction(({after, name}) => {  //after the function that should be called when name is called in pinia // to call an call back wnen the nam action is caled in pinia
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = [];
    }
  })
})

const props = defineProps({

  uniqueValues: {
    type: [Set<string> || Array<string>],
    required: true,
  },
  action: {
    type: Function,
    required: true
  }
});
const selectedValues = ref<string[]>([]);
const selectValue = () => {
  props.action(selectedValues.value);
  router.push({name: "JobResults"});
}

</script>

<style scoped>

</style>
