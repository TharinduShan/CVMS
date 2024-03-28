

<template>
    <!-- SECTION 3 -->
    <h4>Skills</h4>
    <section>
        <form class="needs-validation" novalidate>
            <div class="" id="skillCom">
                <div class="input_fields_wrap skill">
                    <div>
                        <input type="text" class="form-control col-5" id="LanNameBox" placeholder="Skill Name"
                            v-bind:class="{ active: new_skill }" v-model="new_skill" v-on:keyup.enter="onsubmitSkill">
                        <input type="text" class="form-control col-5" id="LanlevelBox" placeholder="Skill level 1-100"
                            v-bind:class="{ active: new_level }" v-model="new_level" v-on:keyup.enter="onsubmitSkill">
                        <!--add more-->
                        <div class="btn1 btn-add" v-bind:class="{ active: (new_skill && new_level) }" @click="onsubmitSkill">
                            +
                        </div>
                    </div>
                </div>
                <div v-if="skillsArr.length > 0">
                    <h6 class="status busy">{{ skillsArr.length }} Skill<span v-if="skillsArr.length > 1">s</span></h6>
                    <transition-group name="skill-item" tag="ul" class="language-list row">
                        <li v-for="(skill, index) in skillsArr" :key="index" class="col-2">
                            <label></label>
                            <span class="language-text">{{ skill.name }}</span>
                            <span class="language-text">{{ skill.level }}%</span>
                            <span class="delete" @click="deleteSkills(skill)"></span>
                        </li>
                    </transition-group>
                </div>
            </div>

        </form>
    </section>
    <button class="btn1 btn-add m-3 float-left active" @click="backTo">Back
    </button><button class="btn1 btn-add m-3 float-right" v-bind:class="{ active: skillsArr.length > 0 }" @click="nextTo">Next
    </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const emit = defineEmits(['skillsObj','backTo'])

const props = defineProps({
    new_cv: {
        type: Object,
        required: true
    },
    
})

const new_skill = ref('')
const new_level = ref('')
const skillsArr = ref([])

watchEffect(()=>{
    if(props.new_cv.skills){
        skillsArr.value = props.new_cv.skills
    }
})

const backTo = () => {
    emit('backTo', skillsArr)
}

const nextTo = () => {
    emit('skillsObj', skillsArr)
}

const onsubmitSkill = () => {
    if (new_skill.value !== "" && new_level.value !== "") {
        skillsArr.value.push({
            "id": skillsArr.value.length,
            "name": new_skill.value,
            "level": new_level.value
        })
        
        new_skill.value = ''
        new_level.value = ''
    }


}
const deleteSkills = (item) => {
    skillsArr.value.splice(skillsArr.value.indexOf(item), 1);
}
</script>