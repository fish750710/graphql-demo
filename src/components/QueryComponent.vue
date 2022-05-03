<template>
  <div>
    <hr />
    <div>Vue Apollo Query Component</div>
    <ApolloQuery
      :query="
        (gql) => gql`
          query getReStoreByShortId($shortId: String) {
            reStoreByShortId(shortId: $shortId) {
              id
              name
              shortId
            }
          }
        `
      "
      :variables="{ shortId: 'zzz9999' }"
    >
      <template v-slot="{ result: { error, data }, isLoading, query, times, gqlError }">
        <!-- Loading -->
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred {{ gqlError }}</div>

        <!-- Result -->
        <pre v-else-if="data" class="result apollo">reStoreByShortId: {{ data.reStoreByShortId }}</pre>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>

        <button @click="query.refetch()">refetch {{ times }}</button>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { ApolloQuery } from "@vue/apollo-components";
// import gql from "graphql-tag";

// ref. https://v4.apollo.vuejs.org/api/apollo-query.html
export default {
  components: {
    ApolloQuery,
  },
};
</script>

<style lang="scss" scoped>
</style>