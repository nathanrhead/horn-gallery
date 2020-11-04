'use strict'

const allHornsArray = [];


function Horns(animals) {
  this.image_url = animals.image_url;
  this.title = animals.title;
  this.description = animals.description;
  this.keyword = animals.keyword;
  this.horns = animals.horns;
  allHornsArray.push(this);
}

// The constructor method
Horns.prototype.render = function() {
  // This line will clone the template from the DOM.
  let $animalsClone = $('#template').clone();
  $animalsClone.addClass(this.keyword);
  // This line will append the cloned template to the selected DOM element.
  $('main').append($animalsClone);

  // This creates new options in our Select menu and applies title to each
  $('select').append(new Option(this.keyword, this.keyword));

  // Let us now traverse and manipulate the DOM
  // These lines will add content to the template on the DOM
  $animalsClone.find('img').attr('src', this.image_url);
  $animalsClone.find('h2').text(this.title);
  $animalsClone.find('article').text(this.description);
  $animalsClone.find('h3').text(this.keyword);
  $animalsClone.find('p').text(this.horns);

  // This line will hide the html template on the DOM.
  // $animalsClone.removeId('#template');
}

// This is the instance method needed to read the contents of a JSON file.
Horns.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };

  // This line will get our JSON file.
  $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(value => {
        let animals = new Horns(value);
        animals.render();
      })
    })
}

$(() => Horns.readJson());

$('select').on('change', function(){
  $('section').hide();
  allHornsArray.forEach(show => {
    // show = $(this).find(':selected').attr('value');
    let $choice = this.value
    if(show.keyword === $choice){
      console.log('hello', this.value, show.keyword);
      $(`section[class="${$choice}"]`).show();
    }
    console.log('hello', 'choice:', $choice);
  })
  // console.log('hello', this.value);
  // console.log(src);
  // $('section').attr('value', src)
});
