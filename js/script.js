(function($){

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset(),
	  title = $this.attr('title');

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://service.weibo.com/share/share.php?title='+title+' | Easygo_Space&amp;url=' + encodedUrl + '&amp;searchPic=true&amp;style=number" class="article-share-weibo" target="_blank" title="Weibo"></a>',
            '<a href="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodedUrl + '" class="article-share-wechat" target="_blank" title="Wechat"></a>',
          '</div>',
        '</div>'
      ].join('');
		// '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
		// '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
	  var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('image-link')) return;

      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="image-link"></a>');
    });

    $(this).find('.image-link').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  // Bootstrap table style
  $('.article-entry table').each(function(i, table)  {
    if ($(this).parent().hasClass('table-responsive')) return;
    $(this).addClass('table');
    $(this).wrap('<div class="table-responsive"></div>');
  });

  // Lightbox plugin
  if ($.fancybox){
    $('.image-link').fancybox();
  }

  // 目录点击展开效果 
  $('ol.toc').hide();
  $('article').click(function() {
	$('ol.toc').hide();
  });
  $('strong.sidebar-title').click(function() {
	$('ol.toc').toggle();
  });
	
  

})(jQuery);