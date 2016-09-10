# Base64.js

> Base64 encode and decode.

See the example:

```html
<script src="base64.js"></script>
<script>
    var example = 'Olá, Mundo!';

    example = Base64.encode(example);
    alert(example); // 'T2zhLCBNdW5kbyE='

    example = Base64.decode(example);
    alert(example); // 'Olá, Mundo!'
</script>
```
