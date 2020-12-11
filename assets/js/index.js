// let arr_todo=JSON.parse(window.localStorage.getItem('arr_todo'))||[]
// let arr_done=JSON.parse(window.localStorage.getItem('arr_done'))||[]

//获取正在进行中的列表的文字信息到一个数组中,等待渲染
let todo_li=document.querySelectorAll('#todolist li p')
let arr_todo=[]
for(let i=0;i<todo_li.length;i++){
    arr_todo.push(todo_li[i].innerHTML)
}
//获取已经完成列表中的文字信息到一个数组中,等待渲染页面
let done_li=document.querySelectorAll('#donelist li p')
let arr_done=[]
for(let i=0;i<done_li.length;i++){
    arr_done.push(done_li[i].innerHTML)
}
//在todo中输入文字,按下回车键时候信息动态添加到arr_todo中
$('#title').on('keydown',function(e){
    e=e||window.event
    let code=e.code||e.which
    if(code==='Enter'){
        e.preventDefault()
        let value=$('#title').val().trim()
        arr_todo.push(value)
        window.localStorage.setItem('arr_todo',JSON.stringify(arr_todo))
        bindhtml_todo()
        $('#title').val('')
    }
})

//渲染未完成列表页面
function bindhtml_todo(){
    arr_todo=JSON.parse(window.localStorage.getItem('arr_todo'))||[]
    // console.log(arr_todo)
    let str=``
    arr_todo.forEach(function(item){
        str+=`
        <li>
            <input type="checkbox" />
            <p onclick="edit(1)">${item}</p>
            <a href="#">-</a>
        </li>
        `
    })
    // console.log(str)
    $('#todocount').html(arr_todo.length)
    $('#todolist').html(str)
}
//渲染已经完成的列表页面
function bindhtml_done(){
    arr_done=JSON.parse(window.localStorage.getItem('arr_done'))||[]
    let str=``
    arr_done.forEach(function(item){
        str+=`
        <li>
            <input type="checkbox" checked/>
            <p onclick="edit(1)">${item}</p>
            <a href="#">-</a>
        </li>
        `
    })
    $('#donecount').html(arr_done.length)
    $('#donelist').html(str)
}
//点击正在进行列表中的选项按钮的时候
$('#todolist').on('click','input',function(){
    let i=$(this).parent().index()
    let text=$(this).next().html()
    arr_todo.splice(i,1)
    window.localStorage.setItem('arr_todo',JSON.stringify(arr_todo))
    bindhtml_todo()
    arr_done.push(text)
    window.localStorage.setItem('arr_done',JSON.stringify(arr_done))
    bindhtml_done()
})
//点击已经完成列表前边的选项按钮的时候
$('#donelist').on('click','input',function(){
    let i=$(this).parent().index()
    let text=$(this).next().html()
    arr_done.splice(i,1)
    window.localStorage.setItem('arr_done',JSON.stringify(arr_done))
    bindhtml_done()
    arr_todo.push(text)
    window.localStorage.setItem('arr_todo',JSON.stringify(arr_todo))
    bindhtml_todo()
})
//点击正在进行列表中的删除按钮的时候
$('#todolist').on('click','a',function(){
    let i=$(this).parent().index()
    arr_todo.splice(i,1)
    window.localStorage.setItem('arr_todo',JSON.stringify(arr_todo))
    bindhtml_todo()
})
//点击已经完成的列表中的删除按钮的时候
$('#donelist').on('click','a',function(){
    let i=$(this).parent().index()
    arr_done.splice(i,1)
    window.localStorage.setItem('arr_done',JSON.stringify(arr_done))
    bindhtml_done()
})
//点击正在进行列表中的p标签的时候编辑事件
$('#todolist').on('click','p',function(e){
    // e=e||window.event
    // e.preventDefault()
    let input=document.createElement('input')
    let text=$(this).html()
    $(this).append(input)
    console.log($(this).find())
    $(this).find().attr('autofocus','autofocus')
    $(this).find().attr('type','text').html(text)
})



//页面刷新的时候阻止页面回到原始结构,从后台获取数据信息
if(window.location.href=`//127.0.0.1:5500/index.html?title=11111111#`){
    bindhtml_todo()
    bindhtml_done()
}







