<template>
  <div class="index">
  	<questionnaire-survey></questionnaire-survey>
  </div>
</template>

<script>
import QuestionnaireSurvey from './components/QuestionnaireSurvey'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  mounted(){
  },
  components:{
  	QuestionnaireSurvey
  }
}
</script>

<style scoped>
.index{
	height: 100%;
}
</style>
