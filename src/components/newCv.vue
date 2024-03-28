<template>
    <div class="container">

        <div id="wizard">
            <GeneralInfo :new_cv="new_cv" @personalData="handlePersonalInfo" v-if="steps ===0"/>
            <ImgUpload :new_cv="new_cv" @imgData="handleImgData" @backTo="handleBack" v-if="steps === 1"/>
            <Skills :new_cv="new_cv" @skillsObj="handleSkillsObj" @backTo="handleBack" v-if="steps ===2"/>
            <Languages :new_cv="new_cv" @languagesObj="handleLansObj" @backTo="handleBack"  v-if="steps ===3" />
            <Experience :new_cv="new_cv" @xpsObj="handleXpsObj" @backTo="handleBack"  v-if="steps ===4" />
            <Education :new_cv="new_cv" @eduObj="handleEduObj" @backTo="handleBack" v-if="steps ===5" />
            <!--section success-->
            
        </div>

    </div>
</template>

<script setup>
import GeneralInfo from './newCvComponents/generalInfo.vue'
import ImgUpload from './newCvComponents/imgupload.vue'
import Skills from './newCvComponents/skills.vue'
import Languages from './newCvComponents/languages.vue'
import Experience from './newCvComponents/experience.vue'
import Education from './newCvComponents/educationQli.vue'
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { doc, setDoc} from "firebase/firestore";
import db from './config'

const writeFireDb = (new_cv) => {
  setDoc(doc(db, 'cvperson', new_cv.value.nic), new_cv.value)
  .then(() => {
    toast.success("Submitted Successfully...!")
    deleteCvLocalstrorage()
    location.reload();
  })
  .catch((error) => {
    console.log(error)
    toast.error("Submitted failed...!")
  });
}



const new_cv = ref({
    "firstName":'',
    "middleName":'',
    "lastName":'',
    "dob":'',
    "nic":'',
    "address":'',
    "email":'',
    "contactNo":'',
    "gender":'',
    "summary":'',
    "imgUrl":'',
    "skills":[],
    "languages":[],
    "workXps":[],
    "education_others":[]


})
const steps = ref(0)
const handlePersonalInfo = (personalData) =>{
    new_cv.value.firstName = personalData.firstName
    new_cv.value.middleName = personalData.middleName
    new_cv.value.lastName = personalData.lastName
    new_cv.value.dob = personalData.birthday
    new_cv.value.nic = personalData.nic
    new_cv.value.address = personalData.address
    new_cv.value.email = personalData.email
    new_cv.value.contactNo = personalData.contactNo
    new_cv.value.gender = personalData.gender
    new_cv.value.summary = personalData.summary
    savedCvLocalstorage()
    steps.value++
    

}

const handleBack = (backTo) => {
  steps.value--

}

const handleEduObj = (eduObj) => {
  new_cv.value.education_others = eduObj.value
  console.log(new_cv.value)
  savedCvLocalstorage()
  writeFireDb(new_cv)
  
}

const handleXpsObj = (xpsObj) => {
  new_cv.value.workXps = xpsObj.value
  savedCvLocalstorage()
  steps.value++
}

const handleLansObj = (languagesObj) => {
  new_cv.value.languages = languagesObj.value
  savedCvLocalstorage()
  steps.value++
}

const handleSkillsObj = (skillsObj) =>{
  new_cv.value.skills = skillsObj.value
  savedCvLocalstorage()
  steps.value++

}

const handleImgData = (imgData) => {
    new_cv.value.imgUrl = imgData.value
    savedCvLocalstorage()
    steps.value++
}

onMounted(() => {
  const savedCv = JSON.parse(localStorage.getItem('cv'));
  if(savedCv){
    new_cv.value = savedCv;
  }
})
const savedCvLocalstorage = () => {
  localStorage.setItem('cv', JSON.stringify(new_cv.value));
}
const deleteCvLocalstrorage = ()=> {
  localStorage.clear('cv')
}
</script>

<style>
@import '../assets/newcv.css';


</style>