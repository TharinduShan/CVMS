<template>
    <!-- SECTION 5 -->
    <h4>Experience</h4>
    <section>
        <div id="workXpCom">
            <form class="needs-validation" novalidate>
                <div class="form-row"> <input type="text" class="form-control" id="designationBox"
                        placeholder="Designation" v-model="new_designation">
                </div>
                <div class="form-row"> <input type="text" class="form-control" id="organizationBox"
                        placeholder="Name of Institution" v-model="new_institite"> </div>
                <div class="form-row"> <input type="text" class="form-control" id="durationBox"
                        placeholder="Duration (Month-Year)" v-model="new_duration"> </div>
                <div class="form-row"> <label for="check current job ">Is Current Job ? <input type="checkbox"
                            id="currentJobBox" placeholder="Is Current Job ?" v-model="new_isCurrent"></label> </div>
                <div class="form-row"> <textarea type="text" class="form-control" id="jobDescriptionBox"
                        placeholder="Description" v-model="new_description"></textarea> </div>
                <div class="form-row">
                    <div class="btn1 btn-add" @click="onsubmitXps" v-bind:class="{ active: (new_designation && new_institite) }">+
                    </div>
                </div>

            </form>
            <div v-if="xpsArr.length > 0">
                <h6 class="status busy">{{ xpsArr.length }} Work Experience<span v-if="xpsArr.length > 1">s
                    </span></h6>
                <transition-group name="language-item" tag="ul" class="language-list row">
                    <li class="col-12" v-for="(xp, index) in xpsArr" :key="index">
                        <span class="language-text"><strong v-if="xp.isCurrent">Current</strong> {{ xp.designation }} / {{ xp.institute }} ({{ xp.duration }})</span>
                        <div class="language-text">{{ xp.description }}</div>
                        <span class="delete" @click="deleteXps(xp)"></span>
                    </li>
                </transition-group>
            </div>
        </div>
    </section>
    <button class="btn1 btn-add m-3 float-left active" @click="backTo">Back
    </button><button class="btn1 btn-add m-3 float-right" v-bind:class="{ active: xpsArr.length > 0 }"
        @click="nextTo">Next
    </button>
</template>

<script setup>

import { ref, watchEffect } from 'vue'

const emit = defineEmits(['xpsObj', 'backTo'])
const new_designation = ref('')
const new_institite = ref('')
const new_duration = ref('')
const new_isCurrent = ref(false)
const new_description = ref('')
const xpsArr =ref([])

const props = defineProps({
    new_cv: {
        type: Object,
        required: true
    },

})

watchEffect(()=> {
    if(props.new_cv.workXps){
        xpsArr.value = props.new_cv.workXps
    }
})


const backTo = () => {
    emit('backTo', xpsArr)
}

const nextTo = () => {
    emit('xpsObj', xpsArr)
}

const onsubmitXps = () => {
    if (new_designation.value !== "" && new_institite.value !== "") {
        xpsArr.value.push({
            id: xpsArr.value.length,
            designation: new_designation.value,
            institute: new_institite.value,
            duration: new_duration.value,
            isCurrent: new_isCurrent.value,
            description: new_description.value,
        })

        new_designation.value = ''
        new_institite.value = ''
        new_duration.value = ''
        new_isCurrent.value = false
        new_description.value = ''
    }


}
const deleteXps = (item) => {
    xpsArr.value.splice(xpsArr.value.indexOf(item), 1);
}

</script>

<style scoped>
</style>