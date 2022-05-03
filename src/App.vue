<template>
  <div style="padding-bottom: 100px;">
    <div>Hello World</div>
    <OptionApi />
    <CompositionApi />
    <QueryComponent />
  </div>
</template>

<script>
import OptionApi from "./components/OptionApi.vue";
import CompositionApi from "./components/CompositionApi.vue";
import QueryComponent from "./components/QueryComponent.vue";

export default {
  name: "App",
  components: {
    OptionApi,
    CompositionApi,
    QueryComponent
  },
};
</script>

<style>
</style>
