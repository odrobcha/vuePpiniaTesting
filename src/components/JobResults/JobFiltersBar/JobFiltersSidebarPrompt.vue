<template>
    <div class="flex flex-row justify-between">
        <h3 class="'my-4 text-base font-semibold">What do you want to do</h3>
        <div class="flex items-center text-sm">
            <ActionButton
                    text="Clear filter"
                    type="secondary"
                    @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
            >
            </ActionButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import ActionButton from '../../Shared/ActionButton.vue';

import {useUserStore} from '../../../stores/user';
const userStore = useUserStore();
</script>

<style scoped>

</style>