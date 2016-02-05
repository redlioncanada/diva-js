# diva
Let's you know when elements have scrolled into view in 3kb.

##Example  
```
<script src="diva.min.js"></script>
<script>
  diva.always('.test', function() {
    console.log('test is in view!');
  });
</script>
```  
  
##API  
###once(selector, callback)  
&nbsp;&nbsp;selector, string or object, accepts a class or id  
&nbsp;&nbsp;callback, function  
  
###always(selector, callback)  
&nbsp;&nbsp;selector, string or object, accepts a class or id  
&nbsp;&nbsp;callback, function  
  
###sometimes(selector, count, callback)  
&nbsp;&nbsp;selector, string or object, accepts a class or id  
&nbsp;&nbsp;count, number, after `count` times `selector` has scrolled into view, `destroy` is called  
&nbsp;&nbsp;callback, function  
  
###destroy(element)  
&nbsp;&nbsp;element, string or object, If string is supplied, looks for a selector. If object is supplied, looks for an element
  
##Licence  
The MIT License (MIT)  
Copyright (c) 2016 Red Lion Canada  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
