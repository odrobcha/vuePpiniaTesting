<template>
	<div>
		Job Page {{jobId}}
	</div>
</template>

<script>
    export default {
        name: 'JobView',
        computed: {
            jobId () {
                return this.$route.params.id; //The same name as it is declared in router index
            }
        }
    };
</script>

<style scoped>

</style>
