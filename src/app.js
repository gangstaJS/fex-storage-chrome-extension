import Vue from 'vue'
import KeysStorage from 'components/KeysStorage.vue'

Vue.use(VueReusableMaterialComponents);

new Vue({
  el: '#app',
  components: {
    KeysStorage
  },
  data() {
    return {
      test: 'Keys Storage'
    }
  }
})