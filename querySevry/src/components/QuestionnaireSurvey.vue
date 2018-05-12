<template>
	<div class="pageQ">
		<div v-if='showModel' class="el-loading-mask custoMask">
			<div class="inputDialog">
				<textarea v-focus=true class="textareaDialog" rows="3" v-if='quesList[modelIndex+4].type!=5' v-on:input='inputOther(modelIndex)'  v-model='textAreaList[modelIndex]' maxLength=50></textarea>
				<textarea v-focus=true class="textareaDialog" rows="3" v-if='quesList[modelIndex+4].type==5' v-on:input='inputOther(modelIndex)'  v-model='submitInfo[modelIndex].val' maxLength=500></textarea>
				<div class='modelCountSignBox'>
					<span v-if='quesList[modelIndex+4].type!=5' class="demonstration">{{textAreaList[modelIndex].length}}/50</span>
					<span v-if='quesList[modelIndex+4].type==5' class="demonstration">{{submitInfo[modelIndex].val.length}}/500</span>
				</div>
				<div class='maskConfirmBtnBox'>
					<span @click="modelConfirmBtn" class='maskConfirmBtn'>确定</span>
				</div>
			</div>
		</div>
		<div class="header">
			<header>
				<span>{{qtitle}}</span>
				<span class="anwser-progress">({{completedNum}}/{{submitInfo.length}})</span>
				<i class="el-icon-circle-close-outline" style="float: right;margin-top: 10px;padding-right:10px;" @click="isClose"></i>
			</header>
		</div>
		<div class="section-q">
			<div class="contentBox" v-for="(value, key, index) in quesList">
				<div class="query-tit">
					<span class="tit-num">{{index+1}}.</span>
					<span v-if='value.type==4||value.type!=4' class="demonstration">
	  					<span>{{value.data.title}}</span>
						<i class="el-icon-check" v-show="completedEleList[index]"></i>
					</span>
					<i class="required-check-text" v-if='value.type==4'>(必选{{value.NeedDiamond[0]}}-{{value.NeedDiamond[1]}}个选项)</i>
				</div>
				<div class="radio-check" id="radio-check">
					<el-checkbox-group v-model='submitInfo[index].val' v-if="value.type=='3'" @change='valueChange($event,value,index)' class="font-size-com">
						<template v-for='(valueIn,keyIn) in value.data.val'>
							<el-checkbox :label='keyIn'>{{valueIn}}</el-checkbox>
							<span @click='focusModel(index)' v-for='valueFlag in submitInfo[index].val' v-if='valueIn=="其他"&&valueFlag==keyIn' class="other-check">
					    			{{textAreaList[index]}}
					    			<span v-if='textAreaList[index]==""' class='other-check-prompt'>
									请输入内容（1-50个字符）
								</span>
							</span>
						</template>
					</el-checkbox-group>
				</div>
				<el-checkbox-group v-model="submitInfo[index].val" :max="value.NeedDiamond[1]" @change='valueChange($event,value,index)' v-if="value.type=='4'" class="font-size-com">
					<template v-for='(valueIn,keyIn) in value.data.val'>
						<el-checkbox :label='keyIn'>{{valueIn}}</el-checkbox>
						<span @click='focusModel(index)' v-for='valueFlag in submitInfo[index].val' v-if='valueIn=="其他"&&valueFlag==keyIn' class="other-check">
							{{textAreaList[index]}}
							<span v-if='textAreaList[index]==""' class='other-check-prompt'>
								请输入内容（1-50个字符）
							</span>
						</span>
					</template>
				</el-checkbox-group>
				<div class="textAreaBox" @click='focusModel(index)'  v-if="value.type=='5'">
					{{submitInfo[index].val}}
					<span v-if='submitInfo[index].val==""' class='other-check-prompt'>
						请输入内容（1-500个字符）
					</span>
				</div>
				<span v-if='value.type==5' class="demonstration fr">{{submitInfo[index].val.length}}/500</span>
				<!--<span v-if='value.type==5 && 500-submitInfo[index].val.length < 0' class="demonstration fr">0/500</span>-->
			</div>
		</div>
		<div class="footer-q">
			<el-button @click="submitData" class="btn-icon" :disabled="isDisabled" type="primary">提交</el-button>
		</div>
		<div class="" >
			<el-dialog
			  :visible.sync="centerDialogVisible"
			  width="40%"
			  style="margin-top: 15vh;border-radius: 5px;"
			  center
			  :close-on-click-modal="false"
			  >
			  <span>{{tip}}</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button  v-if="isCancle" type="primary" @click="continueClick"  class="comfirmBtn" >确 定</el-button>
		    		<el-button  v-if="isContinue" @click="cancleClick" class="cancleBtn">取 消</el-button>
			    <el-button v-if="isExit" type="primary" @click="closeDialog"  class="comfirmBtn" >确 定</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>
