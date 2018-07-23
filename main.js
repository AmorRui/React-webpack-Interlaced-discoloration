var $ = require('jquery');

import './main.css';

$('#mul li:odd').css('backgroundColor', 'red');
$('#mul li:even').css('backgroundColor', 'green');

function Person(name, age){
  this.name = name ;
  this.age = age;
}

// 这种方式注册的方法  必须用类名调用
Person.eat = function(){

}

// Person.prototype.sayHello = func

var p = new Person('zs', 20);
console.log(p.name);
Person.eat();

// class 关键字
class Person1 {
  // 构造器
  constructor(name , age){
    this.name = name;
    this.age = age;
  }

  // 定义方法
  sayHello(){
    console.log(this.name+'在给你打招呼');
  }

  // static关键字是静态的意思   用它修饰的变量或者方法跟类对象 没有关系   只和类本身有关系
  static skincolor = 'yellow';

  static eat(){
    console.log('我再吃');
  }
}
// extends 关键字   用来在class创建的类中表示继承
class Chinese extends Person1{

}

var p1 = new Person1('lisi', 21);
console.log(p1.name);
p1.sayHello();

Person1.eat();

var c = new Chinese();
c.sayHello();