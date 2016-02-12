var feed = new Instafeed({
        get: 'user',
        userId: '360855560',
        tagName: '100days100photos',
        accessToken: '360855560.1677ed0.b889edf62bd84cb297b044f0d765c4ef',
        resolution: 'standard_resolution',
        template: '<li><a href="{{link}}"><img src="{{image}}" /></a><p>{{caption}}</p></li>',
        filter: function(image) {
        	return image.tags.indexOf('100days100photos') >= 0;
        }
    });
    
document.addEventListener('DOMContentLoaded', function() {
    feed.run();
}, false);