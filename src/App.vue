<template>
  <div id="app" class="container">
    <nav class="navbar navbar-default navbar-fix-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">PicRepo</a>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <h4>{{ msg1 }}</h4>
                <hr>
                <div class="list-group" v-for="(val, key) in groupList">
                      <a href="#" class="list-group-item" v-bind:class="{active: key == groupSelected}" v-on:click="changeRepo(key)">{{key}}<span class="badge">{{val}}</span></a>
                </div>
            </div>
            <div class="col-md-9">
                <h4>{{ msg2 }}</h4>
                <hr>
                <div v-for="(item, index) in selectedPicRepo">
                    <img v-bind:src="item.path" alt="image with thumbnail corners" class="img-thumbnail">
                    <p class="my-pic-lable">{{index + 1}} / {{lengthOfThisFolder}}</p>
                </div>
                
                <br>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg1: 'Repo List',
      msg2: 'Welcome & Enjoy yourself',
      picInfos: [],
      apiUrl: './assets/pic.json',
      groupSelected: "test-g1"
    }
  },
  methods: {
      getJsonData: function() {
			this.$http.get(this.apiUrl)
				.then((response) => {
                    // console.log(response.data);
                    this.picInfos = response.data
				})
				.catch(function(response) {
					console.log(response)
				})
      },
      changeRepo: function(repoName) {
          // console.log(repoName);
          this.groupSelected = repoName;
      }
  },
  computed: {
    groupList: function() {
        var temp = [];
        for (let item of this.picInfos) {
            if (temp.indexOf(item.folder) == -1) {
                temp.push(item.folder);
            }
        }
        var res = {};
        for (let item of this.picInfos) {
            if (item.folder in res){
                res[item.folder] += 1
            } else {
                res[item.folder] = 1
            }
        }
        return res;
    },
    selectedPicRepo: function() {
        var temp = [];
        for (let item of this.picInfos) {
            if (item.folder == this.groupSelected) {
                temp.push(item);
            }
        }
        return temp;
    },
    lengthOfThisFolder: function() {
        return this.selectedPicRepo.length
    }
  },
  mounted: function() {
      // console.log("initial rendering is over");
      this.getJsonData();
  }
}
</script>

<style>
</style>
