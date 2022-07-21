<template>
	<div>
		<div class="container">Welcome to Distributed Complaince Ledger</div>
	</div>
</template>

<script>
export default {
	name: 'Index',
	computed: {
		address() {
			return this.$store.getters['common/wallet/address']
		}
	}
}
</script>
