<template>
  <div class="content" :style="{height:windowHeight-50 +'px'}">
     <img :src="item.src" alt="" v-for="(item,index) in imagesUrls" 
         :style="{height:item.scrollSize +'%',width:item.scrollSize +'%',left:item.left+'px',top:item.top+'px',opacity:item.opacity/100,zIndex:item.zIndex}" 
         @mousedown.prevent="startMove($event,item,index)" 
         @DOMMouseScroll="scrollImg($event)" 
         @mousewheel="scrollImg($event)"
         @mousemove="moveImg($event,item)"
         @mouseup="stopMove(item,index)"
         >
    <div class="scroll-bar">
    	<el-button icon="minus" @click="handleScrollImg('-1')"></el-button>
    	<el-progress :percentage="scrollPercent"></el-progress>
    	<el-button icon="plus" @click="handleScrollImg('1')"></el-button>
    </div>
    <div class="opacity-bar">
    	<el-button icon="minus" @click="handleChangeOpacity('-1')"></el-button>
    	<el-progress :percentage="opacityPercent"></el-progress>
    	<el-button icon="plus" @click="handleChangeOpacity('1')"></el-button>
    </div>
    <div class="control-bar">
     <el-radio-group v-model="radio" @change="setoneImg">
	    <el-radio-button label="图片一" ></el-radio-button>
	    <el-radio-button label="图片二" v-if="imagesUrls.length==2"></el-radio-button>
	    <el-radio-button label="全部"></el-radio-button>
	 </el-radio-group>
    	  
    </div>     
  </div>
</template>

