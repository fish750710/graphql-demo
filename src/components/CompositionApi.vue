<template>
  <div>
    <hr />
    <div>Vue Apollo Composition Api</div>
    <pre>reStore: {{ reStore }}</pre>
    <div>loading: {{ loading }}</div>
    <div>queryLoading: {{ queryLoading }}</div>
    <button @click="refetch({ shortId: 'ztk9711'  })">refetch</button>
  </div>
</template>

<script>
// import { ref } from 'vue';
import { useQuery, useResult, useQueryLoading } from "@vue/apollo-composable";
// import gql from "graphql-tag";

import testGQL from "../apollo/test.gql";

// ref. https://v4.apollo.vuejs.org/api/use-query.html
export default {
  setup() {
    const { result, loading, refetch } = useQuery(testGQL, { shortId: "zzz9999" });
    // console.log("ql->", useQuery(testGQL, { shortId: "zzz9999" }))
    const reStore = useResult(result, null, (data) => data.reStoreByShortId);
    // console.log("res", reStore);
    const queryLoading = useQueryLoading();

    return {
      loading,
      queryLoading,
      reStore,

      refetch,
    };
  },
};
</script>

<style>
</style>
