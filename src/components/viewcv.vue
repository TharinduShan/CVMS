<template>
  <div id="view-cv">
    <div class="w3-light-grey">
      <!-- Page Container -->
      <div class="w3-content w3-margin-top" style="max-width: 1400px" id="cvApp">
        <!-- The Grid -->
        <div class="w3-row-padding">
          <!-- Left Column -->
          <div class="w3-third">
            <div class="w3-white w3-text-grey w3-card-4">
              <div class="w3-display-container">
                <img :src="data.imgUrl" style="width: 100%" :alt="data.middleName" />
                <div class="w3-display-bottomleft w3-container w3-text-black">
                  <h6 class="w3-text-white">
                    <strong>{{ data.middleName }} {{ data.lastName }}</strong>
                  </h6>
                </div>
              </div>
              <div class="w3-container">
                <p>
                  <i class="fa fa-user fa-fw w3-margin-right w3-text-blue w3-large"></i>{{ data.fistName }} {{
                    data.middleName }}
                  {{ data.lastName }}
                </p>
                <p>
                  <i class="fa fa-home fa-fw w3-margin-right w3-text-blue w3-large"></i>{{ data.address }}
                </p>
                <p>
                  <i class="fa fa-envelope fa-fw w3-margin-right w3-text-blue w3-large"></i>{{ data.email }}
                </p>
                <p>
                  <i class="fa fa-phone fa-fw w3-margin-right w3-text-blue w3-large"></i>{{ data.contactNo }}
                </p>
                <p>
                  <i class="fa fa-birthday-cake w3-margin-right w3-text-blue w3-large"></i>{{ data.dob }}
                </p>
                <hr />
                <!-- <i class="fas fa-hourglass-start"></i> -->
                <p class="">
                  <b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-blue"></i>Skills</b>
                  <draggable v-model="data.skills">
                    <template #item="{ element: skill }">
                      <div>
                        <p>{{ skill.name }}</p>
                        <div class="w3-light-grey w3-round-xlarge w3-small">
                          <div class="w3-container w3-center w3-round-xlarge w3-blue"
                            :style="{ width: skill.level + '%' }">
                            {{ skill.level }}%
                          </div>
                        </div>
                      </div>

                    </template>

                  </draggable>
                </p>


                <br />

                <p class="w3-text-theme">
                  <b><i class="fa fa-globe fa-fw w3-margin-right w3-text-blue"></i>Languages</b>
                </p>
                <draggable v-model="data.languages">
                  <template #item="{ element: lan }">
                    <div>
                      <p>{{ lan.name }}</p>
                      <div class="w3-light-grey w3-round-xlarge w3-small">
                        <div class="w3-container w3-center w3-round-xlarge w3-blue" :style="{ width: lan.level + '%' }">
                          {{ lan.level }}%
                        </div>
                      </div>
                    </div>
                  </template>
                </draggable>

                <br />
              </div>
            </div>
            <br />
            <div class="w3-container w3-margin-top w3-white w3-text-grey w3-card-4">
              <p>
                CV Attachment
                <a href="#"><i class="fas fa-cloud-download-alt w3-right w3-hover-opacity w3-text-blue"></i></a>
              </p>
              <p>
                <i class="fas fa-print w3-hover-opacity" onclick="window.print();"></i>
              </p>
            </div>

            <!-- End Left Column -->
          </div>

          <!-- Right Column -->
          <div class="w3-twothird">
            <div class="w3-container w3-card w3-white w3-margin-bottom">
              <h2 class="w3-text-grey">
                <i class="fas fa-eject fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Summary
              </h2>
              <div class="w3-container">
                <p>{{ data.summary }}</p>
              </div>
              <hr />
            </div>
            <div class="w3-container w3-card w3-white w3-margin-bottom">
              <h2 class="w3-text-grey w3-padding-16">
                <i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Work Experience
              </h2>
              <draggable v-model="data.workXps">
                <template #item="{ element: ex }">
                  <div class="w3-container">
                    <h5 class="w3-opacity"><b>{{ ex.designation }} / {{ ex.institute }}</b></h5>
                    <h6 class="w3-text-blue">
                      <i class="fa fa-calendar fa-fw w3-margin-right"></i>{{ ex.duration }}
                      <span class="w3-tag w3-blue w3-round" v-if="ex.isCurrent">Current</span>
                    </h6>
                    <p>{{ ex.description }}</p>
                    <hr />
                  </div>
                </template>
              </draggable>

            </div>
            <div class="w3-container w3-card w3-white">
              <h2 class="w3-text-grey w3-padding-16">
                <i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Education
              </h2>
              <draggable v-model="data.education_others" >
                <template #item="{ element: edu }">
                  <div class="w3-container">
                    <h5 class="w3-opacity">
                      <b>{{ edu.name }}</b>
                    </h5>
                    <div class="w3-row-padding">
                      <div class="w3-third">
                        <h6 class="w3-text-blue">
                          <i class="fa fa-calendar fa-fw w3-margin-right"></i>{{ edu.duration }} <span
                            class="w3-tag w3-blue w3-round" v-if="edu.isCurrent">Current</span>
                        </h6>
                        <div v-if="edu.subjects.length !== 0">
                          <p class="w3-text-blue">Index Number : {{ edu.result_index }}</p>
                          <table>
                            <thead>
                              <th><b>Subjects</b></th>
                              <th><b>Grade</b></th>
                            </thead>
                            <tbody v-for="sub in edu.subjects">
                              <tr>
                                <td>{{ sub.name }}</td>
                                <td>{{ sub.grade }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <p>{{ edu.description }}</p>
                    <hr />
                  </div>
                </template>
              </draggable>

              <br />
            </div>

            <!-- End Right Column -->
          </div>

          <!-- End Grid -->
        </div>

        <!-- End Page Container -->
      </div>

      <footer class="w3-container w3-blue w3-center w3-margin-top">
        <!-- <p>Find me on social media.</p> -->
        <p>...</p>
        <a rel="facebook" href="#"><i
            class="fab fa-facebook w3-hover-opacity w3-xlarge w3-padding-small w3-text-white"></i></a>
        <a rel="instagram" href="#"><i
            class="fab fa-instagram w3-hover-opacity w3-xlarge w3-padding-small w3-text-white"></i></a>
        <a rel="tweeter" href="#"><i
            class="fab fa-twitter w3-hover-opacity w3-xlarge w3-padding-small w3-text-white"></i></a>
        <a rel="linkedin" href="#"><i
            class="fab fa-linkedin w3-hover-opacity w3-xlarge w3-padding-small w3-text-white"></i></a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
table thead th, table tbody td {
  padding-right: 100px;
}

@media print {
  
  #view-cv , #view-cv * {
    display: block;
  }
}