<style type="text/css">
	.textareaDialog{
		width: 98%;
		border: 1px solid #409EFF;
		outline: none;
	}
	.textAreaBox{
		display: block;
		width: 96%;
		height: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 12px;
		overflow-y: scroll;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.inputVisibility{
		display: block;
		width: 100%;
		height: 100%;
		visibility: hidden;
	}
	.pageQ{
		height: 100%;
	}
	.pageQ .custoMask{
		background: rgba(0, 0, 0, 0.7);
		margin-top: 0;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: auto;
		padding: 0;
	}
	.inputDialog{
		width: 96%;
		/*height: 30%;*/
		padding: 10px 0;
		background: #fff;
		border-radius: 5px;
		margin:20px auto 0;
		font-size: 0;
		/*margin-top: 20px;*/
	}
	.inputDialog .el-textarea{
		width: 98%;
	}
	.maskConfirmBtnBox{
		text-align: center;
		padding: 2px 0 0;
		font-size: 0;
	}
	.maskConfirmBtn{
		padding: 6px 18px;
		display: inline-block;
		border-radius: 3px;
		background: #000;
		color: #fff;
		font-size: 14px;
	}
	.modelCountSignBox{
		text-align: right;
		padding: 0;
		padding-right: 8px;
	}
	.modelCountSignBox span{
		margin: 0;
	}
</style>
<script>
	import axios from 'axios';
	import { requestQuestion, postQuestion } from '../api/api.js';
	import utils from '../api/utils.js';
	import { hybrid } from '../api/jsBridge.js';
	export default {
		directives:{
			focus:{
				inserted:function(el,{value}){
					if(value){
						el.focus();
					}
				}
			}
		},
		data() {
			return {
				isSubmitFlag:false,
				isCancle:false,
				isContinue:false,
				isExit:false,
				centerDialogVisible:false,
				tip:'',
				sendAppType:0,
				token:'',
				Ttime:'',
				qtitle: '',
				completedNum: 0,
				completedEleList: [],
				textAreaList: [],
				submitInfo: [],
				submitInfoValArr: [],
				quesList: {},
				userinfo: {},
				getParam:{},
				postParam: {},
				isDisabled: false,
				showModel:false,
				modelTextAreaVal:'',//model 输入框的值
				modelIndex:'',//model 输入框对应第几道题
				modelInputLength:'',//model 输入框限制的输入长度
				focusFlag:true,
				checkinputlist: {}
			};
		},
		created() {
			window.sendmgs("msg:hybrid&callback=getQuestion");
			var that = this;
			var timer = setInterval(function(){
				if(window.parm){
					that.getAppParms();
					clearInterval(timer);
				}
			},100);
			this.openFullScreen2();
		},
		methods: {
			modelConfirmBtn(){//弹层确认字符校验
				if(this.quesList[this.modelIndex+4].type == 5&&this.submitInfo[this.modelIndex].val.length>500){
					this.openAlert("您输入的字符个数超过500，输入1-500之间的字符个数！",3000);
					return false;
				}
				if(this.quesList[this.modelIndex+4].type != 5&&this.textAreaList[this.modelIndex].length>50){
					this.openAlert("您输入的字符个数超过50，输入1-50之间的字符个数！",3000);
					return false;
				}
				this.showModel = false;
			},
			focusModel(index){//弹层显示传递题号事件
				this.modelIndex = index;
				if(this.quesList[index + 4].type == 5){
					this.modelInputLength = 500;
				}else{
					this.modelInputLength = 50;
				}
				this.showModel = true;
			},
			 openFullScreen2() {//loading框
		        const loading = this.$loading({
		          lock: true,
		          text: 'Loading',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		    },
			cancleClick(){//关闭按钮取消事件
				this.centerDialogVisible=false;
				this.isCancle=false;
				this.isContinue=false;
			},
			continueClick(){//关闭按钮继续事件
				this.centerDialogVisible=false;
				this.isCancle=false;
				this.isContinue=false;
				window.sendmgs("msg:hybrid&success=false");
			},
			isClose(){//关闭按钮确认弹层出现
				if(!this.isCancle){
					this.isCancle=true;
					this.isContinue=true;
				}
				this.centerDialogVisible=true;
				this.tip="您还未完成答题，是否选择离开？";
			},
			closeDialog(){//提交数据成功对话框
				if(this.sendAppType===1){
					this.centerDialogVisible=false;
					this.isCancle=false;
					this.isContinue=false;
					window.sendmgs("msg:hybrid&success=true");
					if(this.isExit){
						this.isExit=false;
					}else{
						this.isExit=true;
					}
				}else if(this.sendAppType===0){
					this.centerDialogVisible=false;
					this.isCancle=false;
					this.isContinue=false;
					window.sendmgs("msg:hybrid&success=false");
					if(this.isExit){
						this.isExit=false;
					}else{
						this.isExit=true;
					}
				}
				
			},
			requestHeader(token,Ttime){//axios请求头的设置
				axios.defaults.headers['Content-Type'] = 'application/json';
				axios.defaults.headers['Authorization'] = token;
				axios.defaults.headers['Ttime'] = Ttime;
			},
			openAlert(msg,duration) {//每道题通不过时的校验弹框
				var that = this;
				this.$message({
					message: msg,
					center: true,
					onClose: function() {
						that.isDisabled = false;
					},
					duration:duration
				});
			},
			getAppParms() {//获取参数，请求后台数据
				var objparams = window.parm;
				objparams=JSON.parse(objparams)
				this.token=objparams.token;
				this.Ttime=objparams.Ttime;
				delete objparams.token;
				delete objparams.Ttime;
				this.userinfo = objparams;
				this.requestHeader(this.token,this.Ttime);	
				requestQuestion(objparams).then(res => {
					 this.$loading().close();
					if(res.code == 200 && res.status === 0) {
						this.qtitle = res.titleHeader;
						this.quesList = res.questions;
						this.processingData();
					} 
					else if(res.name = "fail" && res.code == "-31007") {
						this.qtitle = res.titleHeader;
						this.isDisabled = true;
						this.centerDialogVisible=true;
						this.tip=res.message;
						this.isExit=true;
						this.sendAppType=0;//答题时间过期
					}
					else if(res.name = "fail" && res.code == "-31005") {
						this.isDisabled = true;
						this.centerDialogVisible=true;
						this.tip=res.message;
						this.isExit=true;
						this.sendAppType=0;//未配置答卷
					}
					else if(res.code == 400 && res.status === 1) {
						this.qtitle = res.titleHeader;
						this.isDisabled = true;
						this.centerDialogVisible=true;
						this.tip=res.message;
						this.isExit=true;
						this.sendAppType=1;//已经答过题
					}
				}).catch(error => {
					this.isDisabled = false;
					this.openAlert("请求异常",0);
					return false;
				})
			},
			postAnswer(Param) {//提交数据传递参数给后台
				for(var item in this.userinfo) {
					this.postParam[item] = this.userinfo[item];
				}
				var mdate=new Date();
				mdate=mdate.getTime();
				this.postParam.create_time=mdate;
				Param = this.postParam;
				postQuestion(Param).then(res => {
					if(res.code == 200) {
						this.centerDialogVisible=true;
						this.tip=res.message;
						this.sendAppType=1;//问卷提交成功
						this.isDisabled = true;
						this.isExit=true;
					} 
					else if(res.name=="fail"){
						this.centerDialogVisible=true;
						this.tip=res.message;
						this.sendAppType=0;
						this.isExit=true;
					}
					else if(res.code=="-31008"){
						this.centerDialogVisible=true;
						this.tip=res.message;
						this.sendAppType=1;//同一个uid已经答过题
						this.isExit=true;
					}
					else if(res.code == 400) {
						this.openAlert(res.message,3000);
					}
				})
				.catch(error => {
					this.isDisabled = false;
					this.openAlert("提交异常",3000);
					return false;
				})
			},
			inputOther(index) { //监听input输入变化做处理判断
				var completedEleList = this.completedEleList;
				var completedNum = 0;
				var quesList = this.quesList;
				var submitInfo = this.submitInfo;
				var textAreaList = this.textAreaList;
				if(quesList[index + 4].type == 3) {
					if(textAreaList[index].length >= 1) {
						this.completedEleList[index] = true;
					} else {
						this.completedEleList[index] = false;
					}
				} else if(quesList[index + 4].type == 4) {
					if(submitInfo[index].val.length > quesList[index + 4].NeedDiamond[0]) {
						this.completedEleList[index] = true;
					} else if(submitInfo[index].val.length == quesList[index + 4].NeedDiamond[0]) {
						if(textAreaList[index].length >= 1) {
							this.completedEleList[index] = true;
						} else {
							this.completedEleList[index] = false;
						}
					} else if(submitInfo[index].val.length < quesList[index + 4].NeedDiamond[0]) {
						this.completedEleList[index] = false;
					}
					
				} else if(quesList[index + 4].type == 5) {
					if(submitInfo[index].val.length >= 5) {
						this.completedEleList[index] = true;
					} else {
						this.completedEleList[index] = false;
					}
				}
				for(var i = 0; i < completedEleList.length; i++) {
					if(completedEleList[i]) {
						completedNum++;
					}
				}
				this.completedNum = completedNum;
				this.completedEleList = completedEleList;
			},
			valueChange(eventVal, value, index) {//checkbox输入框单选复选问答题答案模板事件
				var submitInfo = this.submitInfo; //提交的表单数据
				var quesList = this.quesList; //后台返回的题目列表
				var textAreaList = this.textAreaList; //暂时存储其他的输入框数据
				var index = index + 4; //题号从1开始 数组下标从0开始
				var eventVal = eventVal; //承接change时间传过来的选中的值
				var haveOther = false; //多选题选项中是否包含 ‘其他’选项  false不包含
				var completedEleList = this.completedEleList; //存储所有题目的是否答完状态 多少道题多少个布尔值
				var completedNum = 0; //
				if(value.type == 3) {
					if(eventVal.length == 0) {
						textAreaList[index - 4] = '';
						completedEleList[index - 4] = false;
						submitInfo[index - 4].val = [];
					} else if(eventVal.length == 1) {
						if(quesList[index].data.val[eventVal[0]] == '其他') {
							completedEleList[index - 4] = false;
						} else {
							completedEleList[index - 4] = true;
						}
					} else {
						submitInfo[index - 4].val = [eventVal[eventVal.length - 1]];
						if(quesList[index].data.val[eventVal[eventVal.length - 1]] == '其他') {
							completedEleList[index - 4] = false;
						} else {
							completedEleList[index - 4] = true;
						}
					}
				} else if(value.type == 4) {
					if(eventVal.length > 0) {
						for(var i = 0; i < eventVal.length; i++) {
							if(quesList[index].data.val[eventVal[i]] == '其他') {
								haveOther = true;
								if(this.checkinputlist[index]) {

								}
							}
						}
						if(!haveOther) {
							textAreaList[index - 4] = '';
						}
						if(eventVal.length >= quesList[index].NeedDiamond[0]) {
							var inEventFlag = true;
							if(eventVal.length == quesList[index].NeedDiamond[0]) {
								for(var j = 0; j < eventVal.length; j++) {
									if(quesList[index].data.val[eventVal[j]] == '其他' && textAreaList[index - 4].length < 1) {
										inEventFlag = false;
									}
								}
							}
							completedEleList[index - 4] = inEventFlag;
						} else {
							completedEleList[index - 4] = false;
						}
					} else {
						textAreaList[index - 4] = '';
						completedEleList[index - 4] = false;
					}
				} else if(value.type == 5) {
					if(eventVal.length >= 5) {
						completedEleList[index - 4] = true;
					} else {
						completedEleList[index - 4] = false;
					}
				}
				for(let i = 0; i < completedEleList.length; i++) {
					if(completedEleList[i]) {
						completedNum++;
					}
				}
				this.completedEleList = completedEleList;
				this.completedNum = completedNum;
				this.quesList = quesList;
				this.submitInfo = submitInfo;
				this.textAreaList = textAreaList;
			},
			submitData() {//答题是否通过校验事件
				this.isDisabled = true;
				var quesList = this.quesList;
				var submitInfo = this.submitInfo;
				var textAreaList = this.textAreaList;
				var submitFlag = true; //控制是否通过校验
				for(var ele in quesList) {
					var subObj = submitInfo[parseInt(ele) - 4];
					var quesObj = quesList[ele];
					if(quesObj.type == '3') {
						if(subObj.val == '') {
							submitFlag = false;
							this.openAlert('第' + (ele - 3) + '题单选题未选择',3000);
							return false;
						} else {
							if(quesObj.data.val[subObj.val] == '其他') {
								if(textAreaList[parseInt(ele) - 4] == '') {
									submitFlag = false;
									this.openAlert('第' + (ele - 3) + '题未填写其他选择',3000);
									return false;
								} else {
									if(textAreaList[parseInt(ele) - 4].length < 1) {
										submitFlag = false;
										this.openAlert('第' + (ele - 3) + '题其他信息太短',3000);
										return false;
									} else {
										subObj[subObj.val] = textAreaList[parseInt(ele) - 4]
									}
								}
							}
						}
					} else if(quesObj.type == '4') {
						var min = quesObj.NeedDiamond[0];
						var max = quesObj.NeedDiamond[1];
						if(subObj.val.length == 0) {
							this.openAlert('第' + (ele - 3) + '题多选题未选择选项',3000);
							return false;
						} else if(subObj.val.length < min) {
							this.openAlert('第' + (ele - 3) + '题多选题选的太少',3000);
							return false;
						} else {
							for(var i = 0; i < subObj.val.length; i++) {
								if(quesObj.data.val[subObj.val[i]] == '其他') {
									if(textAreaList[parseInt(ele) - 4] == '') {
										submitFlag = false;
										this.openAlert('第' + (ele - 3) + '题未填写其他选择',3000);
										return false;
									} else {
										if(textAreaList[parseInt(ele) - 4].length < 1) {
											submitFlag = false;
											this.openAlert('第' + (ele - 3) + '题其他信息太短',3000);
											return false;
										} else {
											subObj[subObj.val[i]] = textAreaList[parseInt(ele) - 4]
										}
									}
								}
							}
						}
					} else if(quesObj.type == '5') {
						if(subObj.val.length < 5) {
							this.openAlert('第' + (ele - 3) + '题简答题答题小于5个字符',3000);
							return false;
						}else if(subObj.val.length > 500) {
							this.openAlert('第' + (ele - 3) + '题简答题答题大于500个字符',3000);
							return false;
						}
					}
					if(quesObj.type != '5') {
						submitInfo[parseInt(ele) - 4] = subObj;
					}
				}
				this.isSubmitFlag=submitFlag;
				if(submitFlag) {
					submitInfo = JSON.stringify(submitInfo);
					this.postParam.questions = submitInfo;
					this.postAnswer(this.postParam);
				}
			},
			processingData() {//处理数据
				var list = this.quesList;
				var submitInfo = this.submitInfo;
				var textAreaList = [];
				var completedEleList = [];
				for(var ele in list) {
					var obj = {};
					textAreaList.push('');
					completedEleList.push(false);
					obj.type = list[ele].type;
					obj.id = ele;
					if(list[ele].type != 5) {
						obj.val = [];
					} else {
						obj.val = '';
					}
					submitInfo.push(obj);
				}
				this.completedEleList = completedEleList;
				this.submitinfo = submitInfo;
				this.quesList = list;
				this.textAreaList = textAreaList;
			}
		},
		mounted() {}
	}
</script>
<style>
	* {
		box-sizing: border-box
	}
	
	#app {
		margin-top: 0px !important;
	}
	
	body,
	html {
		overflow-x: hidden;
	}
	
	.fr {
		float: right;
	}
	
	body {
		margin: 0;
		padding: 0;
	}
	
	.header {
		width: 100%;
		height: 44px;
		background: #000;
		color: #fff;
		font-size: .42rem;
		line-height: 44px;
		position: fixed;
		transform: rotateZ(0);
		-webkit-transform: translateZ(0);
		top: 0;
		left: 0;
		z-index: 9;
		box-shadow: 0px 1px 10px rgba(0, 0, 0, .6);
		font-family: "微软雅黑";
		font-weight: bolder;
	}
	
	.anwser-progress {
		font-size: .32rem;
		margin-left: 10px;
	}
	
	.section-q {
		padding-top: 44px;
		padding-bottom: 50px;
		margin-bottom: 50px;
		/*position:relative;
		top:44px;
		bottom:50px;*/
		width:100%;
		/*height: 100%;
		overflow-y:scroll;*/
		
	}
	
	.contentBox {
		padding-top: .1rem;
		padding-bottom: .2rem;
		margin: 0 3%;
		text-align: left;
		border-bottom: 1px dashed #eee;
	}
	
	.contentBox:nth-last-child(1) {
		border-bottom: none;
	}
	
	.demonstration {
		margin: .3rem 0 .2rem;
		font-size: .32rem !important;
	}
	
	.el-radio-group {
		display: block;
		width: 100%;
		padding-left: .72rem;
		box-sizing: border-box;
	}
	
	.el-radio.el-radio {
		width: 50%;
		white-space: normal;
		vertical-align: top;
		margin-left: 0 !important;
		text-align: left;
		padding: 5px 0;
		font-size: .32rem !important;
	}
	
	.el-checkbox__input,
	.el-checkbox__label {
	    display: table-cell !important;
    		vertical-align: middle;
	}
	
	.el-checkbox+.el-checkbox {
		margin-left: 0 !important;
		font-size: .32rem !important;
	}
	
	.el-checkbox-group {
		padding-left: .72rem;
		box-sizing: border-box;
	}
	
	.el-checkbox-group label {
		width: 48%;
		vertical-align: top;
		text-align: left;
		font-size: .32rem !important;
		white-space: normal;
		padding-top: .1rem;
		padding-bottom: .06rem;
		margin-right: 2%;
	}
	
	label input[type='text'] {
		margin-left: 10px;
		border: 1px solid #ccc;
	}
	
	.el-input--small .el-input__inner {
		width: 80%;
		height: 23px !important;
		line-height: 23px !important;
		padding: 3px !important;
	}
	
	.btn-icon {
		width: 100px;
		font-size: .32rem !important;
		display: block !important;
		margin: auto !important;
		margin-top: 6px !important;
		vertical-align: top !important;
	}
	
	.el-icon-check {
		color: green !important;
		font-size: .32rem !important;
	}
	
	.el-message {
		min-width: 80% !important;
		top: 40% !important;
		font-size: .32rem !important;
		background: #333333 !important;
	}
	.el-message .el-icon-info,.el-message__content{
		color: #fff !important;
	}
	
	.required-check-text {
		color: #82848A;
		font-style: normal;
		font-size: .32rem !important;
	}
	
	.text-align-right {
		text-align: right;
	}
	
	.tit-num {
		padding-left: .2rem;
		padding-right: .2rem;
		font-size: .32rem;
		display: table-cell;
	}
	
	.query-tit {
		line-height: 16px;
		padding-bottom: .2rem;
		display: table;
	}
	
	.footer-q {
		width: 100%;
		clear: both;
		height: 50px;
		position: fixed;
		transform: rotateZ(0);
		-webkit-transform: translateZ(0);
		bottom: 0;
		z-index: 9;
		background: rgba(0, 0, 0, .3);
	}
	.el-checkbox__label{
		position: relative;
	}
	.other-check {
	    display: inline-block;
	    width: 40%;
	    position: relative;
	    left: 60%;
	    top: -.44rem;
	    /*margin-top: 3px;*/
	    border: 1px solid #ccc;
	    border-radius: 2px;
	    color: #333;
	    font-size: .24rem;
	    margin-right: .2rem;
	    height: 20px;
	    line-height: 20px;
	    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		padding: 0 10px;
	}
	.other-check-prompt{
		color: #ccc;
		border: none;
	}
	@media only screen and (min-width: 100px) and (max-width: 320px) {
		.other-check {
		    width: 25%;
		    left: 72%;
		}
	}
	@media only screen and (min-width: 321px) and (max-width: 375px) {
		.other-check {
		    width: 29%;
		    left: 68%;
		}
	}
	@media only screen and (min-width: 376px) and (max-width: 640px) {
		.other-check {
		    width: 35%;
		    left: 62%;
		}
	}
	@media only screen and (min-width: 641px) and (max-width: 750px) {
		.other-check {
		    width: 36%;
		    left: 61%;
		}
	}
	@media only screen and (min-width: 751px) and (max-width: 768px) {
		.other-check {
		    width: 38%;
		    left: 59%;
		}
	}
	@media only screen and (min-width: 769px) and (max-width: 1024px) {
		.other-check {
		    width: 39.5%;
		    left: 57.5%;
		}
	}

	.comfirmBtn,.cancleBtn{
		width: 30% !important;
		height: .7rem !important;
		font-size: 18px !important;
	}
</style>