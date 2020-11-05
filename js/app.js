'use strict'

const allHornsArray = [];
const allHornsArray2 = [];

function Horns(page1) {
  for(let key in page1) {
    this[key] = page1[key];
  }
}

Horns.prototype.render = function() {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  $('#photo-template').addClass(this.keyword);
  return html;
}

Horns.readJson = function () {
  let ajaxSettings = { method: 'get', dataType: 'json'};
  $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(value => {
        allHornsArray.push(new Horns(value));
      })
    })
    .then(() => {
      allHornsArray.forEach(renderAnimal1 => {

        $('select').append(new Option(renderAnimal1.keyword));
        $('main').append(renderAnimal1.render());
      })
    })
  $('select').on('change', function(){
    $('div').hide();
    allHornsArray.forEach(show => {

      let $choice = this.value
      if(show.keyword === $choice){
        let check = '.' + $choice;
        console.log($choice);
        $(check).show();
      }
    })
  });
}

$(() => Horns.readJson());


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
      data.forEach(value => {
        allHornsArray2.push(new Horns2(value));
      })
    })
    .then(() => {
      allHornsArray2.forEach(renderAnimal => {
        $('main').append(renderAnimal.html()).show();
        // $('select').val('');
        $('select').append(new Option(renderAnimal.keyword));
      });
    })
  $('select').on('change', function(){
    $('div').hide();
    allHornsArray2.forEach(show => {

      let $choice = this.value
      if(show.keyword === $choice){
        let check = '.' + $choice;
        console.log($choice);
        $(check).show();
      }
    })
  });

}

$('button').on('click', () => {
  $('main').children().hide();
  $('button').off();
  $(() => Horns2.readJson2());
  $('button').remove();
})


// Two problems:
// 1. The dropdown includes keywords from page 2;
// 2. A user may select page 1 keywords on page 2, but not page 2 keywords.

