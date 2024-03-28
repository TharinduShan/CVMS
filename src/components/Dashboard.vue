<script setup>
import cvItemtemplete from './cvItemFormat.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
</script>
<template>
    <div id="dashboard">
        <ul >
            <li v-for="cv in cvLsit" v-bind:key="cv.doc_id">
                <cvItemtemplete>
                    <template #icon>
                    <DocumentationIcon />

                    </template>
                    <template #image>
                        <img :src="cv.data.imgUrl" :alt="cv.data.lastName" width="100">
                    </template>
                    <template #heading>{{ cv.data.middleName }} {{ cv.data.lastName }}</template>
                    {{ cv.data.email }}
                    
                    <template #limit>
                        <RouterLink v-bind:to="{name:'viewcv', params:{id:cv.doc_id}}">View</RouterLink>
                    </template>
                    
                </cvItemtemplete>
            </li>
        </ul>
        
    </div>
</template>
<script>
import db from './config'
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default {
    name:'dashboard',
    data() {
        return {
            cvLsit:[]
        }
    },
    created() {
        getDocs(collection(db,"cvperson")).then
        (snap=>{ 
            snap.forEach(doc=>{
                const data = {
                    'doc_id':doc.id,
                    'data':doc.data()
                }
                this.cvLsit.push(data)
        })
    }).catch(async(error)=>{
        console.error(error)
    })
    },
}
</script>

<style scoped>
    li {
        list-style: none;
        padding-bottom: 1em;
    }
</style>