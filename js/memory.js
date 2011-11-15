var memory = {
    arrOpenImages: [],
    viewBothTimeout: 1000,
    clickDisabled: false,
    cleanOpenImages: function () {
	console.log('Cleaning...');
	console.log(memory.arrOpenImages.length);
	for (var i = 0; i <= memory.arrOpenImages.length; i++) {
	    console.log('i: ', i);
	    if (memory.isDone($(memory.arrOpenImages[i]).find('img'))) {
		console.log('Found done');
		delete memory.arrOpenImages[i];
		continue;
	    }
	    $(memory.arrOpenImages[i]).find('img').fadeOut(200, function () {
		delete memory.arrOpenImages[i];
	    });
	}
	memory.arrOpenImages = [];
    },
    addOpenImage: function (o) {
	console.log('Pushing');
	console.log(o);
	memory.arrOpenImages.push(o);
    },
    setDone: function ($img) {
	console.log('Marking ' + $img.attr('src') + ' as done');
	$img.attr('rel', 'done');
	$img.parent().css('outline', 'thin #0f0 solid');
    },
    isDone: function ($img) {
	return $img.attr('rel') == 'done';
    },
    qrClickHandler: function () {
	var sender = this;
	$img = $(this).find('img');
	if (memory.isDone($img)) {
	    console.log('img already done!');
	    return;
	} else {
	    console.log('Not done');
	}
	console.log('In click handler');
	console.log($img);
	$img.fadeTo(200, 1, function () {
	    console.log('In callback');
	    memory.qrVerify(sender);
	});
    },
    qrVerify: function (o) {
	var $img = $(o).find('img');
	console.log($img);
	if (memory.arrOpenImages.length < 1) {
	    memory.addOpenImage(o);
	} else if (memory.arrOpenImages.length == 1) {
	    setTimeout(function () {
		if ($img.attr('src') == $(memory.arrOpenImages[0]).find('img').attr('src')) {
		    console.log('Found it!');
		    memory.setDone($img);
		    memory.setDone($(memory.arrOpenImages[0]).find('img'));
		} else {
		    memory.addOpenImage(o);
		    console.log('Wrong!');
		}
		memory.cleanOpenImages();
	    }, memory.viewBothTimeout);
	} else {
	    console.log('Full');
	}
    },
    init: function () {
	console.log('Init...');
	$('img').fadeOut(200, function () {
	    console.log('Fading out...');
	});
	setTimeout(function () {
	    console.log('Binding...');
	    $('.wrapper ul').on('click', 'li', memory.qrClickHandler);
	}, 200);
    }
};

$(document).ready(function () {
    setTimeout(memory.init, 1000);
});