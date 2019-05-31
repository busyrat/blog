/* 修改
const obj = {
    name: 'jsCoder',
    skill: ['es6', 'react', 'angular'],
    say: function () {
        for(var i = 0, len = this.skill.length; i < len; i++) {
            setTimeout((function () {
                console.log('No.' + i + this.name);
                console.log(this.skill[i]);
                console.log('--------------------')
            })(), 0);
        }

        console.log(i);
    }
}

obj.say()

解法一
const obj = {
    name: 'jsCoder',
    skill: ['es6', 'react', 'angular'],
    say: function () {
        for (var i = 0, len = this.skill.length; i < len; i++) {
            ( (i) => {
                setTimeout(() => {
                    console.log('No.' + i + this.name);
                    console.log(this.skill[i]);
                    console.log('--------------------')
                }, 0);
            } )(i)
        }

        console.log(i);
    }
}

obj.say()

解法二
const obj = {
    name: 'jsCoder',
    skill: ['es6', 'react', 'angular'],
    say: function () {
        for(var i = 0, len = this.skill.length; i < len; i++) {
            setTimeout(( (i) => {
                return () => {
                    console.log('No.' + i + this.name);
                    console.log(this.skill[i]);
                    console.log('--------------------')
                }
            })(i), 0);
        }

        console.log(i);
    }
}

obj.say()

解法三
const obj = {
    name: 'jsCoder',
    skill: ['es6', 'react', 'angular'],
    say: function () {
        for(var i = 0, len = this.skill.length; i < len; i++) {
            let _i = i
            setTimeout((() => {
                return () => {
                    console.log('No.' + _i + this.name);
                    console.log(this.skill[_i]);
                    console.log('--------------------')
                }
            })(), 0);
        }

        console.log(i);
    }
}

obj.say()

*/


/*
if ([] == false) {console.log(1);};
if ([]) {console.log(3);};
if ({} == false ) {console.log(2);};
if ({}) {console.log(5);};
if ([1] == [1]) {console.log(4);};

输出 135

== 逻辑
1. 如果是数字和布尔，都转数字
2. 如果有字符串，都转字符串

[] => 0
false => 0
{} => NaN

*/