import { Component, Vue } from 'vue-property-decorator';

@Component({
    computed: {
        version: () => process.env.VUE_APP_VERSION,
    },
})
export default class App extends Vue { }
