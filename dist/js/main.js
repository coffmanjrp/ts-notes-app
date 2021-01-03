"use strict";
var addBtn = document.getElementById('add');
var notes = JSON.parse(localStorage.getItem('notes'));
function updateLS() {
    var notesText = document.querySelectorAll('textarea');
    var notes = [];
    notesText.forEach(function (note) { return notes.push(note.value); });
    localStorage.setItem('notes', JSON.stringify(notes));
}
if (notes) {
    notes.forEach(function (note) { return addNewNote(note); });
}
function addNewNote(text) {
    if (text === void 0) { text = ''; }
    var note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = "\n      <div class=\"tools\">\n        <button class=\"edit\"><i class=\"fas fa-edit\"></i></button>\n        <button class=\"delete\"><i class=\"fas fa-trash-alt\"></i></button>\n      </div>\n\n      <div class=\"main " + (text ? '' : 'hidden') + "\"></div>\n      <textarea class=\"" + (text ? 'hidden' : '') + "\"></textarea>\n      ";
    var editBtn = note.querySelector('.edit');
    var deleteBtn = note.querySelector('.delete');
    var main = note.querySelector('.main');
    var textArea = note.querySelector('textarea ');
    textArea.value = text;
    main.innerHTML = marked(text);
    deleteBtn.addEventListener('click', function () {
        note.remove();
        updateLS();
    });
    editBtn.addEventListener('click', function () {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });
    textArea.addEventListener('input', function (e) {
        var value = e.target.value;
        main.innerHTML = marked(value);
        updateLS();
    });
    document.body.appendChild(note);
}
addBtn.addEventListener('click', function () { return addNewNote(); });
