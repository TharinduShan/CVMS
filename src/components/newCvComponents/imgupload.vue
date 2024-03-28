<template>
    <!-- SECTION 2 -->
    <h4>Profile Image</h4>
    <section>
       <div class="card">
        <div class="top">
            <!-- <p>Drag & drop</p> -->
        </div >
        <div class="drag-area" v-show="!imgSrc && !croppedImg" @dragover.prevent="onDragover" @dragleave.prevent="onDragleave" @drop.prevent="onDrop">
            <div v-if="isDragging">
                <span >
                 Drag & drop image here or
                <span class="select" role="button" @click="$refs.fileInput.click()">Choose</span>
            </span>
            </div>
            <div v-else class="select dropHere" >Drop image here </div>
            <input name="file" type="file" class="file" ref="fileInput" @change="onChageSelect">
        </div>
        <div class="container">
            <div class="image" v-show="imgSrc">
                <span class="delete" @click="deleteImg">&times;</span>
                <img  :src="imgSrc" width="720" ref="img" />
            </div>
            <div class="croppedIMg image" v-show="croppedImg">
                <span class="delete" @click="deleteImg"></span>
                <img class="croppedimg" :src="croppedImg" width="720"/>
            </div>
        </div>
       </div > 

    </section>
    <button class="btn1 btn-add m-3 float-left active" @click="backTo">Back</button>
    <button class="btn1 btn-add m-3 float-right" v-bind:class="{ active: croppedImg }" @click="nextTo">Next</button>
    <button class="btn1 btn-add m-3 float-right" @click="handleCropedImage" v-bind:class="{ active:(!croppedImg && imgSrc)}">Crop</button>

</template>

<script setup>
import { ref, onMounted, onUnmounted, watch , watchEffect } from 'vue'
import Cropper from 'cropperjs'

const props = defineProps({
    new_cv: {
        type: Object,
        required: true
    },
    
})


const imgSrc = ref(null)
const selectedImg = ref(null)
const fileInput = ref(null)
const isDragging = ref(true)
const img = ref(null)
const fileReader = new FileReader()
let cropper = null
const croppedImg = ref(props.new_cv.imgUrl)

const emit = defineEmits(['files-dropped', 'imgData', 'backTo'])



 const nextTo = () =>{
    emit('imgData', croppedImg)
 }

 const backTo = () => {
    emit('backTo', croppedImg)
    console.log("back")
}

const handleCropedImage = () => {
    croppedImg.value = cropper.getCroppedCanvas({
        width: 720,
        height: 480
    }).toDataURL()      
    cropper.destroy();
    imgSrc.value = null
}

fileReader.onload = (evnt) => {
    imgSrc.value = evnt.target.result
}

onMounted(() =>{
    cropper = new Cropper(img.value,{
          aspectRatio: 3/2,
          minCropBoxWidth: 720,
          minCropBoxHeight: 480,
          viewMode: 3,
          dragMode: 'move',
          background: false,
          cropBoxMovable: true,
          cropBoxResizable: false,
          data:{
            width: 720,
            height: 480
          }
    })

    croppedImg.value = props.new_cv.imgUrl

})

onUnmounted(()=>{
    cropper.destroy();
}) 

watchEffect(() => {
    if(props.new_cv.imgUrl){
        croppedImg.value = props.new_cv.imgUrl
    }
    if(selectedImg.value){
        fileReader.readAsDataURL(selectedImg.value)
    }else{
        imgSrc.value = null
    }
})

watch(
    imgSrc, 
    () => {
        if(imgSrc.value){
            cropper.replace(imgSrc.value)
        }
    },{
        flush: 'post'
    }
)

const onChageSelect = (e) => {
    const file = e.target.files || e.dataTransfer.files;
    if (file[0].type.split("/")[0] == "image") {
        selectedImg.value = file[0]
    }
    else {
        alert("Not a image file..!")
    }
    
}
const deleteImg = () => {
    imgSrc.value = null
    cropper.destroy();
    selectedImg.value = null
    croppedImg.value = null
    props.new_cv.imgUrl = ''
}
const onDragover = (e) =>{
    e.preventDefault();
    isDragging.value = false;
}
const onDragleave = (e) => {
    e.preventDefault();
    isDragging.value = true;
    
}

const onDrop = (e)=>{
    e.preventDefault();
    isDragging.value = true;
    emit('files-dropped', [e.dataTransfer.files])
    onChageSelect(e)


}



</script>
<style scoped>
div.croppedIMg .delete:after{
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    background-image: url('https://nourabusoud.github.io/vue-todo-list/images/trash.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform: translate(-50%, -50%) scale(0.9);
    transition: all ease-in 0.25s;
  }
div.croppedIMg:hover .delete {
    width: 50px;
    opacity: 1;
}
div.croppedIMg .delete {
    position: absolute;
    height: 100%;
    top: 50%;
    right: 0;
    transform: translateY();
    cursor: pointer;
    opacity: 0;
    width: 0;
    background-color: #f56468;
    color: #fff;
    transition: all ease-in 0.25s;

}
.card .croppedimg {
    width: 100%;
}
.card .dropHere {
    transition: 0.9s;
    scale: 120%;
}
.card {
    width: 100%;
    padding: 2px;
    border-radius: 5px;
    overflow: hidden;
}
.card .container .image {
    width: 40%;
    margin-right: 5px;
    height: auto;
    position: relative;
    margin-bottom: 5px;
}

.card button {
    outline: 0;
    border: 0;
    color: #f4f3f9;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    width: 10%;
    background: #6645eb;
    align-self: center;
}

.card .drag-area {
    height: 150px;
    border-radius: 5px ;
    border: 2px dashed #6645eb;
    background: #f4f3f9;
    color: #6645eb;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: center;
    -webkit-user-select: none;
    margin-top: 10px;
    transition: 0.6s;
}

.card .drag-area .visible{
    font-size: 18px;
}
.card .select {
    color: #1e1eeb;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;

}
.card .select:hover {
    opacity: 0.6;
}

.card .container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 200px;
    position: relative;
    margin-bottom: 8px;
}
img {
    align-self: center;
}
.card .container .image span {
    position: absolute;
    top: -2px;
    font-size: 20px;
    cursor: pointer;
}
.card input, .card .drag-area .on-drop, .card .drag-area.dragover .visible {
    display: none;
}
span .delete {
    z-index: 1;
    color: #eb4545;
    left: -15px;
    transition: 0.4s;
}
span .delete:hover{
    opacity: 0.6;
    cursor: pointer;
}
</style>
