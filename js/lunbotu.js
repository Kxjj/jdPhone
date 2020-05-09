 function my$(id) {
          return document.getElementById(id);
        }
       

        //获取各元素，方便操作
       
        var box=my$("box");
       //获取相框  
        var inner=box.children[0];
        // 获取ul
        var ulObj=inner.children[0];
         //获取ul中所有的li
        var list=ulObj.children;
        //获取ol   inner里面的第二个孩子是ol
        var olObj=inner.children[1];
        //获取焦点
        var arr=my$("arr");
        //获取去相框的宽度
        var imgWidth=inner.offsetWidth;
        
        var right=my$("right");
        var pic=0;
        
        
        for(var i=0;i<list.length;i++){
          var liObj=document.createElement("li");  //创建li元素
          //ol当中追加上一行创建的li元素
          olObj.appendChild(liObj);
          //li的个数是list(ul中li的个数+1(即图片张数))
          liObj.innerText=(i+1);
          //在ol中每个li中增加自定义属性，添加索引值
          liObj.setAttribute("index",i);
       
          //为按钮注册mouseover事件    //注册鼠标进入事件
          liObj.onmouseover=function () {
            //先清除所有按钮的样式     //先干掉所有背景颜色
            for (var j=0;j<olObj.children.length;j++){
              olObj.children[j].removeAttribute("class");
            }
            //设置当前鼠标进来的类样式
            this.className="current";
             //获取ol中li的索引值
            pic=this.getAttribute("index");
             //移动ul
            animate(ulObj,-pic*imgWidth);//移动动画函数
          }
       
        }
       
      
        olObj.children[0].className = "current";
        //克隆一个ul中第一个li,加入到ul中的最后=====克隆
        ulObj.appendChild(ulObj.children[0].cloneNode(true));
       
        var timeId=setInterval(onmouseclickHandle,1200);
        //左右焦点实现点击切换图片功能
        box.onmouseover=function () {
          arr.style.display="block";
          clearInterval(timeId);
        };
        box.onmouseout=function () {
          arr.style.display="none";
          timeId=setInterval(onmouseclickHandle,1200);
        };
       //点击右边按钮
        right.onclick=onmouseclickHandle;
        function onmouseclickHandle() {
         
          if (pic == list.length - 1) {
            //如何从第6个图,跳转到第一个图
            pic = 0;//先设置pic=0
            ulObj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
          }
          pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
          animate(ulObj, -pic * imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
          //如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
          if (pic == list.length - 1) {
            //第五个按钮颜色干掉
            olObj.children[olObj.children.length - 1].className = "";
            //第一个按钮颜色设置上
            olObj.children[0].className = "current";
          } else {
            //干掉所有的小按钮的背景颜色
            for (var i = 0; i < olObj.children.length; i++) {
              olObj.children[i].removeAttribute("class");
            }
            olObj.children[pic].className = "current";
          }
        }
        //点击左边按钮
        left.onclick=function () {
          if (pic==0){
            pic=list.length-1;
            ulObj.style.left=-pic*imgWidth+"px";
          }
          pic--;
          animate(ulObj,-pic*imgWidth);
          for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
          }
          //当前的pic索引对应的按钮设置颜色
          olObj.children[pic].className = "current";
        };
       
        //设置任意的一个元素,移动到指定的目标位置
        function animate(element, target) {
          clearInterval(element.timeId);
          //定时器的id值存储到对象的一个属性中
          element.timeId = setInterval(function () {
            //获取元素的当前的位置,数字类型
            var current = element.offsetLeft;
            //每次移动的距离
            var step = 10;
            step = current < target ? step : -step;
            //当前移动到位置
            current += step;
            if (Math.abs(current - target) > Math.abs(step)) {
              element.style.left = current + "px";
            } else {
              //清理定时器
              clearInterval(element.timeId);
              //直接到达目标
              element.style.left = target + "px";
            }
          }, 10);
        }