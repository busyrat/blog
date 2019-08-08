# SCSS

## 常用小技巧

### 对象数组遍历

```scss
$stars: (
  (size: 40px, left: 22px, top: 97px),
  (size: 32px, left: 42px, top: 70px),
  (size: 31px, left: 464px, top: 273px),
  (size: 28px, left: 240px, top: 402px),
  (size: 25px, left: 289px, top: 557px)
);

@for $i from 1 through length($stars) {
  $item: nth($stars, $i);
  
  &:nth-child(#{$i}) {
    width: map-get($item, size);
    height: map-get($item, size);
    left: map-get($item, left);
    top: map-get($item, top);
  }
}
```

