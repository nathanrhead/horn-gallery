'use strict'

function Horns(animals) {
  this.image_url = animals.image_url;
  this.title = animals.title;
  this.description = animals.description;
  this.keyword = animals.keyword;
  this.horns = animals.horns;
}

// The constructor method
Horns.prototype.render = function() {
  // This line will clone the template from the DOM.
  let $animalsClone = $('#template').clone();

  // This line will append the cloned template to the selected DOM element.
  $('main').append($animalsClone);

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
        console.log('Money', animals);

      })
    })
}

$(() => Horns.readJson());
