<template>
	<header-container>
		<template v-slot:title>
			<h1 class="w-full text-4xl font-normal">Teams </h1>
		</template>
		<template #subtitle>
			<h2 class="my-4 w-full text-base font-light">Join us Join us Join us Join us Join us </h2>
		</template>
	</header-container>
</template>

<script>
    import HeaderContainer from '../components/Shared/HeaderContainer.vue';
    export default {
        name: 'TeamsView',
        components: { HeaderContainer }
    };
</script>

<style scoped>

</style>
