function updateSelection() {
    var selectedSection = form.section.value;
    console.log("Selected section: " + selectedSection);
    var sections = content.getElementsByTagName("section");
    var selectedSection = sections[selectedSection];
    var heading = selectedSection.getElementsByTagName("h1")[0];
    var paragraph = selectedSection.getElementsByTagName("p")[0];

    textInput.value = heading.innerText;
    textArea.value = paragraph.innerText;

    submitButton.disabled = false;

}

function updateContent(event) {
    event.preventDefault(); // block redirect/reload
    console.log("Updating content");
    var selectedSection = form.section.value;
    var sections = content.getElementsByTagName("section");
    var selectedSection = sections[selectedSection];
    var heading = selectedSection.getElementsByTagName("h1")[0];
    var paragraph = selectedSection.getElementsByTagName("p")[0];

    heading.innerText = textInput.value;
    paragraph.innerText = textArea.value;
    updateHeadings();
}


function updateHeadings() {
    // clear existing options
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    // get headings
    var headings = content.getElementsByTagName("h1");
    for (var i = 0; i < headings.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = headings[i].innerText;
        select.appendChild(option);
    }

}


content = document.getElementsByClassName("content")[0];

form = document.createElement("form");

select = document.createElement("select");
select.name = "section";

updateHeadings();
select.addEventListener("change", updateSelection);


textInput = document.createElement("input");
textInput.type = "text";
textInput.name = "content";

textArea = document.createElement("textarea");
textArea.name = "content";

submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.innerText = "Submit";
submitButton.className = "submit-button";
submitButton.disabled = true;
submitButton.addEventListener("click", updateContent);

form.appendChild(select);
form.appendChild(document.createElement("br"));
form.appendChild(textInput);
form.appendChild(document.createElement("br"));
form.appendChild(textArea);
form.appendChild(document.createElement("br"));
form.appendChild(submitButton);
content.appendChild(form);
