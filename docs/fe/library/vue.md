### vue-router

- 打开新的页面

  ```js
  let url = this.$router.resolve({name: 'templateDetails', query: {code}})
  window.open(url.href, '_blank');
  ```

  

