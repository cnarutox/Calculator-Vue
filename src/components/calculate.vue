<template>
    <div class="functionArea" @keydown="keyboard">
        <button class="number" ref="zero" style="width: 50%;" @click="number(0)"
        >0</button>
        <button class="number" ref="dot" @click="dot">.</button>
        <button class="operator" v-focus @click="operate('=')">=</button>
        <numbers class="number" :value="1" v-on:number="number">1</numbers>
        <numbers class="number" :value="2" v-on:number="number">2</numbers>
        <numbers class="number" :value="3" v-on:number="number">3</numbers>
        <button class="operator" ref="plus" :value="op[0]" @click="operate('+')"
          >+</button>
        <numbers class="number" :value="4" v-on:number="number">4</numbers>
        <numbers class="number" :value="5" v-on:number="number">5</numbers>
        <numbers class="number" :value="6" v-on:number="number">6</numbers>
        <button class="operator" ref="minus" :value="op[1]" @click="operate('-')
          ">-</button>
        <numbers class="number" :value="7" v-on:number="number">7</numbers>
        <numbers class="number" :value="8" v-on:number="number">8</numbers>
        <numbers class="number" :value="9" v-on:number="number">9</numbers>
        <button class="operator" ref="multiply" :value="op[2]"
          @click="operate('×')">×</button>
        <button class="button" ref="ac" @click="ac()">AC</button>
        <button class="button" ref="porn" @click="posORneg()">+/-</button>
        <button class="button" ref="per" @click="percent()">%</button>
        <button class="operator" ref="div" :value="op[3]" @click="operate('/')"
          >÷</button>
        <Display v-model="display"></Display>
    </div>
</template>

<script>
import Display from './Display'
import numbers from './numbers'
import operators from './operators'
export default {
  components: {
    Display,
    numbers,
    operators
  },
  data () {
    return {
      op: ['+', '-', '×', '÷'],
      values: ['0', '0'],
      valueIndex: 0,
      operator: '',
      display: '0'
    }
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      },
      update: (el) => {
        el.focus()
      }
    }
  },
  methods: {
    clear () {
      this.values = ['0', '0']
      this.valueIndex = 0
      this.operator = ''
    },
    number (num) {
      if (this.values[this.valueIndex] === '0') {
        this.display = this.values[this.valueIndex] = num.toString()
      } else {
        this.display = this.values[this.valueIndex] += num.toString()
      }
    },
    dot () {
      if (this.display.indexOf('.') === -1) {
        this.values[this.valueIndex] = this.display += '.'
      }
    },
    operate (op) {
      try {
        switch (this.operator) {
          case '+':
            this.display = this.values[0] = (parseFloat(this.values[0]
            ) + parseFloat(this.values[1])).toString()
            break
          case '-':
            this.display = this.values[0] = (parseFloat(this.values[0]
            ) - parseFloat(this.values[1])).toString()
            break
          case '×':
            this.display = this.values[0] = (parseFloat(this.values[0]
            ) * parseFloat(this.values[1])).toString()
            break
          case '/':
            this.display = this.values[0] = (parseFloat(this.values[0]
            ) / parseFloat(this.values[1])).toString()
            break
        }
        this.clear()
        if (op !== '=') {
          this.values = [this.display, '0']
          this.valueIndex = 1
          this.operator = op
        }
        if (this.display.length > 10) { // 为显示display添加事件
          this.display = parseFloat(this.display).toPrecision(4).toString()
        }
      } catch (error) {
        this.display = 'Error'
      }
    },
    ac () {
      this.display = '0'
      this.clear()
    },
    posORneg () {
      if (this.display !== '0') {
        if (this.display[0] !== '-') {
          this.display = '-' + this.display
        } else {
          this.display = this.display.substring(1, this.display.length)
        }
        this.values[this.valueIndex] = this.display
      }
    },
    percent () {
      this.values[this.valueIndex] = this.display =
        (parseFloat(this.display) / 100).toString()
    },
    keyboard: function (event) { /* eslint-disable */
      let keynum = window.event ? event.keyCode : event.which
      let keychar = String.fromCharCode(keynum)
      switch (keychar.toLowerCase()) {
        case '0':
        case '`':
          this.number(0)
          break
        case '1':
        case 'a':
          this.number(1)
          break
        case '2':
        case 'b':
          this.number(2)
          break
        case '3':
        case 'c':
          this.number(3)
          break
        case '4':
        case 'd':
          this.number(4)
          break
        case '5': if (event.shiftKey) {
          this.$refs.per.click()
          break
        }
        case 'e':
          this.number(5)
          break
        case '6':
        case 'f':
          this.number(6)
          break
        case '7':
        case 'g':
          this.number(7)
          break
        case '8': if (event.shiftKey) {
          this.$refs.multiply.click()
          break
        }
        case 'h':
          this.number(8)
          break
        case '9':
        case 'i':
          this.number(9)
          break
        case '»': if (!event.shiftKey) {
          break
        }
        case 'k':
          this.$refs.plus.click()
          break
        case '½': if (!event.shiftKey) {
          break
        }
        case 'm': this.$refs.minus.click()
          break
        case 'j':
          this.$refs.multiply.click()
          break
        case '¿':
        case 'o':
          this.$refs.div.click()
          break
        default: switch (keynum) {
          case 8: this.$refs.ac.click()
            break
          case 192: this.$refs.porn.click()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
  flex-flow: row wrap-reverse;
  width: 38%;
  height: 70%;
  box-shadow: 10px 10px 10px rgb(221, 213, 178);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: rgb(246, 242, 199);
}

#display {
  width: 100%;
  height: 15%;
  background: rgb(237, 238, 240);
  border: 1px solid rgba(164, 168, 180, 0.493);
  box-shadow: 0px 0px 20px rgb(246, 235, 188) inset;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: "Courier New", Courier, monospace;
  font-size: 450%;
  text-align: right;
}

.number,
.operator,
.button {
  width: 25%;
  height: 17%;
  position: relative;
  overflow: hidden;
  line-height: 17%;
  box-sizing: border-box;
  outline: none;
  box-shadow: 2px 2px 5px rgb(240, 231, 192);
  font-size: 300%;
  border-radius: 20px;
  border: 2px solid rgb(174, 222, 250);
  color: rgba(5, 5, 5, 0.493);
  background-color: rgba(235, 234, 233, 0.959);
}

.button {
  background-color: rgb(245, 192, 192);
  color: rgb(73, 88, 68);
}

.button:hover {
  background-color: rgb(233, 122, 122);
  color: rgb(170, 247, 162);
}

.number:hover {
  background-color: rgb(143, 184, 231);
  color: rgb(255, 255, 255);
}

.number::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(circle, #666 10%, transparent 10%);
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}

.number:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

.operator {
  font-family: "Courier New", Courier, monospace;
  font-size: 600%;
  color: rgb(250, 250, 250);
  background-color: rgb(248, 189, 26);
}

.operator:hover {
  font-size: 700%;
  color: rgb(51, 63, 83);
  background-color: rgb(223, 144, 18);
}
</style>
