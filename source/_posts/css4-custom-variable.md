---
title: CSS 4 自定义变量
date: 2016-02-04 14:36:00
---

谈到在 CSS 中使用变量，对前端略有深入的童鞋应该都不会陌生 —— Less 和 Sass 等预处理器早就提供了这一功能，并且已经在生产环境中广泛应用。

坦白讲，CSS 作为一个高度制式化的计算机语言，没有引入变量不得不说是语言设计的一大败笔，因此越来越多人转而使用预处理器来书写 CSS。在各式各样的 CSS 预处理器大行其道数年之后，CSS 终于给出了原生的变量解决方案 —— CSS 4（草案）新增的自定义变量特性。

CSS 4 中才引入变量可谓是亡羊补牢，但在 CSS 预处理器已经几乎变得跟 CSS 一样普及的当下，变量的出现是不是为时已晚？原生的变量相比 CSS 预编译器的实现是否更加易用？又有哪些预编译器不能实现的特性？下面就一起来看。

<!--more-->

## 变量定义

与其被称作自定义变量，CSS 4 中的这一新增特性有一个更合适的称呼 —— 自定义属性，顾名思义，CSS 4 中的变量是通过自定义属性的方式实现的。

属性必须生命在选择器中，因此要实现「全局变量」，就需要在 `:root` 伪类中声明自定义属性。为了同预定义属性进行区分，自定义属性必须以 `--` 开头：

```css
:root {
  --main-color: #06c;
  --accent-color: #006;
}
```

上面的代码定义了 `main-color` 和 `accent-color` 两个变量，分别表示了两个颜色。

自定义属性是具有继承性的，定义在某个元素的自定义属性将被这个元素的所有后代继承。变量的作用域就是通过自定义属性的继承来实现的。

```css
:root {
  --main-color: #06c;
  --accent-color: #006;
}

div {
  --accent-color: #060;
}
```

上面代码分别在两个选择器中定义了变量，但在 `div` 选择器中定义的变量将会覆盖从 `:root` 选择器继承下来的变量。因此在 div 及其子元素中使用 `--accent-color` 变量，变量的值会是 `#060`。

与预定义属性不同，自定义属性是大小写敏感的，也就是说 `--foo` 和 `--FOO` 代表的是两个变量。

## 变量使用

CSS 4 中引用变量是通过 `var` 函数来实现的：

```css
p {
  color: var(--main-color);
}
```

等价于

```css
p {
  color: #06c;
}
```

`var` 函数还支持预设值（Fallback value）的调用方式：

```css
p {
  color: var(--undefined-color, black);
}
```

当找不到指定的自定义属性是，则使用预设值。上例中 `--undefined-color` 是没有定义的，因此解析结果将会是：

```css
p {
  color: black;
}
```

## 变量继承

CSS 4 自定义属性是支持继承的，不过与其说是继承，层叠应该是更贴切的说法。在 CSS 中，一个元素的实际属性是由其自身属性以及其祖先元素的属性层叠得到的，CSS 4 自定义属性也支持层叠的特性，当一个属性没有在当前元素定义，则会转而使用其祖先元素的属性。在当前元素定义的属性，将会覆盖祖先元素的同名属性。

```html
<div>
  <p>Content</p>
</div>
```

```css
div {
  --main-color: red;
}
p {
  --main-color: blue;
  color: var(--main-color);
}
```

上面示例中最终生效的变量是 `--main-color: blue`。另外值得注意的是自定义属性虽然与预定义属性特性相似，但并不支持 `!important` 声明。
