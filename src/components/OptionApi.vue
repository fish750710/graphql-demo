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

// ref. https://v4.apollo.vuejs.org/api/smart-query.html#options
export default {
  apollo: {
    // html 直接 call api
    // property 的 name 與 query name 不相同
    // 就必須要在 update 中指定資料
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
      // variables() {
      //   return {
      //     shortId: "zzz9999",
      //   };
      // },
      variables: {
        shortId: "zzz9999",
      },
      // update(data) {
      //   console.log('update', data);
      //   // to customize the value that is set in the vue property, for example if the field names don't match.
      //   // Assign 值給 valueByApolloOption
      //   return data.reStoreByShortId;
      // },
      update: data => data.reStoreByShortId,
      // skip() {
      //   return false; // 為 true 時會略過這個 query
      // },
      skip: () => false,
      loadingKey: "loadingCount",
    },
    // testGQL 中的 query name 也是 reStoreByShortId
    // 名稱相同會直接 mapping 就不需要
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
      // https://apollo.vuejs.org/guide/apollo/queries.html#simple-query
      this.$apollo.queries.valueByApolloOption.refetch();
    },
    async fetch() {
      // https://apollo.vuejs.org/api/dollar-apollo.html
      const result = await this.$apollo.query({
        query: testGQL,
        variables: {
          shortId: 'eed7934',
        }
      });
      console.log("res", result)
    //   result =  {
    //     "data": {
    //         "reStoreByShortId": {
    //             "__typename": "ReStore",
    //             "id": "1be08870-4919-11e8-a31f-a973693fc248",
    //             "name": "阿爾伊火鍋",
    //             "shortId": "EED7934"
    //         }
    //     },
    //     "loading": false,
    //     "networkStatus": 7
    // }
      this.valueByApolloInstance = result.data.reStoreByShortId;
    }
  }
};
</script>

<style>
</style>
