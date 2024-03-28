<template>
        <!-- SECTION 1 -->
        <h4>Personal Detalis</h4>
        <section>
                <form class="needs-validation" @submit.prevent="onsubmitFirst">
                        <div class="form-row"> <input type="text" class="form-control" v-model="firstName"
                                        id="firstNameBox" placeholder="First Name Ex: D.M" required> </div>
                        <div class="form-row"> <input type="text" class="form-control" v-model="middleName"
                                        id="middleNameBox" placeholder="Middle Name Ex: Sarath Kumara" required> </div>
                        <div class="form-row"> <input type="text" class="form-control" v-model="lastName"
                                        id="lastNameBox" placeholder="Last Name Ex: Dissanayaka" required> </div>
                        <div class="form-row">
                                <h6>Date of Birth :</h6> <input type="date" class="form-control" v-model="birthday"
                                        id="birthDayBox" placeholder="Date of Birth" required>
                        </div>
                        <div class="form-row"> <input type="text" class="form-control" v-model="nic" id="NICBox"
                                        placeholder="NIC" required>
                        </div>
                        <div class="form-row"> <input type="text" class="form-control" v-model="address" id="AddressBox"
                                        placeholder="Address" required>
                        </div>
                        <div class="form-row"> <input type="email" class="form-control" v-model="email" id="eamilBox"
                                        placeholder="Email" required>
                        </div>
                        <div class="form-row"> <input type="text" class="form-control" v-model="contactNo"
                                        id="contactNoBox" placeholder="Contact Number, Ex: +947********" required>
                        </div>
                        <div class="form-row"> <select v-model="gender" id="genderSelect" name="gender"
                                        class="form-control">
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                </select> </div>
                        <div class="form-row"> <textarea class="form-control" v-model="summary" id="summaryBox"
                                        placeholder="Summary About You"></textarea> </div>

                        <button class="btn1 btn-add m-3 float-right"
                                v-bind:class="{ active: (firstName && nic && middleName && lastName && birthday && nic && address && email && contactNo && gender && summary) }"
                                @click="onsubmitFirst">Next
                        </button>
                </form>
        </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue'


const props = defineProps({
        new_cv: {
                type: Object,
                required: true
        }
})


const emit = defineEmits(['personalData'])
const firstName = ref(null)
const middleName = ref(null)
const lastName = ref(null)
const birthday = ref(null)
const nic = ref(null)
const address = ref(null)
const email = ref(null)
const contactNo = ref(null)
const gender = ref(null)
const summary = ref(null)

watchEffect(() => {
        if (props.new_cv != null) {
                firstName.value = props.new_cv.firstName
                middleName.value = props.new_cv.middleName
                lastName.value = props.new_cv.lastName
                birthday.value = props.new_cv.dob
                nic.value = props.new_cv.nic
                address.value = props.new_cv.address
                email.value = props.new_cv.email
                contactNo.value = props.new_cv.contactNo
                gender.value = props.new_cv.gender
                summary.value = props.new_cv.summary
        }
})


const onsubmitFirst = () => {
        const personalData = {
                firstName: firstName.value,
                middleName: middleName.value,
                lastName: lastName.value,
                birthday: birthday.value,
                nic: nic.value,
                address: address.value,
                email: email.value,
                contactNo: contactNo.value,
                gender: gender.value,
                summary: summary.value
        }
        emit('personalData', personalData)
        

}




</script>