html,
body,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Roboto", sans-serif;
}

.textColorW {
  color: rgb(255, 255, 255);
}

.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px;
  /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  display: table;
  clear: both;
}

#view-cv {
  background-color: white;
  color: rgb(55, 55, 55);
  padding: 10px;
}

.w3-container p {
  margin-bottom: 5px;
  margin-top: 5px;
}
/* @page{
    size:8.3 in 11.7in;
    marks:crop;
    bleed:0.01in;
    margin:0.01in;
}  */
</style>

<script>
import draggable from 'vuedraggable'
import db from "./config";
import { collection, query, where, doc, getDoc } from "firebase/firestore";
export default {
  name: "view-cv",
  components: {
    draggable
  },
  data() {
    return {
      id: null,
      data: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    const docref = doc(db, "cvperson", to.params.id);
    getDoc(docref).then((doc) => {
      if (doc.exists()) {
        next((vm) => {
          vm.id = doc.id;
          vm.data = doc.data();
        });
      }
    });
  },
  watch: {
    $route: "fetchdata",
  },
  methods: {
    fetchdata() {
      const docref = doc(db, "cvperson", this.$route.params.id);
      getDoc(docref).then((doc) => {
        this.id = doc.id;
        this.data.push(doc.data());
      });
    },
  },
};
</script>
