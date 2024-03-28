<template>
    <!--section 6-->
    <h4>Education & Other activities</h4>
    <section>
        <div id="Education_others_com">
            <form class="needs-validation" novalidate>
                <div class="form-row"> <input type="text" class="form-control" id="qualificationNameBox"
                        placeholder="Name of qualification, ex: General certificate of education (advance level) examination. "
                        v-model="new_edu_name">
                </div>
                <div class="form-row"> <input type="text" class="form-control" id="instituteNameBox"
                        placeholder="Name of Institute or School" v-model="new_institute">
                </div>
                <div class="form-row"> <input type="text" class="form-control" id="qualiYearBox" placeholder="Year"
                        v-model="new_duration">
                </div>
                <div class="form-row"> <label for="check current job ">Still doing ? <input type="checkbox"
                            id="currentEduBox" placeholder="Current" v-model="new_isCurrent"></label>
                </div>
                <div class="form-row"> <label for="check current job ">Add Subjects & Grades <input type="checkbox"
                            v-model="new_isAddSub"></label>
                </div>
                <div class="needs-validation input_fields_wrap" v-if="new_isAddSub">
                    <div class="form-row"> <input type="text" class="form-control" id="qualiIndexNoBox"
                            placeholder="Index Number" v-model="new_index_no">
                    </div>
                    <div class="skill">
                        <div>
                            <input type="text" class="form-control col-5" id="subNameBox" placeholder="Subject Name"
                                v-model="new_sub_name" v-on:keyup.enter="onsubmitSub">
                            <input type="text" class="form-control col-5" id="LanlevelBox"
                                placeholder="Grade Ex: 'A','B'" v-model="new_sub_grade" v-on:keyup.enter="onsubmitSub">
                            <!--add more-->
                            <div class="btn1 btn-add" title="ctrl++" @click="onsubmitSub"
                                v-bind:class="{ active: (new_sub_name && new_sub_grade) }">+
                            </div>
                        </div>
                    </div>
                    <div v-if="subArr.length > 0">
                        <h6 class="status busy">{{ subArr.length }} subject<span v-if="subArr.length > 1">s</span>
                        </h6>
                        <transition-group name="language-item" tag="ul" class="language-list">
                            <li v-for="(sub, index) in subArr" :key="index">
                                <span class="language-text">{{ sub.name }} / {{ sub.grade }}</span>
                                <span class="delete" @click="deleteSub(sub)"></span>
                            </li>
                        </transition-group>
                    </div>
                </div>
                <div class="form-row"> <textarea type="text" class="form-control" id="qualiDescriptionBox"
                        placeholder="Describe your qualification" v-model="new_description"></textarea>
                </div>
                <div class="form-row">
                    <div class="btn1 btn-add" @click="onsubmitEdu"
                        v-bind:class="{ active: (new_edu_name && new_institute) }">+
                    </div>
                </div>
            </form>
            <div v-if="eduArr.length > 0">
                <h6 class="status busy">{{ eduArr.length }} Education/course<span v-if="eduArr.length > 1">s
                    </span></h6>
                <transition-group name="language-item" tag="ul" class="language-list row">
                    <li class="col-12" v-for="(edu, index) in eduArr" :key="index">
                        <span class="language-text"><strong v-if="edu.isCurrent">Current</strong> {{ edu.name }} At
                            {{ edu.institute }} ({{ edu.duration }})</span>
                        <br />
                        <span class="language-text">
                            <ul v-for="sub in edu.subjects" class="block">
                                <li> {{ sub.name }} - {{ sub.grade }} </li>
                            </ul>
                        </span><br/>
                        <span class="language-text">{{ edu.description }}</span><br>
                        <span @click="selctBack(edu)"><strong>Edit</strong></span>
                        <span class="delete" @click="deleteEdu(edu)"></span>
                    </li>
                </transition-group>
            </div>
        </div>
    </section>
    <button class="btn1 btn-add m-3 float-left active" @click="backTo">Back
    </button><button class="btn1 btn-add m-3 float-right" v-bind:class="{ active: eduArr.length > 0 }"
        @click="nextTo">Submit
    </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const emit = defineEmits(['eduObj', 'backTo'])
const new_edu_name = ref('')
const new_institute = ref('')
const new_duration = ref('')
const new_isCurrent = ref(false)
const new_isAddSub = ref(false)
const new_index_no = ref('')
const new_description = ref('')
const new_sub_name = ref('')
const new_sub_grade = ref('')
const subArr = ref([])
const eduArr = ref([])

const props = defineProps({
    new_cv: {
        type: Object,
        required: true
    },

})

watchEffect(() => {
    if (props.new_cv.education_others) {
        eduArr.value = props.new_cv.education_others
    }
})



const backTo = () => {
    emit('backTo', eduArr)
}

const nextTo = () => {
    emit('eduObj', eduArr)
}

const onsubmitSub = () => {
    if (new_sub_name.value !== "" && new_sub_grade.value !== "") {
        subArr.value.push({
            "id": subArr.value.length,
            "name": new_sub_name.value,
            "grade": new_sub_grade.value
        })
        new_sub_name.value = ''
        new_sub_grade.value = ''
    }
}

const onsubmitEdu = () => {
    if (new_edu_name.value !== "" && new_institute.value !== "") {
        console.log("in if")
        eduArr.value.push({
            "id": eduArr.value.length,
            "name": new_edu_name.value,
            "institute": new_institute.value,
            "duration": new_duration.value,
            "isCurrent": new_isCurrent.value,
            "result_index": new_index_no.value,
            "subjects": subArr.value,
            "description": new_description.value,
        })
        new_edu_name.value = ''
        new_institute.value = ''
        new_duration.value = ''
        new_isCurrent.value = false
        new_isAddSub.value = false
        new_index_no.value = ''
        new_description.value = ''
        new_sub_name.value = ''
        new_sub_grade.value = ''
        subArr.value = []

    }


}
const selctBack = (item) => {
    new_edu_name.value = item.name
    new_institute.value = item.institute
    new_duration.value = item.duration
    new_isCurrent.value = item.isCurrent
    new_isAddSub.value = true
    new_index_no.value = item.result_index
    new_description.value = item.description
    subArr.value = item.subjects

    deleteEdu(item)

}

const deleteSub = (item) => {
    console.log(item)
    subArr.value.splice(subArr.value.indexOf(item), 1);
}

const deleteEdu = (item) => {
    eduArr.value.splice(eduArr.value.indexOf(item), 1);
}

</script>