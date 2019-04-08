import img from './asset/images/1.jpg'

let str = require('./a');
document.getElementById('app').innerHTML = str
// import './index.css'

let fn = () => {
    console.log('箭头函数')
}

fn()
@log
class A {
    a = 1
}

let a = new A()
console.log(a.a)

function log(target) {
    console.log('target', target)
}

let image = new Image()
image.src = img
document.body.appendChild(image)


// source-map
class Log {
    console.lo('出错了')
}
let log = new Log()

// if (module.hot) {
//     module.hot.accept();
// }

