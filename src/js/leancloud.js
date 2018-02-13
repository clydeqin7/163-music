var APP_ID = '80d7iPlUk0FFc9k5a8SOMSax-gzGzoHsz';
var APP_KEY = '4HvXfwYJb690Ke1jnzoffhIt';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

 var TestObject = AV.Object.extend('TestObject');
 var testObject = new TestObject();
 testObject.save({
 words: 'Hello World!'
 }).then(function(object) {
 alert('LeanCloud Rocks!');
 })