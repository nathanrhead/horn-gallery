'use strict'

const allHornsArray = [];
const allHornsArray2 = [];


// function Horns(animals) {
//   this.image_url = animals.image_url;
//   this.title = animals.title;
//   this.description = animals.description;
//   this.keyword = animals.keyword;
//   this.horns = animals.horns;
//   allHornsArray.push(this);
// }

function Horns(page1) {
  for(let key in page1) {
    this[key] = page1[key];
  }
}

Horns.prototype.render = function() {
  console.log(this);
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}

Horns.readJson = () => {
  let ajaxSettings = { method: 'get', dataType: 'json'};
  $.ajax('../data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(value => {
        allHornsArray.push(new Horns(value));
        // let animals = new Horns(value);
        // value.render();
      })
    })
    .then(() => {
      console.log(allHornsArray);
      allHornsArray.forEach(renderAnimal1 => {
        console.log(renderAnimal1);
        $('select').append(new Option(renderAnimal1.keyword));
        $('main').append(renderAnimal1.render());
      })
    })
}

$(() => Horns.readJson());

$('select').on('change', function(){
  $('main').hide();
  allHornsArray.forEach(show => {
    let $choice = this.value
    if(show.keyword === $choice){
      console.log('hello', this.value, show.keyword);
      $(`#photo-template[class="${$choice}"]`).show();
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
      })
    })
    .then(() => {
      allHornsArray2.forEach(renderAnimal => {
        console.log(renderAnimal, 'asakdfskjdd')
        $('main').append(renderAnimal.html()).show();
        $('select').append(new Option(renderAnimal.keyword));
      });
    })
}

$('button').on('click', () => {
  $('main').children().hide();
  $(() => Horns2.readJson2())
})




