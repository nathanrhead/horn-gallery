'use strict'

const allHornsArray = [];
const allHornsArray2 = [];


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
        // console.log(data);
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
});



function Horns2(page2){
  for (let key in page2){
    this[key] = page2[key];
  }
}

Horns2.prototype.html = function(){
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}

Horns2.readJson2 = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };

  // This line will get our JSON file.
  $.ajax('../data/page-2.json', ajaxSettings)
    .then(data => {
      // console.log('this is data from json2', data);
      data.forEach(value => {
        // let animals2 =
        allHornsArray2.push(new Horns2(value));
        // console.log(animals2);

        // $('button').on('click', () => {
        //   $('section').hide();
        //   $(() => Horns2.readJson2());
        //   allHornsArray2.forEach(renderAnimal => {
        //     console.log('info here', renderAnimal);
        //     $('section').append(renderAnimal.html());
        //   });
      })
    })
    .then(() => {
      allHornsArray2.forEach(renderAnimal => {
        console.log(renderAnimal, 'asakdfskjdd')
        $('section').append(renderAnimal.html()).show();
        // console.log(allHornsArray2, 'how many animals are being rendered?')
      });
    })
}


$('button').on('click', () => {
  $('section').hide();
  $(() => Horns2.readJson2());
  console.log('info here', allHornsArray2);
  // allHornsArray2.forEach(renderAnimal => {
  //   $('section').append(renderAnimal.html()).show();
  // });
})




