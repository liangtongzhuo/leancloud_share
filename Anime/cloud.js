var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request) {
  return 'Hello world!';
});

/**
 *  Anime 表，保存前会调用
 */
AV.Cloud.beforeSave('Anime', function(request) {
  var title = request.object.get('title');
  if (title) {
    if (title.length > 5) {
      // 截断并添加...
      request.object.set('title', title.substring(0, 5) + '...');
    }
  } else {
    // 不保存数据，并返回错误
    throw new AV.Cloud.Error('No title!');
  }
  
  if(request.currentUser){
      var acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(request.currentUser, true);
      // 将 ACL 实例赋予 anime 对象
      request.object.setACL(acl);
  }
});