<template>
	<div @click="collapsed = !collapsed" :class="['note', 'pull-right', { collapsed } ]">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Note',

		data () {
			return {
				collapsed: true
			};
		}
	};
</script>

<style lang="css" scoped>
	.note {
		color: #aa0000;
		width: 100%;
		cursor: pointer;
	}
	.note.collapsed {
		width: 10px;
		height: 10px;
		border: 1px solid #aa0000;
		border-radius: 5px;
		overflow: hidden;
		color: white;
	}
</style>
