
<template>
    <!-- SECTION 4 -->
    <h4>Languages</h4>
    <section>
        <form class="needs-validation" novalidate>
            <div class="" id="languageCom">
                <div class="input_fields_wrap language">
                    <div>
                        <input type="text" class="form-control col-5" id="LanNameBox" placeholder="Language Name"
                            v-model="language" v-on:keyup.enter="submitLanguage">
                        <input type="text" class="form-control col-5" id="LanlevelBox" placeholder="Language level 1-100"
                            v-model="level" v-on:keyup.enter="submitLanguage">
                        <!--add more-->
                        <div class="btn1 btn-add" v-bind:class="{ active: (language && level) }" @click="submitLanguage">+
                        </div>
                    </div>
                </div>
                <div v-if="languageArr.length > 0">
                    <h6 class="status busy">{{ languageArr.length }} Language Skill<span
                            v-if="languageArr.length > 1">s</span></h6>
                    <transition-group name="language-item" tag="ul" class="language-list row">
                        <li v-for="(lan, index) in languageArr" v-bind:key="index" class="col-2">
                            <label></label>
                            <span class="language-text">{{ lan.name }}</span>
                            <span class="language-text">{{ lan.level }}%</span>
                            <span class="delete" @click="deleteLan(lan)"></span>
                        </li>
                    </transition-group>
                </div>
            </div>

        </form>
    </section>
    <button class="btn1 btn-add m-3 float-left active" @click="backTo">Back
    </button><button class="btn1 btn-add m-3 float-right" v-bind:class="{ active: languageArr.length > 0 }"
        @click="nextTo">Next
    </button>
</template>

<script setup>
import { ref, defineEmits, watchEffect } from 'vue'
const emit = defineEmits(['languagesObj', 'backTo'])

const languageArr = ref([])
const language = ref('')
const level = ref('')

const props = defineProps({
    new_cv: {
        type: Object,
        required: true
    },
    
})

watchEffect(()=>{
    if(props.new_cv.languages){
        languageArr.value = props.new_cv.languages
    }
})

const backTo = () => {
    emit('backTo', languageArr)
}

const nextTo = () => {
    emit('languagesObj', languageArr)
}


const submitLanguage = () => {
    if (language.value !== '' && level.value !== '') {
        languageArr.value.push({
            id: languageArr.value.length,
            name: language.value,
            level: level.value
        })
        language.value = ''
        level.value = ''
    }
}
const deleteLan = (item) => {
    languageArr.value.splice(languageArr.value.indexOf(item), 1);
}
</script>