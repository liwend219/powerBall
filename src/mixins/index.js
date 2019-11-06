import { mapGetters } from "vuex";
import Vue from 'vue'
Vue.mixin({
    computed: {
        ...mapGetters([
            "$t",
            "getLanguageType"
        ])
    },
    methods:{
        test(){
            console.log('hahahah111')
            console.log(this.$t)
            console.log(this.getLanguageType)
        }
    }
})