<script>
export default {
  name: 'bmap',
  data () {
    return {
      imagesUrls:[
         {
     	  src:"/static/images/1.png",
     	  name:'图片1',
     	  scrollSize:100,
	      isResie:false,
	      clentX:10,
	      clentY:10,
	      left:0,
	      top:0,
	      scrollPercent:50,
	      opacity:100,
	      zIndex:0
         },
         {
     	  src:"/static/images/2.png",
     	  name:'图片1',
     	  scrollSize:100,
	      isResie:false,
	      clentX:10,
	      clentY:10,
	      left:0,
	      top:0,
	      scrollPercent:50,
	      opacity:100,
	      zIndex:0
         }
      ],
      scrollPercent:50,
      copyImages:[],
      radio:'全部',
      windowHeight:800,
	  opacityPercent:100,  
    }
  },
  methods:{
    handleChangeOpacity(type){
    	if(this.radio =='全部') {
    		this.imagesUrls.forEach((item,index)=>{
                this.handleOpacityOperate(type,item,0);
    		})
    	}else if(this.radio =='图片一') {
            this.handleOpacityOperate(type,this.imagesUrls[0],1);
    	}else {
            this.handleOpacityOperate(type,this.imagesUrls[1],2);
    	}
      
    },
   //点击改变透明度
   handleOpacityOperate(type,item,percent) {
      if(type == 1){
	     if(item.opacity >= 100) {
	          return 
	      }
	      if(percent == 0) {	
	      	//整体的缩放比
  			if(this.imagesUrls.length == 2 ) {
  				this.opacityPercent += 5;
  			}else {
  				this.opacityPercent += 10;
  			};
  			 
  			if(this.opacityPercent >= 100) {
	      		this.opacityPercent = 100;
	      	}
  			item.opacity += 10;
	      }else {
           this.opacityPercent += 10;
           item.opacity += 10;
	      } //左侧
      }else if(type == -1){
      	if(item.opacity <= 0) {
      	  item.opacity = 0;
          return 
      	}
        if(percent == 0) {	
		    //整体的缩放比
		   if(this.imagesUrls.length == 2 ) {
  				this.opacityPercent -= 5;
  			}else {
  				this.opacityPercent -= 10;
  			};

  		   if(this.opacityPercent <= 0) {
	      		this.opacityPercent = 0;
	      	}	
		   item.opacity -= 10;
	    }else {
           this.opacityPercent -= 10;
           item.opacity -= 10;
	    } //
      }
	},
	//透明度改变的操作函数  
   
    
  	//滚动缩放图片大小
    scrollImg(e){
      var type = 1;
      if(e.wheelDelta < 0 || e.detail > 0){
          type = 1 ;
      }else {
          type = -1 ;
      }
      //获取放大还是缩小

      if(this.radio ==='全部'){
	      this.imagesUrls.forEach((item,index)=>{
             this.handleScrollOperate(type,item,0)
	      })
	  }else if(this.radio ==='图片一'){
         var item = this.imagesUrls[0];
	  	 this.handleScrollOperate(type,item,1)
	  }else if(this.radio ==='图片二'){
         var item = this.imagesUrls[1];
         this.handleScrollOperate(type,item,2)
	  }
    },//缩放图片


   //点击缩放图片
  	handleScrollImg(type){
     // -1 代表缩小，1代表放大
     // 判断选择的是图片几
     if(this.radio ==='全部'){
	      this.imagesUrls.forEach((item,index)=>{
             this.handleScrollOperate(type,item,0)
	      })
	  }else if(this.radio ==='图片一'){
         var item = this.imagesUrls[0];
         this.handleScrollOperate(type,item,1)
	  }else if(this.radio ==='图片二'){
         var item = this.imagesUrls[1];
         this.handleScrollOperate(type,item,2)
	  }
  	},
    //缩放的操作函数
  	handleScrollOperate(type,item,percent){
        if(type == 1) {
	      	if(item.scrollPercent >= 100) {
	          return 
	      	}
	        if(percent == 0) {
	          
  			   //整体的缩放比
  			   if(this.imagesUrls.length == 2 ) {
	  				this.scrollPercent += 5;
	  			}else {
	  				this.scrollPercent += 10;
	  			};

	  		   if(this.scrollPercent >= 100) {
	      		  this.scrollPercent = 100;
	      	   }
	      	   // 处理多图片不同步超出100%的bug	
  			   item.scrollPercent += 10;
  		    }else {
               this.scrollPercent += 10;
               item.scrollPercent += 10;
  		    } //左侧缩放条缩放进度

	        item.scrollSize *= 1.1;
	      }else if(type == -1){
	      	if(item.scrollPercent <= 0) {
	          return 
	      	}

	      	if(percent == 0) {	
  			   //整体的缩放比
  			   if(this.imagesUrls.length == 2 ) {
	  				this.scrollPercent -= 5;
	  			}else {
	  				this.scrollPercent -= 10;
	  			};
               if(this.scrollPercent <= 0) {
	      		  this.scrollPercent = 0;
	      	   }
// 处理多图片不同步超出100%的bug
  			   item.scrollPercent -= 10;
  		    }else {
               this.scrollPercent -= 10;
               item.scrollPercent -= 10;
  		    } //

	        item.scrollSize /= 1.1;
	      }
  	},


    startMove(e,item,index) {
	  this.imagesUrls.forEach((citem,cindex)=>{
            citem.zIndex = 0;
              if(index == cindex) {
		      	citem.zIndex = 1;	
		      }
		})
	  if(index == 0) {
	  	 this.radio = '图片一'
	  }else if(index == 1) {
	  	 this.radio = '图片二'
	  }


      item.isResie = true;
      item.clentX = e.offsetX;
      item.clentY = e.offsetY;
      //保存点击时候的元素坐标
    },//获取解锁图片可拖放
    moveImg(e,item){
      if(item.isResie) {
         item.left = e.clientX - e.target.parentNode.offsetLeft - item.clentX;
         item.top = e.clientY - e.target.parentNode.offsetTop - item.clentY;
      // 获取点击位置的坐标
      }
    },//移动图片
    stopMove(item){
      item.isResie = false;
      // item.zIndex -= 2;
    },
    //设置第一张图
    setoneImg(){
      if(this.radio == '图片一') {
         
      }else if(this.radio == '图片二') {

      }else if(this.radio == '全部'){
           
      }
    },
  },
  mounted(){
  	//获取浏览器显示区高度
  	this.windowHeight = window.innerHeight; 
  	var _this = this;

  },
  watch:{
  	'radio':function (nVal,oVal) {
  		if(nVal=='全部') {
	      if(this.imagesUrls[1]){
             this.scrollPercent = this.imagesUrls[0].scrollPercent > this.imagesUrls[1].scrollPercent ? this.imagesUrls[0].scrollPercent: this.imagesUrls[1].scrollPercent;
             //给缩放进度条赋值
             this.opacityPercent = this.imagesUrls[0].opacity > this.imagesUrls[1].opacity ? this.imagesUrls[0].opacity: this.imagesUrls[1].opacity
             //给透明度进度条赋值
             this.imagesUrls[1].zIndex = 1;
             this.imagesUrls[0].zIndex = 0;
	      }else {
	      	 this.scrollPercent = this.imagesUrls[0].scrollPercent;
	      	 this.opacityPercent = this.imagesUrls[0].opacity
	      	 this.imagesUrls[0].zIndex = 0;
	      }
  		}else if(nVal=='图片一') {
            this.scrollPercent = this.imagesUrls[0].scrollPercent;
            this.opacityPercent = this.imagesUrls[0].opacity;
            this.imagesUrls[0].zIndex = 1;
            this.imagesUrls[1].zIndex = 0;
  		}else if(nVal == "图片二") {
  			this.scrollPercent = this.imagesUrls[1].scrollPercent;
            this.opacityPercent = this.imagesUrls[1].opacity;
            this.imagesUrls[1].zIndex = 1;
            this.imagesUrls[0].zIndex = 0;
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .content {
   	width: 90%;
   	background: white;
   	margin:0 auto;
   	margin-top: 25px;
   	overflow: hidden;
   	position: relative;	
   }

   .content img {
   	cursor: pointer;
   	position: absolute;
   	left: 0;
   	top:0;
   }

   .control-bar {
   	position: fixed;
   	left: 0;
   	bottom: 0;
   	z-index: 10;
   	display: flex;
   	justify-content: center;
   	align-items: center;
    height: 80px;
   	width: 100%;
   	background: #42b983;
   	opacity: 0.5;
   }

   .control-bar:hover {
   	opacity: 1
   }

  /* .control-bar button {
   	margin:0 20px;
   }*/
   .el-radio-group label{
     margin:0 10px;
   }

   .scroll-bar {
   	 position: absolute;
     left: -220px;
     top:50%;
     z-index: 10;
     display: flex;
     justify-content: space-between;
     transform: rotate(-90deg);
     height: 30px;
     width: 500px;
     margin-top: -50px;
     background: #42b983;
     opacity: 0.7;
   }

   .scroll-bar button {
   	height: 30px;
   	width: 30px;
   	display: flex;
   	justify-content: center;
   	align-items: center;
   	background: none;
   	border:none;
   }

   .scroll-bar:hover {
   	opacity: 1
   }

   .el-progress--line {
   	 margin-top: 5px;
   	 margin-left: 5px;
   	 width: 90%
   }

   .opacity-bar {
   	 position: absolute;
     right: -220px;
     top:50%;
     z-index: 10;
     display: flex;
     justify-content: space-between;
     transform: rotate(-90deg);
     height: 30px;
     width: 500px;
     margin-top: -40px;
     background: #42b983;
     opacity: 0.7
   }

   .opacity-bar:hover {
   	opacity: 1
   }

   .opacity-bar button {
   	height: 30px;
   	width: 30px;
   	display: flex;
   	justify-content: center;
   	align-items: center;
   	background: none;
   	border:none;
   }
</style>
