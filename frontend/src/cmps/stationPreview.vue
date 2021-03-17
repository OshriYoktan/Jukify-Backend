<template>
      <li>
        <router-link class="link" :to="'/explore/' + station._id">{{station.name}}</router-link>
      </li>
</template>

<script>
export default {
    props: ['station']
};
</script>

<style>
</style>