let str = require('./a');
// console.log(str)
document.getElementById('app').innerHTML = str
import './index.css'


if (module.hot) {
    module.hot.accept();
    // module.hot.accept('a.js', function () {
    //     let str = require('./a');
    //     document.getElementById('app').innerHTML = str
    // })
}

