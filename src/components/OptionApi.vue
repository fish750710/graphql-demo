<template>
  <div>
    <hr />
    <div>Vue Apollo Option Api</div>
    <pre>valueByApolloOption: {{ valueByApolloOption }}</pre>
    <pre>reStoreByShortId: {{ reStoreByShortId }}</pre>
    <pre>valueByApolloInstance: {{ valueByApolloInstance }}</pre>
    <div>loadingCount: {{ loadingCount }}</div>
    <button @click="refetch">refetch valueByApolloOption</button>
    <button @click="fetch">fetch valueByApolloInstance</button>
  </div>
</template>

<script>
import gql from "graphql-tag";

import testGQL from "../apollo/test.gql";

export default {
  apollo: {
    valueByApolloOption: {
      query: gql`
        query getReStoreByShortId($shortId: String) {
          reStoreByShortId(shortId: $shortId) {
            id
            name
            shortId
          }
        }
      `,
      variables() {
        return {
          shortId: "zzz9999",
        };
      },
      update(data) {
        console.log(data);
        return data.reStoreByShortId;
      },
      skip() {
        return false; // 為 true 時會略過這個 query
      },
      loadingKey: "loadingCount",
    },
    reStoreByShortId: {
      query: testGQL,
      variables() {
        return {
          shortId: "rex0823",
        };
      },
      loadingKey: "loadingCount",
    },
  },
  data() {
    return {
      valueByApolloOption: null,
      reStoreByShortId: null,
      valueByApolloInstance: null,
      loadingCount: 0,
    };
  },
  methods: {
    refetch() {
      this.$apollo.queries.valueByApolloOption.refetch();
    },
    async fetch() {
      const result = await this.$apollo.query({
        query: testGQL,
        variables: {
          shortId: 'eed7934',
        }
      });

      this.valueByApolloInstance = result.data.reStoreByShortId;
    }
  }
};
</script>

<style>
</style>
