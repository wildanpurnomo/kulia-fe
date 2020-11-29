<template>
    <v-breadcrumbs :items="items" large>
        <template v-slot:item="item">
        <v-breadcrumbs-item
            :href="item.path"
            :disabled="item.disabled"
        >{{ item.name }}</v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
// import { EventBus } from "@/bus";

export default {
    data () {
        return{
            items: [],
        };
    },
    watch: {
        $route(){
            this.getRoute();
        },
    },
    methods: {
        getRoute() {
            this.items = this.$route.matched;
            console.log(this.$route);
        },
    },
    created () {
        this.getRoute();
    },
}
</script>